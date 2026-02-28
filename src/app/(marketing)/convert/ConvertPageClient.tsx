"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  Loader2,
  FileText,
  AlertCircle,
  CheckCircle2,
  ClipboardPaste,
  Eye,
  Lock,
  Bold,
  Italic,
  Code,
  LinkIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlowCard } from "@/components/interactive/GlowCard";
import { GradientText } from "@/components/shared/GradientText";
import { sampleMarkdown } from "@/data/features";
import { convertFaqs } from "@/data/convert-faq";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const MagneticButton = dynamic(
  () => import("@/components/interactive/MagneticButton").then((mod) => ({ default: mod.MagneticButton })),
  { ssr: false, loading: () => <div className="inline-block" /> }
);

const AnimatedCounter = dynamic(
  () => import("@/components/interactive/AnimatedCounter").then((mod) => ({ default: mod.AnimatedCounter })),
  { ssr: false, loading: () => <span /> }
);
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// ─── Constants ──────────────────────────────────────────────────────────────

const MAX_CHARS = 10000;
const MAX_FREE_CONVERSIONS = 3;
const STORAGE_KEY = "docmd-conversion-count";

// ─── Simple Markdown-to-HTML renderer ───────────────────────────────────────

function renderMarkdownToHtml(md: string): string {
  let html = "";
  const lines = md.split("\n");
  let i = 0;
  let inList: "ul" | "ol" | null = null;

  function closeList() {
    if (inList) {
      html += inList === "ul" ? "</ul>" : "</ol>";
      inList = null;
    }
  }

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderInline(text: string): string {
    // Escape HTML first, then apply markdown formatting
    return escapeHtml(text)
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/_([^_]+)_/g, "<em>$1</em>")
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        (_, linkText, url) => {
          if (/^javascript:/i.test(url.trim())) return linkText;
          return `<a href="${url}" class="text-teal underline" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
        }
      );
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.trimStart().startsWith("```")) {
      closeList();
      const lang = line.trimStart().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      const escaped = codeLines
        .join("\n")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      html += `<div class="code-block"><pre><code${lang ? ` class="language-${lang}"` : ""}>${escaped}</code></pre></div>`;
      continue;
    }

    if (
      line.trim().startsWith("|") &&
      i + 1 < lines.length &&
      /^\|[\s-:|]+\|$/.test(lines[i + 1].trim())
    ) {
      closeList();
      const headerCells = line
        .trim()
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim());
      i += 2;
      const dataRows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        dataRows.push(
          lines[i]
            .trim()
            .split("|")
            .filter((c) => c.trim() !== "")
            .map((c) => c.trim())
        );
        i++;
      }
      html += '<div class="table-wrapper"><table>';
      html += "<thead><tr>";
      headerCells.forEach((c) => {
        html += `<th>${renderInline(c)}</th>`;
      });
      html += "</tr></thead><tbody>";
      dataRows.forEach((row) => {
        html += "<tr>";
        row.forEach((c) => {
          html += `<td>${renderInline(c)}</td>`;
        });
        html += "</tr>";
      });
      html += "</tbody></table></div>";
      continue;
    }

    if (line.startsWith("### ")) {
      closeList();
      html += `<h3>${renderInline(line.slice(4).trim())}</h3>`;
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      html += `<h2>${renderInline(line.slice(3).trim())}</h2>`;
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      closeList();
      html += `<h1>${renderInline(line.slice(2).trim())}</h1>`;
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      closeList();
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      html += `<blockquote>${quoteLines.map((l) => renderInline(l)).join("<br/>")}</blockquote>`;
      continue;
    }

    if (/^[\-\*\+]\s/.test(line.trim())) {
      if (inList !== "ul") {
        closeList();
        html += "<ul>";
        inList = "ul";
      }
      html += `<li>${renderInline(line.trim().replace(/^[\-\*\+]\s+/, ""))}</li>`;
      i++;
      continue;
    }

    if (/^\d+\.\s/.test(line.trim())) {
      if (inList !== "ol") {
        closeList();
        html += "<ol>";
        inList = "ol";
      }
      const match = line.trim().match(/^\d+\.\s+(.*)/);
      if (match) {
        html += `<li>${renderInline(match[1])}</li>`;
      }
      i++;
      continue;
    }

    if (line.trim() === "") {
      closeList();
      i++;
      continue;
    }

    closeList();
    html += `<p>${renderInline(line.trim())}</p>`;
    i++;
  }

  closeList();
  return html;
}

// ─── Hook: localStorage conversion count ────────────────────────────────────

function useConversionCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCount(parseInt(stored, 10) || 0);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // localStorage unavailable
      }
      return next;
    });
  }, []);

  return { count, increment, isLimitReached: count >= MAX_FREE_CONVERSIONS };
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-golden/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-golden/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-golden bg-golden/10 px-4 py-1.5 rounded-full mb-6">
            Free Tool
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Markdown to Word{" "}
            <GradientText variant="golden">Converter</GradientText>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Convert markdown to professionally formatted .docx files instantly.
            Live preview, clean output, no signup required.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Converter Tool ─────────────────────────────────────────────────────────

function ConverterTool() {
  const [markdown, setMarkdown] = useState(sampleMarkdown.trim());
  const [isConverting, setIsConverting] = useState(false);
  const [conversionSuccess, setConversionSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const { count, increment, isLimitReached } = useConversionCount();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lineCount = markdown.split("\n").length;
  const remainingConversions = Math.max(0, MAX_FREE_CONVERSIONS - count);
  const html = renderMarkdownToHtml(markdown);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleConvert = useCallback(async () => {
    if (isLimitReached) return;
    if (!markdown.trim()) {
      setError("Please enter some markdown content.");
      return;
    }
    if (markdown.length > MAX_CHARS) {
      setError(
        `Content exceeds ${MAX_CHARS.toLocaleString()} character limit.`
      );
      return;
    }

    setIsConverting(true);
    setError(null);
    setConversionSuccess(false);
    setProgress(0);

    // Simulated progress
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 15, 85));
    }, 200);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(
          errData?.error || "Conversion failed. Please try again."
        );
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "docmd-output.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      increment();
      setConversionSuccess(true);
      setTimeout(() => {
        setConversionSuccess(false);
        setProgress(0);
      }, 3000);
    } catch (err) {
      clearInterval(progressInterval);
      setProgress(0);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsConverting(false);
    }
  }, [markdown, isLimitReached, increment]);

  return (
    <section className="py-8 md:py-12 bg-cream">
      <Container size="wide">
        {/* Outer card */}
        <div className="rounded-2xl border border-sand bg-white shadow-xl overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-sand bg-cream/50">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("editor")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "editor"
                    ? "bg-forest text-white"
                    : "text-warm-gray hover:text-forest"
                }`}
              >
                Markdown
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors lg:hidden ${
                  activeTab === "preview"
                    ? "bg-forest text-white"
                    : "text-warm-gray hover:text-forest"
                }`}
              >
                Preview
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-warm-gray font-mono bg-sand/60 px-2.5 py-1 rounded-md">
                {markdown.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
              <button
                onClick={() => setMarkdown(sampleMarkdown.trim())}
                className="text-xs font-medium text-forest hover:text-forest-dark transition-colors"
              >
                Load sample
              </button>
            </div>
          </div>

          {/* Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-sand" style={{ minHeight: "540px" }}>
            {/* Editor */}
            <div className={`flex flex-col ${activeTab !== "editor" ? "hidden lg:flex" : "flex"}`}>
              {/* Decorative toolbar */}
              <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-[#1a1b26]">
                {[Bold, Italic, Code, LinkIcon].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded flex items-center justify-center text-white/20"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                ))}
              </div>

              <div className="relative flex flex-1 bg-[#1a1b26] focus-within:ring-2 focus-within:ring-golden/30 focus-within:ring-inset transition-shadow">
                {/* Line numbers */}
                <div
                  ref={lineNumbersRef}
                  className="flex-shrink-0 w-12 bg-[#13141d] text-white/20 text-xs font-mono pt-4 pb-4 text-right pr-3 overflow-hidden select-none"
                  aria-hidden="true"
                >
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i} className="leading-[1.625rem]">
                      {i + 1}
                    </div>
                  ))}
                </div>

                <textarea
                  ref={textareaRef}
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  onScroll={handleScroll}
                  spellCheck={false}
                  className="flex-1 bg-transparent text-white/90 font-mono text-sm leading-[1.625rem] p-4 resize-none focus:outline-none placeholder:text-white/30 w-full"
                  placeholder="Paste your markdown here..."
                />
              </div>
            </div>

            {/* Preview */}
            <div className={`flex flex-col ${activeTab !== "preview" ? "hidden lg:flex" : "flex"}`}>
              {/* Preview toolbar */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-sand">
                <FileText className="w-4 h-4 text-forest" />
                <span className="text-xs font-medium text-muted-foreground">
                  document.docx
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] text-teal font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                  </span>
                  Live
                </span>
              </div>

              <div className="flex-1 overflow-auto bg-white">
                {markdown.trim() ? (
                  <div
                    className="doc-preview p-8 md:p-12 max-w-none"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <FileText className="w-10 h-10 text-sand-dark mb-3" />
                    <p className="text-sm text-warm-gray">
                      Start typing markdown to see a live preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Convert button area */}
          <div className="border-t border-sand bg-cream/50 px-4 py-4">
            {/* Progress bar */}
            <AnimatePresence>
              {(isConverting || conversionSuccess) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3"
                >
                  <div className="w-full bg-sand rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-1.5 rounded-full bg-forest"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {isLimitReached ? (
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 w-full">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Free limit reached
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Sign up for unlimited conversions, custom templates, and
                        more.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="https://app.mddoc.app/signup?tier=solo"
                    className="inline-flex items-center gap-2 bg-golden text-forest-dark font-semibold px-6 py-3 rounded-xl text-sm hover:bg-golden-dark transition-colors flex-shrink-0"
                  >
                    Sign Up Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <MagneticButton
                    onClick={handleConvert}
                    className={`inline-flex items-center justify-center gap-2.5 font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg w-full sm:w-auto ${
                      isConverting
                        ? "bg-golden/80 text-forest-dark cursor-wait shadow-golden-dark/20"
                        : "bg-golden text-forest-dark hover:bg-golden-dark shadow-golden-dark/25 hover:shadow-xl hover:shadow-golden-dark/30"
                    }`}
                  >
                    {isConverting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Converting...
                      </>
                    ) : conversionSuccess ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Downloaded!
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Convert &amp; Download
                      </>
                    )}
                  </MagneticButton>

                  <span className="text-sm text-muted-foreground">
                    {remainingConversions} of {MAX_FREE_CONVERSIONS} free
                    conversions remaining
                  </span>
                </>
              )}

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── How It Works ───────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      icon: ClipboardPaste,
      title: "Paste",
      description:
        "Drop your markdown into the editor. Any format — GitHub, Obsidian, plain .md files.",
    },
    {
      icon: Eye,
      title: "Preview",
      description:
        "See exactly how your document will look in Word. Headings, tables, code blocks — all styled.",
    },
    {
      icon: Download,
      title: "Download",
      description:
        "Click convert. Your .docx file downloads in under two seconds. Open it in Word or Google Docs.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <SectionHeading
          badge="How It Works"
          title="Three steps. That's it."
          subtitle="No accounts, no installs, no learning curve."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={fadeInUp}>
              <GlowCard className="p-8 text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-6 h-6 text-forest" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-warm-gray mb-2">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Educational Content ─────────────────────────────────────────────────────

function WhatIsConversion() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container size="narrow">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-8">
            What Is Markdown to Word Conversion?
          </h2>

          <div className="space-y-6 text-bark-light text-lg leading-relaxed">
            <p>
              Markdown is the writing format developers, technical writers, and
              AI tools use every day. It&apos;s plain text with simple syntax:{" "}
              <code className="text-sm bg-sand px-1.5 py-0.5 rounded font-mono">#</code>{" "}
              for headings,{" "}
              <code className="text-sm bg-sand px-1.5 py-0.5 rounded font-mono">**</code>{" "}
              for bold,{" "}
              <code className="text-sm bg-sand px-1.5 py-0.5 rounded font-mono">-</code>{" "}
              for lists. It&apos;s fast to write, easy to version control, and
              works everywhere. But when you need to share a document with
              someone who lives in Microsoft Word — a client, a compliance team,
              a manager — you need a .docx file.
            </p>

            <p>
              Markdown to Word conversion takes your .md content and transforms
              it into a properly formatted Word document. Headings become Word
              heading styles. Tables get borders and alignment. Code blocks are
              styled with monospace fonts. The result opens perfectly in
              Microsoft Word, Google Docs, and LibreOffice — no manual formatting
              required.
            </p>

            <p>
              The alternative is copy-pasting markdown into Word and fixing every
              heading, table, and code block by hand. That takes time, introduces
              errors, and produces inconsistent output. A converter eliminates
              that entire step. Write in markdown, convert in seconds, ship a
              professional document.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

// ─── Social Proof Stats ─────────────────────────────────────────────────────

function StatsStrip() {
  const stats = [
    { target: 310, suffix: "K+", label: "Documents converted" },
    { target: 2, prefix: "<", suffix: "s", label: "Average conversion time" },
    { target: 30, suffix: "+", label: "Markdown elements supported" },
  ];

  return (
    <section className="py-16 md:py-20 bg-golden">
      <Container>
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl md:text-4xl text-forest-dark tracking-tight mb-12">
            Trusted by teams everywhere
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-display text-5xl md:text-6xl text-forest-dark tracking-tight mb-2">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <p className="text-sm text-forest/70 font-medium">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

function FaqSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container size="narrow">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about converting markdown to Word."
        />

        <ScrollReveal>
          <Accordion type="single" collapsible className="w-full">
            {convertFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-b border-forest/10"
              >
                <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </Container>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-teal" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,253,153,0.08),transparent_70%)]" />

      <Container className="relative z-10 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Need more?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            Unlimited conversions, custom templates, AI classification, and
            SharePoint export. Everything your team needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              as="a"
              href="https://app.mddoc.app/signup?tier=solo"
              className="inline-flex items-center justify-center gap-2 bg-golden text-forest-dark font-bold px-8 py-4 rounded-xl text-lg hover:bg-golden-light transition-all shadow-lg"
            >
              Sign Up Free
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export function ConvertPageClient() {
  return (
    <>
      <Hero />
      <ConverterTool />
      <HowItWorks />
      <WhatIsConversion />
      <StatsStrip />
      <FaqSection />
      <CtaSection />
    </>
  );
}
