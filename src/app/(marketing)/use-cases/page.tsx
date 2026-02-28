import type { Metadata } from "next";
import { UseCasesIndexClient } from "./UseCasesIndexClient";
import { useCases } from "@/data/use-cases";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Use Cases — Markdown to Word for Every Role",
  description:
    "See how developers, technical writers, and AI teams use MDDoc to convert markdown to professional Word documents. Solutions tailored to your workflow.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "Use Cases — Markdown to Word for Every Role | MDDoc",
    description:
      "See how developers, technical writers, and AI teams use MDDoc to convert markdown to Word.",
    url: "/use-cases",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Cases — Markdown to Word for Every Role | MDDoc",
    description:
      "See how developers, technical writers, and AI teams use MDDoc to convert markdown to Word.",
  },
};

function CollectionPageSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "MDDoc Use Cases",
    description:
      "How different roles use MDDoc for markdown to Word conversion.",
    url: "https://mddoc.app/use-cases",
    mainEntity: useCases.map((u) => ({
      "@type": "Article",
      name: u.title,
      url: `https://mddoc.app/use-cases/${u.slug}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function UseCasesPage() {
  return (
    <>
      <CollectionPageSchema />
      <UseCasesIndexClient />
    </>
  );
}
