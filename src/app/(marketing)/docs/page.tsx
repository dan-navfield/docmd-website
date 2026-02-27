import type { Metadata } from "next";
import { DocsPageClient } from "./DocsPageClient";

export const metadata: Metadata = {
  title: "Documentation — API Reference & Guides",
  description:
    "DocMD API documentation. REST endpoints for markdown to Word conversion, template management, MCP server integration, and SharePoint export.",
  keywords: [
    "DocMD API",
    "markdown to word API",
    "document conversion API",
    "MCP server",
    "DocMD documentation",
  ],
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Documentation — API Reference & Guides | DocMD",
    description:
      "REST API, MCP server, and webhook docs for automating markdown to Word conversion.",
    url: "/docs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation — API Reference & Guides | DocMD",
    description:
      "REST API, MCP server, and webhook docs for automating markdown to Word conversion.",
  },
};

function SoftwareApplicationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DocMD API",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description:
      "REST API for markdown to Word document conversion with template management, AI classification, and SharePoint export.",
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
      description: "API access included with Team plan at $49/month.",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function DocsPage() {
  return (
    <>
      <SoftwareApplicationSchema />
      <DocsPageClient />
    </>
  );
}
