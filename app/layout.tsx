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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hassan.dev";

export const metadata: Metadata = {
  title: "Hassan.DEV - Fullstack Web Developer",
  description:
    "Fullstack Solutions connecting the dots between Users and Business Goals. Web Development, UI/UX Design, Mobile Apps, and Consulting.",
  keywords: [
    "fullstack developer",
    "web developer",
    "react developer",
    "next.js developer",
    "freelance developer",
    "Hassan",
    "portfolio",
  ],
  authors: [{ name: "Hassan" }],
  creator: "Hassan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Hassan.DEV",
    title: "Hassan.DEV - Fullstack Web Developer",
    description:
      "Fullstack Solutions connecting the dots between Users and Business Goals.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hassan.DEV - Fullstack Web Developer",
      },
    ],
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
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hassan",
  url: siteUrl,
  jobTitle: "Fullstack Web Developer",
  description:
    "Fullstack Solutions connecting the dots between Users and Business Goals.",
  sameAs: [
    "https://github.com",
    "https://linkedin.com",
    "https://twitter.com",
  ],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Tailwind CSS",
    "Docker",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
