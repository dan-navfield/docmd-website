import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons } from "@/data/comparisons";
import { ComparePageClient } from "./ComparePageClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) return {};
  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    keywords: [comparison.competitorName, "DocMD", "markdown to word", "comparison", "alternative"],
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `/compare/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.metaTitle,
      description: comparison.metaDescription,
    },
  };
}

// JSON-LD: Article + FAQPage + BreadcrumbList
function ComparisonSchemas({ comparison }: { comparison: typeof comparisons[number] }) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.metaDescription,
    url: `https://mddoc.app/compare/${comparison.slug}`,
    publisher: { "@type": "Organization", name: "DocMD", url: "https://mddoc.app" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mddoc.app" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://mddoc.app/compare" },
      { "@type": "ListItem", position: 3, name: comparison.title, item: `https://mddoc.app/compare/${comparison.slug}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}

export default async function CompareSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) notFound();
  return (
    <>
      <ComparisonSchemas comparison={comparison} />
      <ComparePageClient comparison={comparison} />
    </>
  );
}
