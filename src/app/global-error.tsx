"use client";

import { useEffect } from "react";

const COPY = {
  id: {
    lang: "id",
    eyebrow: "Kesalahan Sistem",
    heading: "Terjadi gangguan tak terduga",
    body: "Mohon maaf atas ketidaknyamanannya. Silakan muat ulang halaman ini.",
    retry: "Coba Lagi",
  },
  en: {
    lang: "en",
    eyebrow: "System Error",
    heading: "An unexpected issue occurred",
    body: "We are sorry for the inconvenience. Please reload this page.",
    retry: "Try Again",
  },
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isEnglish =
    typeof window !== "undefined" && window.location.pathname.startsWith("/en");
  const copy = isEnglish ? COPY.en : COPY.id;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang={copy.lang}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "#F5F7FA",
          color: "#0B2C6B",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          padding: "24px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#D9A441",
          }}
        >
          {copy.eyebrow}
        </p>
        <h1 style={{ margin: "16px 0", fontSize: "40px", fontWeight: 300 }}>
          {copy.heading}
        </h1>
        <p
          style={{
            margin: "0 0 32px",
            maxWidth: "440px",
            fontSize: "16px",
            lineHeight: 1.6,
            color: "rgba(11,44,107,0.6)",
          }}
        >
          {copy.body}
        </p>
        <button
          onClick={reset}
          style={{
            height: "48px",
            padding: "0 28px",
            borderRadius: "9999px",
            border: "none",
            background: "#0B2C6B",
            color: "#D9A441",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          {copy.retry}
        </button>
      </body>
    </html>
  );
}
