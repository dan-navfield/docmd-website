"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GlowCard } from "@/components/interactive/GlowCard";
import { comparisons } from "@/data/comparisons";

export function CompareIndexClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-forest-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-golden/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-golden/8 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Compare MDDoc
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Fair, detailed comparisons to help you pick the right tool for your workflow.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Comparison cards grid */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {comparisons.map((comparison, index) => (
              <motion.div
                key={comparison.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/compare/${comparison.slug}`} className="block h-full">
                  <GlowCard className="p-8 h-full flex flex-col">
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      {comparison.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {comparison.competitorDescription}
                    </p>
                    <div className="bg-golden/10 border border-golden/20 rounded-lg px-4 py-3 mb-6">
                      <p className="text-sm text-forest-dark leading-relaxed line-clamp-2">
                        <span className="font-semibold">Verdict:</span>{" "}
                        {comparison.verdict}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-forest font-semibold text-sm group">
                      Read comparison
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </GlowCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
