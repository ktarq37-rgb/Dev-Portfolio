import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const siteUrl = "https://v0-dev-portfolio-1t5079t0k-ktarq37-5274s-projects.vercel.app";

export const metadata: Metadata = {
  title: "Hassan - Fullstack Web Developer",
  description:
    "Fullstack Solutions connecting the dots between Users and Business Goals.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Hassan.DEV - Fullstack Web Developer",
    description:
      "Fullstack Solutions connecting the dots between Users and Business Goals.",
    url: siteUrl,
    siteName: "Hassan.DEV",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hassan.DEV - Fullstack Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan.DEV - Fullstack Web Developer",
    description:
      "Fullstack Solutions connecting the dots between Users and Business Goals.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
