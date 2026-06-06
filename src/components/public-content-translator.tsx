"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname, hasLocale, localizePath, shouldBypassLocale, type Locale } from "@/i18n/config"
import { publicSiteTranslations } from "@/i18n/site-translations"

const translatedAttributes = ["aria-label", "placeholder", "title", "alt"] as const
const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "CANVAS", "CODE", "PRE"])

const phraseEntries = Object.entries(publicSiteTranslations).sort((a, b) => b[0].length - a[0].length)

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function translateValue(value: string) {
  const normalized = normalizeText(value)

  if (!normalized) {
    return value
  }

  const exact = publicSiteTranslations[normalized]
  if (exact) {
    return value.replace(normalized, exact)
  }

  let translated = value
  for (const [source, target] of phraseEntries) {
    if (translated.includes(source)) {
      translated = translated.split(source).join(target)
    }
  }

  return translated
}

function shouldSkipNode(node: Node) {
  const parent = node.parentElement
  return !parent || ignoredTags.has(parent.tagName) || parent.closest("[data-no-translate]")
}

function localizeLinks(root: ParentNode, locale: Locale) {
  const links = root instanceof HTMLAnchorElement ? [root] : Array.from(root.querySelectorAll("a[href]"))

  for (const link of links) {
    const href = link.getAttribute("href")
    if (!href || !href.startsWith("/") || href.startsWith("//")) {
      continue
    }

    const segment = href.split("/")[1]
    if (hasLocale(segment) || shouldBypassLocale(href)) {
      continue
    }

    link.setAttribute("href", localizePath(href, locale))
  }
}

function translateTree(root: ParentNode, locale: Locale, shouldTranslateText: boolean) {
  localizeLinks(root, locale)

  if (!shouldTranslateText) {
    return
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (shouldSkipNode(node) || !normalizeText(node.textContent || "")) {
        return NodeFilter.FILTER_REJECT
      }

      return NodeFilter.FILTER_ACCEPT
    },
  })

  const textNodes: Text[] = []
  let current = walker.nextNode()
  while (current) {
    textNodes.push(current as Text)
    current = walker.nextNode()
  }

  for (const node of textNodes) {
    const currentText = node.textContent || ""
    const nextText = translateValue(currentText)
    if (nextText !== currentText) {
      node.textContent = nextText
    }
  }

  const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll("*"))] : Array.from(root.querySelectorAll("*"))
  for (const element of elements) {
    if (ignoredTags.has(element.tagName) || element.closest("[data-no-translate]")) {
      continue
    }

    for (const attribute of translatedAttributes) {
      const currentValue = element.getAttribute(attribute)
      if (!currentValue) {
        continue
      }

      const nextValue = translateValue(currentValue)
      if (nextValue !== currentValue) {
        element.setAttribute(attribute, nextValue)
      }
    }
  }
}

export function PublicContentTranslator() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      return
    }

    const shouldTranslateText = locale === "en"
    let frame = window.requestAnimationFrame(() => translateTree(document.body, locale, shouldTranslateText))
    const observer = new MutationObserver((mutations) => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        for (const mutation of mutations) {
          if (mutation.type === "characterData") {
            if (!shouldTranslateText) {
              continue
            }

            const textNode = mutation.target as Text
            if (!shouldSkipNode(textNode)) {
              const currentText = textNode.textContent || ""
              const nextText = translateValue(currentText)
              if (nextText !== currentText) {
                textNode.textContent = nextText
              }
            }
            continue
          }

          for (const node of Array.from(mutation.addedNodes)) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              translateTree(node as Element, locale, shouldTranslateText)
            } else if (node.nodeType === Node.TEXT_NODE && !shouldSkipNode(node)) {
              if (!shouldTranslateText) {
                continue
              }

              const textNode = node as Text
              const currentText = textNode.textContent || ""
              const nextText = translateValue(currentText)
              if (nextText !== currentText) {
                textNode.textContent = nextText
              }
            }
          }
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    })

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [locale, pathname])

  return null
}
