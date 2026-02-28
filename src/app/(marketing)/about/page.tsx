import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About MDDoc — The Markdown to Word Platform",
  description:
    "We built MDDoc because Word templates are hell. A tool born from frustration — paste markdown, get a document that matches your org's template perfectly.",
  keywords: [
    "about MDDoc",
    "markdown to word platform",
    "document automation tool",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About MDDoc — The Markdown to Word Platform",
    description:
      "We built MDDoc because Word templates are hell. Paste markdown, get a document that matches your org's template perfectly.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About MDDoc — The Markdown to Word Platform",
    description:
      "We built MDDoc because Word templates are hell. Paste markdown, get a document that matches your org's template perfectly.",
  },
};

function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MDDoc",
    url: "https://mddoc.app",
    description:
      "AI-powered markdown to Word document conversion platform. Upload markdown, get professionally styled .docx files matching your org templates.",
    foundingDate: "2024",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />
      <AboutPageClient />
    </>
  );
}
