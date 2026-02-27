"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  FileText,
  Key,
  Layers,
  Send,
  Zap,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GradientText } from "@/components/shared/GradientText";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { staggerContainer, fadeInUp } from "@/lib/animations";

function DocsHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-golden/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-golden bg-golden/10 px-4 py-1.5 rounded-full mb-6">
            Documentation
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Build with{" "}
            <GradientText variant="golden">DocMD</GradientText>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            REST API, MCP server, SharePoint export. Everything you need to
            automate document conversion in your pipeline.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

const guides = [
  {
    icon: Zap,
    title: "Quick Start",
    description:
      "Get your first conversion running in under five minutes. Paste markdown, get a .docx.",
    color: "bg-golden/10 text-golden-dark",
    href: "/docs/quick-start",
  },
  {
    icon: Key,
    title: "Authentication",
    description:
      "Generate API keys from your dashboard. Bearer token auth on every request.",
    color: "bg-teal/10 text-teal",
    href: "/docs/authentication",
  },
  {
    icon: FileText,
    title: "Conversion API",
    description:
      "POST markdown, get a download URL. Specify templates, styles, and output options.",
    color: "bg-forest/10 text-forest",
    href: "/docs/api-reference",
  },
  {
    icon: Layers,
    title: "Templates & Mappings",
    description:
      "Upload .docx templates, list available styles, and map markdown elements to Word styles.",
    color: "bg-golden/10 text-golden-dark",
    href: "/docs/templates",
  },
  {
    icon: Code2,
    title: "MCP Server",
    description:
      "Connect DocMD to Claude as a tool. Convert documents directly from your AI workflow.",
    color: "bg-teal/10 text-teal",
    href: "/docs/mcp-server",
  },
  {
    icon: Send,
    title: "SharePoint Export",
    description:
      "Push converted documents straight to SharePoint via OAuth. One API call.",
    color: "bg-forest/10 text-forest",
    href: "/docs/sharepoint",
  },
];

function GuidesGrid() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Guides & References
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Everything is API-first. If you can do it in the UI, you can do it
              through the API.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {guides.map((guide) => (
            <motion.div key={guide.title} variants={fadeInUp}>
              <Link
                href={guide.href}
                className="group block rounded-2xl border border-border bg-white p-6 hover:shadow-lg hover:shadow-forest/[0.05] transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${guide.color}`}
                >
                  <guide.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-forest transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {guide.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-forest opacity-0 group-hover:opacity-100 transition-opacity">
                  Read guide
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function ApiPreview() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Simple, predictable API
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              One endpoint to convert. One to list templates. One to check
              status. We don&apos;t believe in sprawling APIs with 200 endpoints
              you&apos;ll never use.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "JSON request and response",
                "Bearer token authentication",
                "Binary or JSON response formats",
                "Clear error codes and warnings",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-bark"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/docs/api-reference"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-dark transition-colors group"
            >
              Full API reference
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bg-forest-dark rounded-2xl p-6 md:p-8 font-mono text-sm shadow-xl overflow-x-auto">
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-golden/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-teal/60" />
                </div>
                <span className="text-[10px] text-white/20 ml-1">
                  Terminal
                </span>
              </div>
              <pre className="text-white/50 whitespace-pre-wrap leading-loose text-xs md:text-sm">
                <span className="text-warm-gray">$</span>{" "}
                <span className="text-golden">curl</span> -X POST
                https://api.docmd.io/api/v1/convert \{"\n"}
                {"  "}-H{" "}
                <span className="text-teal-light">
                  &quot;Authorization: Bearer docmd_...&quot;
                </span>{" "}
                \{"\n"}
                {"  "}-H{" "}
                <span className="text-teal-light">
                  &quot;Content-Type: application/json&quot;
                </span>{" "}
                \{"\n"}
                {"  "}-d{" "}
                <span className="text-orange">
                  &apos;
                  {`{"markdown": "# Hello", "template_id": "...", "mapping_id": "..."}`}
                  &apos;
                </span>
                {"\n\n"}
                <span className="text-teal-light">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-white/30">
                  &quot;conversion_id&quot;:
                </span>{" "}
                <span className="text-orange">&quot;a1b2c3d4-...&quot;</span>,
                {"\n"}
                {"  "}
                <span className="text-white/30">&quot;status&quot;:</span>{" "}
                <span className="text-teal-light">
                  &quot;completed&quot;
                </span>
                ,{"\n"}
                {"  "}
                <span className="text-white/30">
                  &quot;download_url&quot;:
                </span>{" "}
                <span className="text-orange">
                  &quot;/api/v1/conversions/.../download&quot;
                </span>
                ,{"\n"}
                {"  "}
                <span className="text-white/30">&quot;stats&quot;:</span>{" "}
                <span className="text-teal-light">{"{"}</span>{" "}
                <span className="text-white/30">
                  &quot;headings&quot;:
                </span>{" "}
                <span className="text-golden">1</span>,{" "}
                <span className="text-white/30">
                  &quot;paragraphs&quot;:
                </span>{" "}
                <span className="text-golden">0</span>{" "}
                <span className="text-teal-light">{"}"}</span>
                {"\n"}
                <span className="text-teal-light">{"}"}</span>
              </pre>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function DocsCta() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-teal" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,253,153,0.08),transparent_70%)]" />

      <Container className="relative z-10 text-center">
        <ScrollReveal>
          <Zap className="w-10 h-10 text-golden mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Ready to integrate?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
            Get your first conversion running in under five minutes. 3 free
            conversions — no account needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs/quick-start"
              className="inline-flex items-center justify-center gap-2 bg-golden text-forest-dark font-bold px-8 py-4 rounded-xl text-lg hover:bg-golden-light transition-all shadow-lg"
            >
              Quick Start Guide
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/convert"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/20 transition-all border border-white/10"
            >
              Convert Free
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export function DocsPageClient() {
  return (
    <>
      <DocsHero />
      <GuidesGrid />
      <ApiPreview />
      <DocsCta />
    </>
  );
}
