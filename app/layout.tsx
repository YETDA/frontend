import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "global - 크라우드펀딩 플랫폼",
  description: "창작자와 후원자를 연결하는 글로벌 크라우드펀딩 서비스",
  icons: {
    icon: "/favicon.ico",
  },
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "global - 크라우드펀딩 플랫폼",
    description: "창작자와 후원자를 연결하는 글로벌 크라우드펀딩 서비스",
    // url: "https://your-domain.com", 미정
    siteName: "global",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "global - 크라우드펀딩 플랫폼",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <main className="min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  );
}
