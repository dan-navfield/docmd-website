import { Zap, Key, FileText, Layers, Code2, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DocsNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavItem[];
}

export const docsNav: DocsNavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Quick Start", href: "/docs/quick-start", icon: Zap },
      { title: "Authentication", href: "/docs/authentication", icon: Key },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Conversion API", href: "/docs/api-reference", icon: FileText },
      {
        title: "Templates & Mappings",
        href: "/docs/templates",
        icon: Layers,
      },
    ],
  },
  {
    title: "Integrations",
    items: [
      { title: "MCP Server", href: "/docs/mcp-server", icon: Code2 },
      { title: "SharePoint Export", href: "/docs/sharepoint", icon: Send },
    ],
  },
];

export const docsNavFlat: DocsNavItem[] = docsNav.flatMap((s) => s.items);
