import type { Metadata } from "next";
import { ChangelogPageClient } from "./ChangelogPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Changelog — What's New in MDDoc",
  description:
    "Latest updates, features, and improvements to MDDoc. MCP server, AI classification, SharePoint export, custom templates, and more.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "Changelog — What's New in MDDoc",
    description:
      "Latest updates, features, and improvements to MDDoc.",
    url: "/changelog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog — What's New in MDDoc",
    description:
      "Latest updates, features, and improvements to MDDoc.",
  },
};

export default function ChangelogPage() {
  return <ChangelogPageClient />;
}
