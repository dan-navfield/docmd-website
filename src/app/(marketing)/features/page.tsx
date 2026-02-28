import type { Metadata } from "next";
import { FeaturesPageClient } from "./FeaturesPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Features — AI Classification, Custom Templates & More",
  description:
    "Markdown to Word conversion, AI document classification, custom Word templates, style mapping, SharePoint export, REST API, and MCP server integration.",
  keywords: [
    "markdown to word features",
    "AI document classification",
    "custom word templates",
    "style mapping editor",
    "SharePoint export",
    "document automation API",
  ],
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "Features — AI Classification, Custom Templates & More | DocMD",
    description:
      "Markdown to Word conversion, AI document classification, custom templates, SharePoint export, and REST API.",
    url: "/features",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Features — AI Classification, Custom Templates & More | DocMD",
    description:
      "Markdown to Word conversion, AI document classification, custom templates, SharePoint export, and REST API.",
  },
};

function SoftwareApplicationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DocMD",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description:
      "AI-powered markdown to Word document conversion with custom template support, document classification, and enterprise integrations.",
    featureList: [
      "Markdown to Word conversion with full element support",
      "AI document classification (ADR, runbook, API spec, meeting notes)",
      "Custom Word template upload and management",
      "Visual style mapping editor",
      "SharePoint one-click export",
      "REST API with 48 endpoints",
      "MCP server for Claude integration",
      "Audit trail and compliance logging",
    ].join(", "),
    offers: {
      "@type": "Offer",
      price: "10",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function FeaturesPage() {
  return (
    <>
      <SoftwareApplicationSchema />
      <FeaturesPageClient />
    </>
  );
}
