"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Brain,
  Layers,
  Share2,
  Code2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  Lock,
  Zap,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { testimonials } from "@/data/testimonials";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  HERO — Vibrant background with floating UI elements                       */
/* ═══════════════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-forest-light pt-28 pb-16">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(250,253,153,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(107,127,90,0.2),transparent_50%)]" />

      <Container className="relative z-10">
        {/* Centered headline */}
        <div className="text-center pt-12 md:pt-20 mb-16 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-8"
          >
            Markdown for AI,
            <br />
            Word for clients.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-white/80 max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Stop wrestling with Word templates.
            <br />
            Paste markdown, pick a template, get a document that looks like your org made it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Link
              href="/convert"
              className="inline-flex items-center gap-2.5 bg-golden text-forest-dark font-semibold px-8 py-4 rounded-full text-base hover:bg-golden-light transition-all shadow-xl shadow-black/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Try it free
              <Download className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Floating UI elements */}
        <div className="relative max-w-5xl mx-auto h-[340px] md:h-[420px]">
          {/* Center: App mockup (phone-like) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[280px] md:w-[320px] z-30"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/15 overflow-hidden border border-white/50">
              <div className="bg-forest-dark px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange/60" />
                  <div className="w-2 h-2 rounded-full bg-golden/80" />
                  <div className="w-2 h-2 rounded-full bg-teal/60" />
                </div>
                <span className="text-[10px] text-white/40 font-mono ml-1">report.md</span>
              </div>
              <div className="p-4 font-mono text-xs leading-relaxed bg-forest-dark text-white/60">
                <p><span className="text-orange"># </span><span className="text-white">Status Report</span></p>
                <p className="mt-1"><span className="text-teal-light">## </span><span className="text-white/80">Metrics</span></p>
                <p><span className="text-golden">- </span>Deploys: <span className="text-orange">**142**</span></p>
                <p><span className="text-golden">- </span>Uptime: <span className="text-orange">**99.97%**</span></p>
              </div>
              <div className="p-4 border-t border-sand bg-white">
                <p className="text-xs text-warm-gray mb-1">output.docx</p>
                <h4 className="text-sm font-bold text-forest">Status Report</h4>
                <div className="w-8 h-0.5 bg-golden-dark rounded mt-1 mb-2" />
                <p className="text-[11px] text-bark">Deploys: <strong>142</strong></p>
                <p className="text-[11px] text-bark">Uptime: <strong>99.97%</strong></p>
              </div>
            </div>
          </motion.div>

          {/* Floating card: AI Classification (top-left) */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="absolute left-0 md:left-[5%] top-4 md:top-8 z-20"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 p-4 w-[200px] border border-white/50">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal/10 flex items-center justify-center">
                  <Brain className="w-3.5 h-3.5 text-teal" />
                </div>
                <span className="text-xs font-semibold text-forest">AI Classified</span>
              </div>
              <p className="text-[11px] text-bark-light mb-2">Architecture Decision Record</p>
              <div className="w-full bg-sand rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "94%" }}
                  transition={{ duration: 1.2, delay: 1 }}
                  className="bg-teal h-1.5 rounded-full"
                />
              </div>
              <p className="text-[10px] text-teal font-semibold mt-1">94% confidence</p>
            </div>
          </motion.div>

          {/* Floating card: Template (top-right) */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="absolute right-0 md:right-[5%] top-0 md:top-4 z-20"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 p-4 w-[190px] border border-white/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-golden/15 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5 text-golden-dark" />
                </div>
                <span className="text-xs font-semibold text-forest">Template</span>
              </div>
              <div className="bg-cream rounded-lg p-2.5 border border-sand">
                <p className="text-[11px] font-medium text-forest">Corporate Report v2</p>
                <p className="text-[10px] text-warm-gray">18 styles mapped</p>
              </div>
            </div>
          </motion.div>

          {/* Floating card: Security (bottom-left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="absolute left-[2%] md:left-[10%] bottom-8 md:bottom-12 z-20"
          >
            <div className="bg-forest/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 w-[210px] border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">End-to-end secure</p>
                  <p className="text-[10px] text-white/50">Your docs never leave your control</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating card: Export (bottom-right) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="absolute right-[2%] md:right-[8%] bottom-4 md:bottom-16 z-20"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 p-3.5 border border-white/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange/10 flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-forest" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-forest">Exported to SharePoint</p>
                  <p className="text-[10px] text-teal">Success &middot; just now</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  HOW IT WORKS — Three-step flow on golden background                       */
/* ═══════════════════════════════════════════════════════════════════════════ */

function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: FileText,
      title: "Bring your markdown",
      description:
        "Generated by Claude, exported from Notion, pulled from a repo — doesn't matter where it came from. If it's markdown, it works.",
    },
    {
      number: "2",
      icon: Layers,
      title: "Pick a template",
      description:
        "Use ours or upload your org's .docx template. MDDoc extracts every style and maps it automatically.",
    },
    {
      number: "3",
      icon: Download,
      title: "Output your .docx",
      description:
        "One click. Perfectly formatted. The right headings, the right fonts, the right layout. Every time.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-golden">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-sm font-medium text-forest-dark/50 uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight">
              Three steps. No drama.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.15}>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 h-full">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-forest-dark flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-golden">{step.number}</span>
                  </div>
                  <step.icon className="w-5 h-5 text-forest/40" />
                </div>

                <h3 className="font-display text-xl md:text-2xl text-forest-dark tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-forest/60 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector arrow (hidden on last card and mobile) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-5 z-10">
                    <ArrowRight className="w-4 h-4 text-forest-dark/30" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom proof point */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-forest-dark" />
              <span className="text-sm font-semibold text-forest-dark">Under 2 seconds</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-forest-dark/30" />
            <div className="flex items-center gap-2.5">
              <Brain className="w-4 h-4 text-forest-dark" />
              <span className="text-sm font-semibold text-forest-dark">AI picks the template for you</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-forest-dark/30" />
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-forest-dark" />
              <span className="text-sm font-semibold text-forest-dark">Try free — no signup</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  FEATURES — Alternating sections with floating UI elements                 */
/* ═══════════════════════════════════════════════════════════════════════════ */

function FeatureConversion() {
  const elements = [
    { label: "Headings", md: "# ## ###", desc: "All 6 levels, each mapped to your template's heading styles" },
    { label: "Tables", md: "| col |", desc: "Full table support with header rows and alignment" },
    { label: "Code blocks", md: "```", desc: "Fenced blocks with language hints preserved in output" },
    { label: "Nested lists", md: "- - -", desc: "Bullets, numbered, mixed — any depth, correct indentation" },
    { label: "Links & images", md: "![]()", desc: "Clickable hyperlinks and embedded images in your .docx" },
    { label: "Blockquotes", md: "> >", desc: "Mapped to your template's quote or callout style" },
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal direction="left">
            <p className="text-sm font-medium text-forest uppercase tracking-widest mb-3">
              Conversion Engine
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest tracking-tight leading-[1.1] mb-6">
              Everything converts.
              <br />
              Nothing breaks.
            </h2>
            <p className="text-lg text-bark-light leading-relaxed mb-6">
              Other converters choke on tables, mangle nested lists, and ignore your styles entirely. MDDoc handles 30+ markdown elements and maps each one to the exact paragraph or character style in your template.
            </p>
            <p className="text-lg text-bark-light leading-relaxed mb-8">
              The output isn&apos;t &ldquo;close enough.&rdquo; It&apos;s the heading style from row 47 of the style gallery. The one Carol from compliance insists on.
            </p>
            <div className="flex gap-4">
              <Link
                href="/convert"
                className="inline-flex items-center gap-2 bg-golden text-forest-dark font-semibold px-6 py-3 rounded-full text-sm hover:bg-golden-dark transition-all"
              >
                Try it free
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 text-forest font-semibold text-sm hover:text-teal transition-colors"
              >
                See all features
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-3">
              {elements.map((el, i) => (
                <motion.div
                  key={el.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl p-4 border border-sand bg-cream/50 hover:bg-cream transition-colors"
                >
                  <div className="w-14 h-10 rounded-lg bg-forest-dark flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] text-golden/80">{el.md}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-forest">{el.label}</p>
                    <p className="text-xs text-warm-gray">{el.desc}</p>
                  </div>
                  <Check className="w-4 h-4 text-teal flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function FeatureAI() {
  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual first on this one (reversed) */}
          <ScrollReveal direction="left" className="order-2 lg:order-1">
            <div className="relative">
              <div className="bg-white rounded-3xl p-6 border border-sand shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-forest">AI Classification</p>
                    <p className="text-xs text-warm-gray">Analyzing document...</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { type: "ADR", conf: 94, active: true },
                    { type: "Technical Spec", conf: 78, active: false },
                    { type: "Runbook", conf: 45, active: false },
                  ].map((item) => (
                    <div
                      key={item.type}
                      className={`rounded-xl p-3.5 border ${
                        item.active
                          ? "border-teal/30 bg-teal/[0.04]"
                          : "border-sand bg-cream/50"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${item.active ? "text-forest" : "text-bark-light"}`}>
                          {item.type}
                        </span>
                        <span className={`text-xs font-semibold ${item.active ? "text-teal" : "text-warm-gray"}`}>
                          {item.conf}%
                        </span>
                      </div>
                      <div className="w-full bg-sand rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.conf}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-1.5 rounded-full ${item.active ? "bg-teal" : "bg-sand-dark"}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating: auto-route badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-4 left-6 bg-golden text-forest rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Auto-routed to ADR template</span>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="order-1 lg:order-2">
            <p className="text-sm font-medium text-teal uppercase tracking-widest mb-3">
              AI Agent
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest tracking-tight leading-[1.1] mb-6">
              AI that knows
              <br />
              what you wrote.
            </h2>
            <p className="text-lg text-bark-light leading-relaxed mb-6">
              Drop in a document. MDDoc&apos;s AI reads it, classifies it — runbook,
              ADR, API spec — and routes it to the right template automatically.
            </p>
            <ul className="space-y-3">
              {[
                "Claude or GPT — your keys, your choice",
                "Automatic or review-first modes",
                "14 built-in document types",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-bark">
                  <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-teal" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function FeatureTemplates() {
  return (
    <section className="py-24 md:py-32 bg-forest overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal direction="left">
            <p className="text-sm font-medium text-golden uppercase tracking-widest mb-3">
              Templates
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-6">
              Your templates.
              <br />
              Your rules.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-6">
              Upload your org&apos;s Word templates — the ones with the right fonts,
              logos, and page layouts. Map any markdown element to any Word style.
            </p>
            <ul className="space-y-3">
              {[
                "Upload .docx templates",
                "Edit templates in the browser",
                "Visual style mapping editor",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/70">
                  <div className="w-5 h-5 rounded-full bg-golden/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-golden" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-3">
              {[
                { name: "Corporate Report", styles: 18, active: true },
                { name: "Technical Spec", styles: 14, active: false },
                { name: "Meeting Notes", styles: 12, active: false },
              ].map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`rounded-2xl p-5 flex items-center gap-4 border ${
                    t.active
                      ? "bg-white border-white/20 shadow-lg"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className={`w-12 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    t.active ? "bg-golden/10" : "bg-white/5"
                  }`}>
                    <FileText className={`w-5 h-5 ${t.active ? "text-golden" : "text-white/30"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${t.active ? "text-forest" : "text-white/70"}`}>
                      {t.name}
                    </p>
                    <p className={`text-xs ${t.active ? "text-warm-gray" : "text-white/30"}`}>
                      {t.styles} styles mapped
                    </p>
                  </div>
                  {t.active && (
                    <span className="text-xs font-semibold text-golden bg-golden/10 px-3 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function FeatureAPI() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal direction="left" className="order-2 lg:order-1">
            <div className="bg-forest-dark rounded-3xl p-6 md:p-8 font-mono text-sm shadow-xl">
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-golden/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-teal/60" />
                </div>
                <span className="text-[10px] text-white/20 ml-1">Terminal</span>
              </div>
              <pre className="text-white/50 whitespace-pre-wrap leading-loose text-xs md:text-sm">
<span className="text-warm-gray">$</span> <span className="text-golden">curl</span> -X POST api.mddoc.app/convert \{"\n"}  -H <span className="text-teal-light">&quot;Authorization: Bearer dk_...&quot;</span> \{"\n"}  -d <span className="text-orange">&apos;{`{"markdown":"# Report..."}`}&apos;</span>{"\n"}
<span className="text-teal-light">{`{`}</span>{"\n"}  <span className="text-white/30">&quot;status&quot;:</span> <span className="text-teal-light">&quot;completed&quot;</span>,{"\n"}  <span className="text-white/30">&quot;download&quot;:</span> <span className="text-orange">&quot;https://...&quot;</span>,{"\n"}  <span className="text-white/30">&quot;time_ms&quot;:</span> <span className="text-golden">1247</span>{"\n"}<span className="text-teal-light">{`}`}</span>
              </pre>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="order-1 lg:order-2">
            <p className="text-sm font-medium text-forest/60 uppercase tracking-widest mb-3">
              Developer
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest tracking-tight leading-[1.1] mb-6">
              Built for
              <br />
              automation.
            </h2>
            <p className="text-lg text-bark-light leading-relaxed mb-6">
              Full REST API. MCP server for Claude. Generate API keys, build
              pipelines. MDDoc fits into your workflow, not the other way around.
            </p>
            <div className="flex gap-4">
              <Link
                href="/features"
                className="inline-flex items-center gap-2 bg-golden text-forest-dark font-semibold px-6 py-3 rounded-full text-sm hover:bg-golden-dark transition-all"
              >
                View API docs
              </Link>
              <Link
                href="/convert"
                className="inline-flex items-center gap-2 text-forest font-semibold text-sm hover:text-teal transition-colors"
              >
                Try it free
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  ALSO BUILT IN — The stuff you didn't know you needed                      */
/* ═══════════════════════════════════════════════════════════════════════════ */

function AlsoBuiltIn() {
  const items = [
    {
      icon: Layers,
      label: "Visual style mapper",
      desc: "Drag-and-drop editor that maps every markdown element to a Word style. See the result before you convert.",
      href: "/features",
    },
    {
      icon: Share2,
      label: "SharePoint export",
      desc: "Connect via OAuth and push converted docs straight to your SharePoint library. One click, right folder.",
      href: "/features",
    },
    {
      icon: Sparkles,
      label: "MCP server for Claude",
      desc: "Give Claude the ability to convert documents directly. Your AI workflow outputs polished .docx files.",
      href: "/docs",
    },
    {
      icon: FileText,
      label: "Live preview editor",
      desc: "Write or edit markdown in the browser with a real-time preview of the styled Word output.",
      href: "/convert",
    },
    {
      icon: Code2,
      label: "Batch via API",
      desc: "Convert hundreds of documents programmatically. Webhooks notify you when each one is done.",
      href: "/docs",
    },
    {
      icon: Lock,
      label: "Audit trail",
      desc: "Every conversion logged. Who converted what, when, which template. Compliance teams love this.",
      href: "/features",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-golden">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-forest-dark/50 uppercase tracking-widest mb-3">
              Also built in
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-forest-dark tracking-tight">
              The stuff you didn&apos;t know you needed.
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {items.map((item) => (
            <motion.div key={item.label} variants={fadeInUp}>
              <Link
                href={item.href}
                className="group block bg-white/80 backdrop-blur-sm rounded-2xl p-7 border border-white/50 hover:bg-white hover:shadow-lg hover:shadow-forest/[0.05] transition-all duration-300 h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-dark/[0.07] flex items-center justify-center mb-4 group-hover:bg-forest-dark/10 transition-colors">
                  <item.icon className="w-5 h-5 text-forest-dark group-hover:text-teal transition-colors" />
                </div>
                <h3 className="font-semibold text-forest-dark mb-2">{item.label}</h3>
                <p className="text-sm text-forest/60 leading-relaxed">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  TESTIMONIALS                                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */

function SocialProof() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <section className="py-24 md:py-32 bg-white">
      <Container size="narrow">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-medium text-forest uppercase tracking-widest mb-12">
              Trusted by teams
            </p>

            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="font-display text-2xl md:text-4xl text-forest leading-snug mb-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="font-semibold text-forest">{t.author}</p>
              <p className="text-warm-gray text-sm mt-1">
                {t.role}, {t.company}
              </p>
            </motion.div>

            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="w-9 h-9 rounded-full border border-sand-dark flex items-center justify-center text-warm-gray hover:text-forest hover:border-forest/20 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === idx ? "bg-forest w-6" : "bg-sand-dark w-1.5"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
                className="w-9 h-9 rounded-full border border-sand-dark flex items-center justify-center text-warm-gray hover:text-forest hover:border-forest/20 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  CTA                                                                       */
/* ═══════════════════════════════════════════════════════════════════════════ */

function Cta() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-forest-dark via-forest to-teal-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(250,253,153,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(250,253,153,0.1),transparent_50%)]" />

      <Container className="relative z-10 text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
            Ready to stop
            <br />
            fighting Word?
          </h2>
          <p className="text-lg text-white/50 max-w-md mx-auto mb-12 leading-relaxed">
            Convert your first document in under a minute.
            <br />
            No account needed. No commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/convert"
              className="inline-flex items-center justify-center gap-2.5 bg-golden text-forest-dark font-semibold px-8 py-4 rounded-full text-base hover:bg-golden-light transition-all shadow-xl shadow-black/20 hover:-translate-y-0.5"
            >
              Try it free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-white/20 transition-all border border-white/10"
            >
              View pricing
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PAGE                                                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */

export function HomePageClient() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeatureConversion />
      <FeatureAI />
      <FeatureTemplates />
      <FeatureAPI />
      <AlsoBuiltIn />
      <SocialProof />
      <Cta />
    </>
  );
}
