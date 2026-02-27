import type { Metadata } from "next";
import { ChangelogPageClient } from "./ChangelogPageClient";

export const metadata: Metadata = {
  title: "Changelog — What's New in DocMD",
  description:
    "Latest updates, features, and improvements to DocMD. MCP server, AI classification, SharePoint export, custom templates, and more.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "Changelog — What's New in DocMD",
    description:
      "Latest updates, features, and improvements to DocMD.",
    url: "/changelog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog — What's New in DocMD",
    description:
      "Latest updates, features, and improvements to DocMD.",
  },
};

export default function ChangelogPage() {
  return <ChangelogPageClient />;
}
