import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChatBot } from "../components/chat-bot";

export const metadata: Metadata = {
  title: "BinaHub | Human Transformation & Future Capability Partner",
  description:
    "Mendorong transformasi manusia dan organisasi untuk memanusiawikan masa depan. BinaHub hadir sebagai mitra transformasi bagi individu, pemimpin, dan organisasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-black selection:text-white">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
