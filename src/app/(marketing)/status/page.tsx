import type { Metadata } from "next";
import { StatusPageClient } from "./StatusPageClient";

export const metadata: Metadata = {
  title: "System Status",
  description:
    "Current operational status of DocMD services including the conversion API, web application, AI classification, SharePoint integration, and MCP server.",
  alternates: {
    canonical: "/status",
  },
  openGraph: {
    title: "System Status | DocMD",
    description:
      "Current operational status of all DocMD services.",
    url: "/status",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Status | DocMD",
    description:
      "Current operational status of all DocMD services.",
  },
};

export default function StatusPage() {
  return <StatusPageClient />;
}
