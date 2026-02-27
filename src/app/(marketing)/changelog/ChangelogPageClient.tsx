"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Sparkles,
  Bug,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GradientText } from "@/components/shared/GradientText";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const changelog = [
  {
    version: "0.9.0",
    date: "February 2026",
    title: "MCP Server & AI Classification",
    type: "feature" as const,
    items: [
      "MCP server for Claude integration — convert docs from your AI workflow",
      "AI document classification with 14 built-in document types",
      "Auto-routing to templates based on document content",
      "Bring your own API keys (Claude or GPT)",
    ],
  },
  {
    version: "0.8.0",
    date: "January 2026",
    title: "SharePoint Export",
    type: "feature" as const,
    items: [
      "One-click export to SharePoint via OAuth",
      "Folder path selection in SharePoint document libraries",
      "Batch export for multiple documents",
    ],
  },
  {
    version: "0.7.0",
    date: "December 2025",
    title: "Custom Templates",
    type: "feature" as const,
    items: [
      "Upload your own .docx templates",
      "Visual style mapping editor",
      "Template style extraction — every paragraph and character style",
      "Template sharing within teams",
    ],
  },
  {
    version: "0.6.1",
    date: "November 2025",
    title: "Bug Fixes & Performance",
    type: "fix" as const,
    items: [
      "Fixed table rendering in complex nested structures",
      "Improved code block styling with syntax highlighting hints",
      "Conversion time reduced by 40% for large documents",
    ],
  },
  {
    version: "0.6.0",
    date: "October 2025",
    title: "REST API & API Keys",
    type: "feature" as const,
    items: [
      "Full REST API for programmatic conversion",
      "API key management from the dashboard",
      "Webhook callbacks for async conversion jobs",
      "Rate limiting with clear headers",
    ],
  },
  {
    version: "0.5.0",
    date: "September 2025",
    title: "Launch",
    type: "feature" as const,
    items: [
      "Markdown to Word conversion with 30+ element types",
      "Live preview editor",
      "5 built-in templates",
      "Free tier with 3 conversions per device",
    ],
  },
];

const typeConfig = {
  feature: {
    icon: Sparkles,
    label: "New",
    color: "bg-teal/10 text-teal",
  },
  improvement: {
    icon: Zap,
    label: "Improved",
    color: "bg-golden/10 text-golden-dark",
  },
  fix: {
    icon: Bug,
    label: "Fixed",
    color: "bg-forest/10 text-forest",
  },
};

function ChangelogHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-golden/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-golden bg-golden/10 px-4 py-1.5 rounded-full mb-6">
            Changelog
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            What&apos;s{" "}
            <GradientText variant="golden">new</GradientText>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            We ship fast. Here&apos;s what we&apos;ve been building.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function ChangelogTimeline() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container size="narrow">
        <div className="space-y-12">
          {changelog.map((release, i) => {
            const config = typeConfig[release.type];
            const TypeIcon = config.icon;

            return (
              <ScrollReveal key={release.version}>
                <div className="relative pl-8 border-l-2 border-sand pb-2">
                  {/* Dot on timeline */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-forest" />

                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm font-mono font-semibold text-forest">
                      v{release.version}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {release.date}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.color}`}
                    >
                      <TypeIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {release.title}
                  </h3>

                  <ul className="space-y-2">
                    {release.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-teal mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function ChangelogPageClient() {
  return (
    <>
      <ChangelogHero />
      <ChangelogTimeline />
    </>
  );
}
