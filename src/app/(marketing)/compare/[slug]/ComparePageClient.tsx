"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, X as XIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GlowCard } from "@/components/interactive/GlowCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ComparisonPage } from "@/data/comparisons";

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-green-600 mx-auto" />
    ) : (
      <XIcon className="w-5 h-5 text-warm-gray/50 mx-auto" />
    );
  }
  return <span className="text-sm text-bark">{value}</span>;
}

export function ComparePageClient({ comparison }: { comparison: ComparisonPage }) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-forest-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-golden/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-golden/8 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link
                href="/compare"
                className="hover:text-white/70 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Compare
              </Link>
              <span>/</span>
              <span className="text-white/60">{comparison.title}</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              {comparison.title}
            </h1>

            {/* Verdict pill */}
            <div className="inline-block bg-golden text-forest-dark font-semibold text-sm px-5 py-2.5 rounded-full leading-snug max-w-2xl">
              {comparison.verdict}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Comparison Table ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-8">
              Feature comparison
            </h2>

            <GlowCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-sand">
                      <th className="px-6 py-4 text-sm font-semibold text-warm-gray uppercase tracking-wider">
                        Feature
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-forest uppercase tracking-wider text-center">
                        MDDoc
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-warm-gray uppercase tracking-wider text-center">
                        {comparison.competitorName}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.rows.map((row, index) => (
                      <tr
                        key={row.feature}
                        className={index % 2 === 0 ? "bg-cream/40" : "bg-white"}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <CellValue value={row.mddoc} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <CellValue value={row.competitor} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlowCard>
          </motion.div>
        </Container>
      </section>

      {/* ── Pros ─────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-cream">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-8">
              Strengths
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* MDDoc strengths */}
              <GlowCard className="p-8">
                <h3 className="text-lg font-bold text-forest mb-4">
                  MDDoc strengths
                </h3>
                <ul className="space-y-3">
                  {comparison.prosDocmd.map((pro) => (
                    <li key={pro} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-bark leading-relaxed">{pro}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>

              {/* Competitor strengths */}
              <GlowCard className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {comparison.competitorName} strengths
                </h3>
                <ul className="space-y-3">
                  {comparison.prosCompetitor.map((pro) => (
                    <li key={pro} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-sand flex items-center justify-center">
                        <Check className="w-3 h-3 text-warm-gray" />
                      </div>
                      <span className="text-sm text-bark leading-relaxed">{pro}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── When to use what ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-8">
              When to use what
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Use MDDoc when */}
              <GlowCard className="p-8">
                <h3 className="text-lg font-bold text-forest mb-4">
                  Use MDDoc when...
                </h3>
                <ul className="space-y-3">
                  {comparison.useDocmdWhen.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-forest" />
                      <span className="text-sm text-bark leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>

              {/* Use competitor when */}
              <GlowCard className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Use {comparison.competitorName} when...
                </h3>
                <ul className="space-y-3">
                  {comparison.useCompetitorWhen.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-warm-gray" />
                      <span className="text-sm text-bark leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-cream">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-8">
              Frequently asked questions
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {comparison.faqs.map((faq, index) => (
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
          </motion.div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-teal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,253,153,0.08),transparent_70%)]" />

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Ready to try MDDoc?
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
              See the difference for yourself. Convert a document in seconds — no signup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/convert"
                className="inline-flex items-center justify-center gap-2 bg-golden text-forest-dark font-bold px-8 py-4 rounded-xl text-lg hover:bg-golden-light transition-all shadow-lg"
              >
                Try free converter
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all"
              >
                See pricing
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
