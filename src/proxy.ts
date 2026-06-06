import { NextRequest, NextResponse } from "next/server"
import { hasLocale, localeCookieName, shouldBypassLocale } from "@/i18n/config"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (shouldBypassLocale(pathname)) {
    return NextResponse.next()
  }

  const segments = pathname.split("/")
  const locale = segments[1]

  if (!hasLocale(locale)) {
    return NextResponse.next()
  }

  const rewrittenUrl = request.nextUrl.clone()
  const rewrittenPath = `/${segments.slice(2).join("/")}`.replace(/\/+/g, "/")
  rewrittenUrl.pathname = rewrittenPath === "/" ? "/" : rewrittenPath.replace(/\/$/, "")

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-binahub-locale", locale)

  const response = NextResponse.rewrite(rewrittenUrl, {
    request: {
      headers: requestHeaders,
    },
  })

  response.cookies.set(localeCookieName, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  })

  return response
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
}
