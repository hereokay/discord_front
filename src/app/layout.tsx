import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "메랜서치 - 메이플랜드 통합 검색",
  description: "메이플랜드 통합 검색 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta property="og:title" content="메랜서치 - 메이플랜드 통합 검색" />
        <meta property="og:url" content="https://maplesearch.kr/" />
        <meta property="og:description" content="메이플랜드 통합 검색 서비스" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="favicon" href="./favicon.ico" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700&display=swap"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
