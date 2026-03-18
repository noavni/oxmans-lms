import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oxman's — Master Mathematics",
    template: "%s | Oxman's",
  },
  description:
    "Premium university math tutoring platform. Master mathematics one theorem at a time with expert-led courses in calculus, linear algebra, and more.",
  keywords: ["math tutoring", "university mathematics", "calculus", "linear algebra", "statistics"],
  openGraph: {
    title: "Oxman's — Master Mathematics",
    description: "Premium university math tutoring platform.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-page text-ink antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
