import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Tarot",
  description: "インタラクティブなタロットカードリーディング",
  metadataBase: new URL("https://tarot.0g0.workers.dev"),
  openGraph: {
    title: "Tarot",
    description: "インタラクティブなタロットカードリーディング",
    url: "https://tarot.0g0.workers.dev",
    siteName: "Tarot",
    images: [{ url: "/og.svg", width: 1200, height: 630, type: "image/svg+xml" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot",
    description: "インタラクティブなタロットカードリーディング",
    images: ["/og.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050609",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  );
}
