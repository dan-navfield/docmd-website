import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { ArticlePageClient } from "./ArticlePageClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `/articles/${slug}`,
      type: "article",
      publishedTime: article.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

function ArticleSchemas({
  article,
}: {
  article: (typeof articles)[number];
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedDate,
    url: `https://mddoc.app/articles/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "DocMD",
      url: "https://mddoc.app",
    },
    author: {
      "@type": "Organization",
      name: "DocMD",
    },
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
        name: "Articles",
        item: "https://mddoc.app/articles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://mddoc.app/articles/${article.slug}`,
      },
    ],
  };

  // Add HowTo schema for guide articles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: Record<string, any>[] = [articleSchema, breadcrumb];

  if (article.category === "guide") {
    const howTo = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: article.title,
      description: article.metaDescription,
      step: article.sections.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.heading,
      })),
    };
    schemas.push(howTo);
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default async function ArticleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <ArticleSchemas article={article} />
      <ArticlePageClient article={article} />
    </>
  );
}
