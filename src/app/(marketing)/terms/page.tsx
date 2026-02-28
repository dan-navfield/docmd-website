import type { Metadata } from "next";
import { TermsPageClient } from "./TermsPageClient";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "DocMD terms of service. Your content is yours. Our service is ours. Simple, readable terms for using the DocMD platform.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | DocMD",
    description:
      "Simple, readable terms for using the DocMD markdown to Word platform.",
    url: "/terms",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | DocMD",
    description:
      "Simple, readable terms for using the DocMD markdown to Word platform.",
  },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
