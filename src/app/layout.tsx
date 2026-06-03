import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://services.buzzinnovations.co.uk'), // Assuming a subdomain or main domain
  title: {
    default: "Buzz Innovations Services | Engineering Physical & Digital Excellence",
    template: "%s | Buzz Innovations Services"
  },
  description: "Bespoke web development, UI/UX design, digital strategy, and physical product innovation by Buzz Innovations. We transform complex problems into high-performance platforms.",
  keywords: ["Web Development", "UI/UX Design", "Product Design", "Digital Strategy", "Prototyping", "UK Agency", "Buzz Innovations", "Software Development"],
  authors: [{ name: "Buzz Innovations Ltd" }],
  creator: "Buzz Innovations Ltd",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://services.buzzinnovations.co.uk",
    title: "Buzz Innovations Services | Physical & Digital Excellence",
    description: "Bespoke web development, UI/UX design, and physical product innovation.",
    siteName: "Buzz Innovations Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buzz Innovations Services | Engineering Physical & Digital Excellence",
    description: "Bespoke web development, UI/UX design, and physical product innovation.",
    creator: "@buzzinnovations",
  },
  icons: {
    icon: "https://www.buzzinnovations.co.uk/brand/buzzchat-site-logo.png",
    shortcut: "https://www.buzzinnovations.co.uk/brand/buzzchat-site-logo.png",
    apple: "https://www.buzzinnovations.co.uk/brand/buzzchat-site-logo.png",
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
      className={`${inter.variable} ${mono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-foreground">{children}</body>
    </html>
  );
}
