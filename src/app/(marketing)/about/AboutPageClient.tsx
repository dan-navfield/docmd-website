"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  GitBranch,
  Zap,
  Server,
  Code2,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GradientText } from "@/components/shared/GradientText";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { AnimatedCounter } from "@/components/interactive/AnimatedCounter";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

// ─── Hero ────────────────────────────────────────────────────────────────────

function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-golden/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-golden bg-golden/10 px-4 py-1.5 rounded-full mb-6">
            About DocMD
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            We built DocMD because Word templates are{" "}
            <GradientText variant="golden">hell.</GradientText>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            A tool born from frustration, built with obsession.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Narrative Section Component ─────────────────────────────────────────────

function NarrativeSection({
  badge,
  title,
  body,
  bg,
  icon: Icon,
  children,
}: {
  badge: string;
  title: string;
  body: string;
  bg: "white" | "cream" | "forest";
  icon: React.ElementType;
  children?: React.ReactNode;
}) {
  const isLight = bg === "forest";

  return (
    <section
      className={cn(
        "py-20 md:py-28",
        bg === "white" && "bg-white",
        bg === "cream" && "bg-cream",
        bg === "forest" && "bg-forest"
      )}
    >
      <Container size="narrow">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                isLight ? "bg-white/10" : "bg-forest/10"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isLight ? "text-golden" : "text-forest"
                )}
              />
            </div>
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-widest",
                isLight ? "text-white/50" : "text-muted-foreground"
              )}
            >
              {badge}
            </span>
          </div>

          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight",
              isLight ? "text-white" : "text-foreground"
            )}
          >
            {title}
          </h2>

          <div
            className={cn(
              "text-lg md:text-xl leading-[1.8] space-y-6",
              isLight ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {children}
        </ScrollReveal>
      </Container>
    </section>
  );
}

// ─── How It Works Visual ─────────────────────────────────────────────────────

function HowItWorksVisual() {
  const steps = [
    {
      icon: FileText,
      label: "Parse Markdown",
      detail: "Abstract syntax tree",
      color: "text-golden-dark bg-golden/10",
    },
    {
      icon: GitBranch,
      label: "Extract Styles",
      detail: "Every paragraph & character style",
      color: "text-teal bg-teal/10",
    },
    {
      icon: Workflow,
      label: "Apply Mappings",
      detail: "Your rules, your styles",
      color: "text-golden-dark bg-golden/10",
    },
    {
      icon: Zap,
      label: "Generate .docx",
      detail: "Carol-approved output",
      color: "text-forest bg-forest/10",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {steps.map((step, i) => (
        <motion.div key={step.label} variants={fadeInUp}>
          <div className="relative p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3",
                step.color
              )}
            >
              <step.icon className="w-6 h-6" />
            </div>
            <div className="text-sm font-bold text-white mb-1">
              {step.label}
            </div>
            <div className="text-xs text-white/40">{step.detail}</div>
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-center text-white/20">
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Stats Section ───────────────────────────────────────────────────────────

function StatsSection() {
  const stats = [
    { value: 30, suffix: "+", label: "Markdown elements supported" },
    { value: 50, suffix: "+", label: "Template styles extracted" },
    { value: 2, suffix: "s", label: "Average conversion time" },
    { value: 0, suffix: "", label: "Times you touch Word", prefix: "" },
  ];

  return (
    <section className="py-16 bg-golden">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <ScrollReveal key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-forest-dark">
                {stat.prefix !== undefined ? (
                  <span>{stat.prefix}{stat.value}{stat.suffix}</span>
                ) : (
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <p className="mt-2 text-sm text-forest/60">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
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
            Ready to stop formatting?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            Your markdown deserves better than copy-paste. Give it a real
            template. Give it DocMD.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              as="a"
              href="/convert"
              className="inline-flex items-center justify-center gap-2 bg-golden text-forest-dark font-bold px-8 py-4 rounded-xl text-lg hover:bg-golden-light transition-all shadow-lg"
            >
              Try It Free
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

// ─── Page ────────────────────────────────────────────────────────────────────

export function AboutPageClient() {
  return (
    <>
      <AboutHero />

      <NarrativeSection
        badge="The Problem"
        title="Everyone has templates. Nobody uses them."
        body={`Every organization has Word templates. Carefully designed, painstakingly maintained, universally ignored. Because nobody wants to manually format a document. So people hack together their own versions, email gets clogged with 'Final_v3_REAL_FINAL.docx', and the template police give up.\n\nMeanwhile, developers write in markdown because it's clean, it's version-controllable, and it doesn't make you want to throw your laptop. But when it's time to share with stakeholders? Copy-paste into Word. Fix the headings. Fix the lists. Fix the tables. Repeat until dead.`}
        bg="white"
        icon={FileText}
      />

      <NarrativeSection
        badge="The Moment"
        title="What if your markdown just... became the document?"
        body={`Not a generic conversion. Not 'close enough.' The actual template. The actual styles. The heading style from row 47 of the style gallery that Carol from compliance insists on.\n\nThat's what DocMD does. It reads your markdown, reads your template, and produces a Word doc that looks like a human spent an hour on it. Except it took two seconds and nobody had to open Word.`}
        bg="cream"
        icon={Zap}
      />

      <NarrativeSection
        badge="How We Built It"
        title="Parsing, mapping, rendering. No magic."
        body={`We parse markdown into an abstract syntax tree. We extract every paragraph and character style from your Word template. Then we walk the tree and apply your mapping rules \u2014 heading 1 maps to your heading style, bullet lists map to your list style, code blocks get your code style.\n\nThe result is a .docx file that passes even Carol's inspection.`}
        bg="forest"
        icon={Code2}
      >
        <HowItWorksVisual />
      </NarrativeSection>

      <StatsSection />

      <NarrativeSection
        badge="What's Next"
        title="API-first. Automation-ready. Always shipping."
        body={`DocMD is already API-first. Every feature works through REST endpoints and our MCP server. We're building toward a world where your documentation pipeline is fully automated \u2014 markdown goes in, styled documents come out, and nobody has to think about formatting ever again.\n\nWe ship fast, we listen to users, and we don't build features nobody asked for. If you've got an opinion about how document tooling should work, we want to hear it.`}
        bg="white"
        icon={Server}
      />

      <CtaBanner />
    </>
  );
}
