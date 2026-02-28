"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code, FileText, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GlowCard } from "@/components/interactive/GlowCard";
import { useCases } from "@/data/use-cases";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  developers: Code,
  "technical-writers": FileText,
  "ai-teams": Sparkles,
};

export function UseCasesIndexClient() {
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
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-golden bg-golden/10 px-4 py-1.5 rounded-full mb-6">
              Use Cases
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Built for how you work
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              See how MDDoc fits into the workflows of developers, technical
              writers, and AI teams.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Use case cards */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {useCases.map((useCase) => {
              const Icon = iconMap[useCase.slug] || FileText;
              return (
                <motion.div key={useCase.slug} variants={fadeInUp}>
                  <Link href={`/use-cases/${useCase.slug}`} className="block h-full">
                    <GlowCard className="p-8 text-center h-full flex flex-col items-center">
                      <div className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-forest" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        {useCase.persona}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-5 flex-1">
                        {useCase.subtitle}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </GlowCard>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
