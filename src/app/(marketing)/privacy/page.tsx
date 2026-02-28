import type { Metadata } from "next";
import { PrivacyPageClient } from "./PrivacyPageClient";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MDDoc privacy policy. We collect the minimum data needed to run the service. We don't sell your data or read your documents.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | MDDoc",
    description:
      "We collect the minimum data needed to run MDDoc. We don't sell your data or read your documents.",
    url: "/privacy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | MDDoc",
    description:
      "We collect the minimum data needed to run MDDoc. We don't sell your data or read your documents.",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
