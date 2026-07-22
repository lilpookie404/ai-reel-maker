import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vidora | AI Reel Maker by Vaishnavi Awadhiya",
  description:
    "Explore how Vaishnavi Awadhiya built Vidora, a modular AI pipeline that turns one scene idea into a complete reel.",
  openGraph: {
    title: "Vidora | AI Reel Maker by Vaishnavi Awadhiya",
    description:
      "Explore how Vaishnavi Awadhiya built Vidora, a modular AI pipeline that turns one scene idea into a complete reel.",
    type: "website",
    siteName: "Vidora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidora | AI Reel Maker by Vaishnavi Awadhiya",
    description:
      "Explore how Vaishnavi Awadhiya built Vidora, a modular AI pipeline that turns one scene idea into a complete reel.",
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
      className={`${instrumentSans.variable} ${bricolageGrotesque.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
