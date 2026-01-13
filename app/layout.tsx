import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { siteConfig } from "../lib/seo";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | Rankings del Mundo"
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
