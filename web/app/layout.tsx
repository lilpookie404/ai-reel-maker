import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vidora | AI Reel Demo",
  description:
    "A static AI reel pipeline showcase with generated demo videos, model flow, and Vidora project proof.",
  openGraph: {
    title: "Vidora | AI Reel Demo",
    description:
      "A static AI reel pipeline showcase with generated demo videos, model flow, and Vidora project proof.",
    type: "website",
    siteName: "Vidora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidora | AI Reel Demo",
    description:
      "A static AI reel pipeline showcase with generated demo videos, model flow, and Vidora project proof.",
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
