import type { Metadata } from "next";
import { StatusPageClient } from "./StatusPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "System Status",
  description:
    "Current operational status of MDDoc services including the conversion API, web application, AI classification, SharePoint integration, and MCP server.",
  alternates: {
    canonical: "/status",
  },
  openGraph: {
    title: "System Status | MDDoc",
    description:
      "Current operational status of all MDDoc services.",
    url: "/status",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Status | MDDoc",
    description:
      "Current operational status of all MDDoc services.",
  },
};

export default function StatusPage() {
  return <StatusPageClient />;
}
