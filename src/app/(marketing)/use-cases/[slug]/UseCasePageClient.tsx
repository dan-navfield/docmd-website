"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GlowCard } from "@/components/interactive/GlowCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { UseCase } from "@/data/use-cases";

export function UseCasePageClient({ useCase }: { useCase: UseCase }) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-forest-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-golden/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-golden/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
              <Link
                href="/use-cases"
                className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Use Cases
              </Link>
              <span>/</span>
              <span className="text-white/70">{useCase.persona}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              {useCase.headline}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              {useCase.subtitle}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Pain points */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-red-50 text-red-600 px-3 py-1 rounded-full mb-4">
              The Problem
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              What slows you down
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            {useCase.painPoints.map((point) => (
              <motion.div key={point.title} variants={fadeInUp}>
                <GlowCard
                  className="p-6 h-full"
                  glowColor="rgba(220, 38, 38, 0.08)"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-24 bg-cream">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-forest/10 text-forest px-3 py-1 rounded-full mb-4">
              The Solution
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              How DocMD helps
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            {useCase.solutions.map((solution) => (
              <motion.div key={solution.title} variants={fadeInUp}>
                <GlowCard
                  className="p-6 h-full"
                  glowColor="rgba(76, 87, 62, 0.12)"
                >
                  <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-5 h-5 text-forest" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Workflow */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-forest/10 text-forest px-3 py-1 rounded-full mb-4">
              Workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Your workflow with DocMD
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {useCase.workflow.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Vertical connector line */}
                {index < useCase.workflow.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-px bg-sand-dark" />
                )}

                {/* Step number */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-golden flex items-center justify-center">
                  <span className="text-sm font-bold text-forest-dark">
                    {step.step}
                  </span>
                </div>

                {/* Step content */}
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-cream">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-forest/10 text-forest px-3 py-1 rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Common questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {useCase.faqs.map((faq, index) => (
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

      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-teal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,253,153,0.08),transparent_70%)]" />

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Start converting
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
              Try the free converter. No account required. See how your markdown
              looks as a Word document in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/convert"
                className="inline-flex items-center justify-center gap-2 bg-golden text-forest-dark font-semibold px-8 py-3 rounded-full text-lg hover:bg-golden-dark transition-all shadow-lg"
              >
                Try DocMD free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-white/10 transition-all"
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
