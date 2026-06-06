import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChatBotLoader } from "../components/chat-bot-loader";
import { PublicContentTranslator } from "@/components/public-content-translator";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_DESCRIPTION_EN, SITE_KEYWORDS, SITE_KEYWORDS_EN } from "@/lib/site";
import { defaultLocale, hasLocale } from "@/i18n/config";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;
  const isEnglish = locale === "en";
  const description = isEnglish ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION;
  const keywords = isEnglish ? SITE_KEYWORDS_EN : SITE_KEYWORDS;
  const canonical = isEnglish ? "/en" : "/";
  const title = `${SITE_NAME} | ${SITE_TAGLINE}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical,
      languages: {
        id: "/",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isEnglish ? "en_US" : "id_ID",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;

  return (
    <html lang={locale} className={`scroll-smooth ${poppins.variable} ${inter.variable}`}>
      <body className={`min-h-screen flex flex-col selection:bg-[#0B2C6B] selection:text-white ${poppins.className}`}>
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <ChatBotLoader />
        <PublicContentTranslator />
      </body>
    </html>
  );
}
