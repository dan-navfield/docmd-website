import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useCases } from "@/data/use-cases";
import { UseCasePageClient } from "./UseCasePageClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = useCases.find((u) => u.slug === slug);
  if (!useCase) return {};
  return {
    title: useCase.metaTitle,
    description: useCase.metaDescription,
    alternates: { canonical: `/use-cases/${slug}` },
    openGraph: {
      title: useCase.metaTitle,
      description: useCase.metaDescription,
      url: `/use-cases/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: useCase.metaTitle,
      description: useCase.metaDescription,
    },
  };
}

function UseCaseSchemas({
  useCase,
}: {
  useCase: (typeof useCases)[number];
}) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: useCase.title,
    description: useCase.metaDescription,
    url: `https://mddoc.app/use-cases/${useCase.slug}`,
    publisher: {
      "@type": "Organization",
      name: "DocMD",
      url: "https://mddoc.app",
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: useCase.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mddoc.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Use Cases",
        item: "https://mddoc.app/use-cases",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: useCase.title,
        item: `https://mddoc.app/use-cases/${useCase.slug}`,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export default async function UseCaseSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const useCase = useCases.find((u) => u.slug === slug);
  if (!useCase) notFound();
  return (
    <>
      <UseCaseSchemas useCase={useCase} />
      <UseCasePageClient useCase={useCase} />
    </>
  );
}
