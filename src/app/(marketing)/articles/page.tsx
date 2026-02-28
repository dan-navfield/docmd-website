import type { Metadata } from "next";
import { ArticlesPageClient } from "./ArticlesPageClient";
import { articles } from "@/data/articles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Articles — Guides, Tips & Insights",
  description:
    "Guides, tips, and insights about markdown to Word conversion, document automation, and working with AI-generated content.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles — Guides, Tips & Insights | DocMD",
    description:
      "Guides, tips, and insights about markdown to Word conversion, document automation, and working with AI-generated content.",
    url: "/articles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles — Guides, Tips & Insights | DocMD",
    description:
      "Guides, tips, and insights about markdown to Word conversion and document automation.",
  },
};

function CollectionPageSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "DocMD Articles",
    description:
      "Guides, tips, and insights about markdown to Word conversion.",
    url: "https://mddoc.app/articles",
    mainEntity: articles.map((a) => ({
      "@type": "Article",
      name: a.title,
      url: `https://mddoc.app/articles/${a.slug}`,
      datePublished: a.publishedDate,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ArticlesPage() {
  return (
    <>
      <CollectionPageSchema />
      <ArticlesPageClient />
    </>
  );
}
