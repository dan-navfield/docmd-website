interface BreadcrumbSchemaProps {
  title: string;
  href: string;
}

export function BreadcrumbSchema({ title, href }: BreadcrumbSchemaProps) {
  const jsonLd = {
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
        name: "Docs",
        item: "https://mddoc.app/docs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://mddoc.app${href}`,
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
