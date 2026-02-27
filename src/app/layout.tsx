import type { Metadata } from "next";
import { Inter, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const serif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "DocMD — Markdown to Word Documents",
    template: "%s | DocMD",
  },
  description:
    "Upload markdown, get professionally styled Word docs matching your org templates. AI-powered classification, template management, and SharePoint export.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://docmd.io"
  ),
  openGraph: {
    title: "DocMD — Markdown to Word Documents",
    description:
      "Upload markdown, get professionally styled Word docs matching your org templates.",
    siteName: "DocMD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocMD — Markdown to Word Documents",
    description:
      "Upload markdown, get professionally styled Word docs matching your org templates.",
  },
};

function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DocMD",
    url: "https://docmd.io",
    description:
      "AI-powered markdown to Word document conversion platform. Upload markdown, get professionally styled .docx files matching your org templates.",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} ${serif.variable} font-sans antialiased`}
      >
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
