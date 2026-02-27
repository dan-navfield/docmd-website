"use client";

import { motion } from "framer-motion";
import { FileText, Rss } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function BlogPageClient() {
  return (
    <section className="relative min-h-[80vh] flex items-center py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-white to-cream" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-teal/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-orange/10 to-golden/10 flex items-center justify-center"
          >
            <FileText className="w-10 h-10 text-orange" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Blog
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10"
          >
            Product updates, markdown tips, and document automation insights.
            Coming soon.
          </motion.p>

          {/* Decorative cards preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-border p-6 shadow-sm"
              >
                <div className="w-full h-24 bg-gradient-to-br from-cream to-off-white rounded-lg mb-4" />
                <div className="h-3 w-3/4 bg-border rounded mb-2" />
                <div className="h-3 w-1/2 bg-border/60 rounded" />
              </div>
            ))}
          </motion.div>

          {/* Subscribe hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-white border border-border rounded-full px-5 py-2.5 shadow-sm"
          >
            <Rss className="w-4 h-4 text-orange" />
            We&apos;ll have an RSS feed when we launch. Stay tuned.
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
