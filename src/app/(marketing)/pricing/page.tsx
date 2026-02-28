import type { Metadata } from "next";
import { PricingPageClient } from "./PricingPageClient";
import { faqs } from "@/data/pricing";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pricing — Solo, Team & Enterprise Plans",
  description:
    "DocMD pricing starts at $10/month for Solo. Team plans at $49/month with unlimited conversions. Enterprise plans with custom templates and dedicated support.",
  keywords: [
    "DocMD pricing",
    "markdown converter pricing",
    "document automation pricing",
    "team document tools",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing — Solo, Team & Enterprise Plans | DocMD",
    description:
      "Plans from $10/month. Try free on the Convert page. Solo, Team, and Enterprise tiers.",
    url: "/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Solo, Team & Enterprise Plans | DocMD",
    description:
      "Plans from $10/month. Try free on the Convert page. Solo, Team, and Enterprise tiers.",
  },
};

function ProductSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "DocMD",
    description:
      "AI-powered markdown to Word document conversion platform with custom templates and enterprise integrations.",
    offers: [
      {
        "@type": "Offer",
        name: "Solo",
        price: "10",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description:
          "For individuals. 20 conversions/month, 5 templates, AI classification.",
      },
      {
        "@type": "Offer",
        name: "Team",
        price: "49",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description:
          "For teams. Unlimited conversions, custom templates, API access, SharePoint export.",
      },
    ],
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
    mainEntity: faqs.map((faq) => ({
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

export default function PricingPage() {
  return (
    <>
      <ProductSchema />
      <FaqSchema />
      <PricingPageClient />
    </>
  );
}
