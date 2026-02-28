import type { Metadata } from "next";
import { CompareIndexClient } from "./CompareIndexClient";
import { comparisons } from "@/data/comparisons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Compare — See How DocMD Stacks Up",
  description: "Compare DocMD with Pandoc, manual formatting, and other markdown to Word conversion methods. Fair, detailed comparisons to help you pick the right tool.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare — See How DocMD Stacks Up | DocMD",
    description: "Compare DocMD with Pandoc, manual formatting, and other markdown to Word conversion methods.",
    url: "/compare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare — See How DocMD Stacks Up | DocMD",
    description: "Compare DocMD with Pandoc, manual formatting, and other markdown to Word conversion methods.",
  },
};

// JSON-LD CollectionPage schema
function CollectionPageSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "DocMD Comparisons",
    description: "Compare DocMD with other markdown to Word conversion tools and methods.",
    url: "https://mddoc.app/compare",
    mainEntity: comparisons.map((c) => ({
      "@type": "Article",
      name: c.title,
      url: `https://mddoc.app/compare/${c.slug}`,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default function ComparePage() {
  return (
    <>
      <CollectionPageSchema />
      <CompareIndexClient />
    </>
  );
}
