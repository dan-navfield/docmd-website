import type { Metadata } from "next";
import { ConvertPageClient } from "./ConvertPageClient";
import { convertFaqs } from "@/data/convert-faq";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Free Markdown to Word Converter — Convert MD to DOCX Online | DocMD",
  description:
    "Convert markdown to Word documents instantly. Free online tool with live preview. No signup required.",
  keywords: [
    "markdown to word converter",
    "convert markdown to docx",
    "md to docx online",
    "markdown to docx",
    "free markdown converter",
  ],
  alternates: {
    canonical: "/convert",
  },
  openGraph: {
    title: "Free Markdown to Word Converter | DocMD",
    description:
      "Convert markdown to Word documents instantly. Free online tool with live preview.",
    url: "/convert",
    type: "website",
  },
};

function WebApplicationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DocMD Markdown to Word Converter",
    description:
      "Convert markdown to professionally formatted Word documents instantly. Free online tool with live preview.",
    applicationCategory: "Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
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

function FaqSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: convertFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function HowToSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Markdown to a Word Document",
    description:
      "Convert markdown to a professionally formatted .docx file in three steps using DocMD's free online converter.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Paste your markdown",
        text: "Open the DocMD converter and paste your markdown into the editor. Supports GitHub Flavored Markdown, Obsidian, and plain .md files.",
        url: "https://mddoc.app/convert",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Preview your document",
        text: "See a live preview of how your document will look in Word — headings, tables, code blocks, and all formatting rendered in real time.",
        url: "https://mddoc.app/convert",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download your .docx file",
        text: "Click Convert & Download. Your Word document is generated in under two seconds and downloads automatically. Open it in Microsoft Word, Google Docs, or LibreOffice.",
        url: "https://mddoc.app/convert",
      },
    ],
    totalTime: "PT30S",
    tool: {
      "@type": "HowToTool",
      name: "DocMD Markdown to Word Converter",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function ArticleSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is Markdown to Word Conversion?",
    description:
      "Learn what markdown to Word conversion is, why you need it, and how DocMD converts .md files to professionally formatted .docx documents in seconds.",
    author: {
      "@type": "Organization",
      name: "DocMD",
      url: "https://mddoc.app",
    },
    publisher: {
      "@type": "Organization",
      name: "DocMD",
      url: "https://mddoc.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://mddoc.app/convert",
    },
    datePublished: "2025-01-15",
    dateModified: "2025-01-15",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ConvertPage() {
  return (
    <>
      <WebApplicationSchema />
      <FaqSchema />
      <HowToSchema />
      <ArticleSchema />
      <ConvertPageClient />
    </>
  );
}
