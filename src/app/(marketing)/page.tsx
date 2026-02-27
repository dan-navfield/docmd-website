import type { Metadata } from "next";
import { HomePageClient } from "./HomePageClient";

export const metadata: Metadata = {
  title: "DocMD — Markdown to Word, Powered by AI",
  description:
    "Stop wrestling with Word templates. Paste markdown, pick a template, get a document that looks like your org made it. AI-powered classification and conversion.",
  keywords: [
    "markdown to word",
    "markdown to docx",
    "AI document conversion",
    "word template automation",
    "markdown converter",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DocMD — Markdown to Word, Powered by AI",
    description:
      "Stop wrestling with Word templates. Paste markdown, pick a template, get a document that looks like your org made it.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocMD — Markdown to Word, Powered by AI",
    description:
      "Stop wrestling with Word templates. Paste markdown, pick a template, get a document that looks like your org made it.",
  },
};

function WebSiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DocMD",
    url: "https://docmd.io",
    description:
      "AI-powered markdown to Word document conversion platform. Upload markdown, get professionally styled .docx files matching your org templates.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://docmd.io/convert",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function SoftwareApplicationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DocMD",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description:
      "Convert markdown to professionally styled Word documents. AI-powered document classification, custom template support, and SharePoint export.",
    offers: {
      "@type": "Offer",
      price: "10",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
    },
    featureList:
      "Markdown to Word conversion, AI document classification, Custom Word templates, Style mapping editor, SharePoint export, REST API, MCP server for Claude",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <HomePageClient />
    </>
  );
}
