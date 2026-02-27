import type { Metadata } from "next";
import { ConvertPageClient } from "./ConvertPageClient";
import { convertFaqs } from "@/data/convert-faq";

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

export default function ConvertPage() {
  return (
    <>
      <WebApplicationSchema />
      <FaqSchema />
      <ConvertPageClient />
    </>
  );
}
