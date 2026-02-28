import {
  FileText,
  Brain,
  Layout,
  Palette,
  Share2,
  Code2,
  Zap,
  Shield,
  Users,
} from "lucide-react";

export const features = [
  {
    icon: FileText,
    title: "Markdown to Word",
    description:
      "Paste markdown. Get a Word doc. Styled to match your org's templates, every time.",
    color: "orange" as const,
  },
  {
    icon: Brain,
    title: "AI Classification",
    description:
      "Drop in a doc and AI figures out what it is — ADR, runbook, API spec — and routes it to the right template.",
    color: "teal" as const,
  },
  {
    icon: Layout,
    title: "Template Management",
    description:
      "Upload your Word templates. Edit them right in the browser. Every doc comes out looking like it was hand-crafted.",
    color: "forest" as const,
  },
  {
    icon: Palette,
    title: "Style Mapping",
    description:
      "Map any markdown element to any Word style. Heading 2 becomes your custom heading. Tables get your table style. Done.",
    color: "golden" as const,
  },
  {
    icon: Share2,
    title: "SharePoint Export",
    description:
      "One click sends your doc to the right SharePoint library, in the right folder, with the right name.",
    color: "teal" as const,
  },
  {
    icon: Code2,
    title: "API & Automation",
    description:
      "Full REST API. MCP server for Claude. Build document automation into any workflow.",
    color: "orange" as const,
  },
] as const;

export const detailedFeatures = [
  {
    title: "Markdown in. Word out. Perfectly styled.",
    description:
      "You write in markdown because it's clean, it's fast, and it works with version control. But your org needs Word docs. So you copy-paste into Word, spend an hour fixing styles, and die a little inside. MDDoc takes your markdown and applies your org's actual Word template. Headings, lists, tables, code blocks — everything lands in the right style. No manual formatting. No guessing.",
    badge: "Core Engine",
    visual: "conversion",
  },
  {
    title: "AI that knows what you wrote.",
    description:
      "Is it a runbook? An ADR? Meeting notes? MDDoc's AI reads your document and classifies it automatically. Then it picks the right template, the right mapping, the right folder. You can let it run fully automatic, or review its suggestions first. Your keys, your models — Claude or GPT, you choose.",
    badge: "AI Agent",
    visual: "classification",
  },
  {
    title: "Your templates. Your rules.",
    description:
      "Upload your org's actual Word templates — the ones with the right fonts, logos, and page layouts. Edit them right in the browser with a full Word-like editor. Extract every paragraph and character style. Then map your markdown elements to those styles. Your docs will look like they came from the same person who made the template.",
    badge: "Templates",
    visual: "templates",
  },
  {
    title: "One click to SharePoint.",
    description:
      "You've converted your doc. Now it needs to land in SharePoint. MDDoc connects to your Microsoft account, lets you pick the library and folder, and exports directly. Per-user OAuth means everyone uses their own permissions. Full audit trail of every export.",
    badge: "Enterprise",
    visual: "sharepoint",
  },
  {
    title: "Built for automation.",
    description:
      "Every feature in MDDoc is available through the API. Generate API keys, call endpoints, build pipelines. Or use the MCP server to let Claude do the work for you — upload, classify, convert, and export, all from a chat interface. MDDoc fits into your workflow, not the other way around.",
    badge: "Developer",
    visual: "api",
  },
] as const;

export const sampleMarkdown = `# Project Status Report

## Overview
This document summarizes the current status of **Project Phoenix** as of Q1 2026.

## Key Achievements
- Completed migration to new infrastructure
- Reduced deployment time by **73%**
- Onboarded 12 new team members

## Technical Details

### Architecture
The system uses a \`microservices\` pattern with the following components:

| Service | Status | Uptime |
|---------|--------|--------|
| API Gateway | Active | 99.97% |
| Auth Service | Active | 99.99% |
| Doc Engine | Active | 99.95% |

### Code Example
\`\`\`python
def convert_document(markdown, template):
    ast = parse(markdown)
    return render(ast, template)
\`\`\`

## Next Steps
1. Launch public API
2. Add SharePoint integration
3. Release MCP server

> "The best tool is the one you don't have to think about."
`;
