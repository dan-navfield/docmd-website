"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Brain,
  Layers,
  Send,
  Code2,
  Hash,
  Type,
  List,
  Table,
  Braces,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GradientText } from "@/components/shared/GradientText";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/interactive/GlowCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { detailedFeatures } from "@/data/features";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

// ─── Feature Visual Placeholders ─────────────────────────────────────────────

function ConversionVisual() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-forest-dark to-forest overflow-hidden p-6">
      {/* Markdown side */}
      <div className="absolute top-6 left-6 right-[52%] bottom-6 bg-forest-light/20 rounded-xl border border-white/10 p-4 overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-400/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Hash className="w-3 h-3 text-orange/60 shrink-0" />
            <div className="h-2.5 w-3/4 bg-white/20 rounded" />
          </div>
          <div className="h-2 w-full bg-white/10 rounded" />
          <div className="h-2 w-5/6 bg-white/10 rounded" />
          <div className="flex items-center gap-2 mt-3">
            <List className="w-3 h-3 text-teal/60 shrink-0" />
            <div className="h-2 w-2/3 bg-white/10 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <List className="w-3 h-3 text-teal/60 shrink-0" />
            <div className="h-2 w-1/2 bg-white/10 rounded" />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Braces className="w-3 h-3 text-golden/60 shrink-0" />
            <div className="h-2 w-3/4 bg-white/10 rounded" />
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center shadow-lg shadow-black/20">
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Word side */}
      <div className="absolute top-6 left-[52%] right-6 bottom-6 bg-white/95 rounded-xl shadow-xl p-4 overflow-hidden">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
          <FileText className="w-4 h-4 text-blue-600" />
          <span className="text-[10px] font-medium text-gray-600">Document.docx</span>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-3/4 bg-forest/20 rounded" />
          <div className="h-2 w-full bg-gray-200 rounded" />
          <div className="h-2 w-5/6 bg-gray-200 rounded" />
          <div className="h-2 w-full bg-gray-200 rounded" />
          <div className="mt-3 space-y-1.5 pl-3 border-l-2 border-teal">
            <div className="h-2 w-2/3 bg-gray-200 rounded" />
            <div className="h-2 w-1/2 bg-gray-200 rounded" />
          </div>
          <div className="mt-3 h-2 w-3/4 bg-golden/30 rounded" />
        </div>
      </div>
    </div>
  );
}

function ClassificationVisual() {
  const docTypes = [
    { label: "ADR", confidence: "94%", color: "bg-forest" },
    { label: "Runbook", confidence: "3%", color: "bg-teal/40" },
    { label: "API Spec", confidence: "2%", color: "bg-golden/40" },
    { label: "Meeting Notes", confidence: "1%", color: "bg-forest/40" },
  ];

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-teal-dark to-teal overflow-hidden p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,179,66,0.1),transparent_60%)]" />
      <div className="relative h-full flex flex-col justify-center gap-4">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-6 h-6 text-golden" />
          <span className="text-sm font-semibold text-white/80">AI Classification</span>
        </div>
        {docTypes.map((doc, i) => (
          <div key={doc.label} className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/60 w-20 shrink-0">{doc.label}</span>
            <div className="flex-1 h-6 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full", doc.color)}
                initial={{ width: 0 }}
                whileInView={{ width: doc.confidence }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-mono text-white/80 w-10 text-right">{doc.confidence}</span>
          </div>
        ))}
        <div className="mt-2 p-3 rounded-lg bg-white/10 border border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/70">Auto-routing to <span className="text-golden font-semibold">ADR Template</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplatesVisual() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-forest to-forest-light overflow-hidden p-6">
      <div className="relative h-full flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-golden" />
          <span className="text-sm font-semibold text-white/80">Template Library</span>
        </div>
        {/* Template cards stack */}
        <div className="relative flex-1">
          {[
            { name: "Corporate Report", styles: "14 styles", offset: "rotate-[-3deg] top-0 left-0" },
            { name: "Technical Spec", styles: "18 styles", offset: "rotate-[1deg] top-4 left-4" },
            { name: "Project Brief", styles: "11 styles", offset: "rotate-[3deg] top-8 left-8" },
          ].map((tpl, i) => (
            <div
              key={tpl.name}
              className={cn(
                "absolute w-[85%] bg-white rounded-lg shadow-lg p-4 border border-gray-100 transition-all",
                tpl.offset
              )}
              style={{ zIndex: 3 - i }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs font-bold text-forest">{tpl.name}</div>
                  <div className="text-[10px] text-gray-400">{tpl.styles}</div>
                </div>
                <div className="w-6 h-6 rounded bg-golden/10 flex items-center justify-center">
                  <Type className="w-3 h-3 text-golden-dark" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-forest" />
                  <div className="h-1.5 w-20 bg-gray-100 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  <div className="h-1.5 w-16 bg-gray-100 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden" />
                  <div className="h-1.5 w-24 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SharePointVisual() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#0078d4] to-[#106ebe] overflow-hidden p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="relative h-full flex flex-col">
        {/* SharePoint header mock */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/15">
          <Send className="w-5 h-5 text-white" />
          <span className="text-sm font-semibold text-white/90">SharePoint Export</span>
        </div>
        {/* Folder tree */}
        <div className="flex-1 space-y-2">
          <div className="p-3 rounded-lg bg-white/10">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-yellow-400/20 flex items-center justify-center">
                <span className="text-[10px]">&#128193;</span>
              </div>
              <span className="text-xs text-white/80 font-medium">/ Engineering / ADRs</span>
            </div>
          </div>
          <div className="space-y-1.5 pl-4">
            {["ADR-001-auth.docx", "ADR-002-cache.docx", "ADR-003-api.docx"].map((file, i) => (
              <div key={file} className="flex items-center gap-2 p-2 rounded bg-white/5">
                <FileText className="w-3.5 h-3.5 text-white/40" />
                <span className="text-[11px] text-white/60 font-mono">{file}</span>
                {i === 2 && (
                  <span className="ml-auto text-[9px] bg-green-400/20 text-green-300 px-1.5 py-0.5 rounded-full font-medium">
                    new
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-3 flex items-center gap-2 p-3 rounded-lg bg-white/10 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-white/70">Connected via OAuth</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiVisual() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden p-6 font-mono">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-400/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
        <div className="w-3 h-3 rounded-full bg-green-400/60" />
        <span className="text-[10px] text-gray-500 ml-2">Terminal</span>
      </div>
      <div className="space-y-2 text-[11px] leading-relaxed">
        <div>
          <span className="text-green-400">$</span>{" "}
          <span className="text-white/80">curl -X POST https://api.docmd.io/v1/convert</span>
        </div>
        <div className="text-gray-500">&nbsp;&nbsp;-H &quot;Authorization: Bearer sk-...&quot;</div>
        <div className="text-gray-500">&nbsp;&nbsp;-d &apos;{`{"markdown": "# Report", "template": "corporate"}`}&apos;</div>
        <div className="mt-3 p-3 rounded bg-gray-700/50 border border-gray-600/50">
          <div className="text-green-400 mb-1">{"{"}</div>
          <div className="text-white/70 pl-3">&quot;status&quot;: <span className="text-green-400">&quot;complete&quot;</span>,</div>
          <div className="text-white/70 pl-3">&quot;download&quot;: <span className="text-golden">&quot;https://...&quot;</span>,</div>
          <div className="text-white/70 pl-3">&quot;pages&quot;: <span className="text-orange">4</span></div>
          <div className="text-green-400">{"}"}</div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Code2 className="w-3.5 h-3.5 text-orange" />
          <span className="text-gray-400">MCP server available for Claude integration</span>
        </div>
      </div>
    </div>
  );
}

const visualMap: Record<string, React.FC> = {
  conversion: ConversionVisual,
  classification: ClassificationVisual,
  templates: TemplatesVisual,
  sharepoint: SharePointVisual,
  api: ApiVisual,
};

// ─── Hero ────────────────────────────────────────────────────────────────────

function FeaturesHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
      {/* Background orbs */}
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
            Features
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Everything you need to turn markdown into{" "}
            <GradientText variant="golden">beautiful documents</GradientText>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            From conversion to classification to export — DocMD handles the
            entire document pipeline so you can focus on writing.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Feature Detail Sections ─────────────────────────────────────────────────

function FeatureDetailSection({
  feature,
  index,
}: {
  feature: (typeof detailedFeatures)[number];
  index: number;
}) {
  const isReversed = index % 2 !== 0;
  const bgColor = index % 2 === 0 ? "bg-white" : "bg-cream";
  const Visual = visualMap[feature.visual] || ConversionVisual;

  return (
    <section className={cn("py-20 md:py-28", bgColor)}>
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            isReversed && "lg:direction-rtl"
          )}
        >
          {/* Text side */}
          <ScrollReveal
            direction={isReversed ? "right" : "left"}
            className={cn(isReversed && "lg:order-2 lg:direction-ltr")}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-forest/10 text-forest">
              {feature.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              {feature.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {feature.description}
            </p>
            <Link
              href="/convert"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-dark transition-colors group"
            >
              Try it now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>

          {/* Visual side */}
          <ScrollReveal
            direction={isReversed ? "left" : "right"}
            delay={0.15}
            className={cn(isReversed && "lg:order-1 lg:direction-ltr")}
          >
            <Visual />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { label: "Markdown elements supported", value: "30+" },
    { label: "Word styles per template", value: "50+" },
    { label: "API response time", value: "<2s" },
    { label: "Export formats", value: ".docx" },
  ];

  return (
    <section className="py-16 bg-golden">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-forest-dark mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-forest/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-teal" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,253,153,0.08),transparent_70%)]" />

      <Container className="relative z-10 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            See it for yourself.
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            Paste your markdown. Pick a template. Get a perfect Word doc in
            seconds. No signup required.
          </p>
          <MagneticButton
            as="a"
            href="/convert"
            className="inline-flex items-center justify-center gap-2 bg-golden text-forest-dark font-bold px-8 py-4 rounded-xl text-lg hover:bg-golden-light transition-all shadow-lg"
          >
            Try It Free
            <ArrowRight className="w-5 h-5" />
          </MagneticButton>
        </ScrollReveal>
      </Container>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function FeaturesPageClient() {
  return (
    <>
      <FeaturesHero />
      <StatsBar />
      {detailedFeatures.map((feature, index) => (
        <FeatureDetailSection key={feature.title} feature={feature} index={index} />
      ))}
      <CtaBanner />
    </>
  );
}
