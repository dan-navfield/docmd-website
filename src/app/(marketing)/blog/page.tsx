import type { Metadata } from "next";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Product updates, markdown tips, and document automation insights from the DocMD team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | DocMD",
    description:
      "Product updates, markdown tips, and document automation insights from the DocMD team.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | DocMD",
    description:
      "Product updates, markdown tips, and document automation insights from the DocMD team.",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
