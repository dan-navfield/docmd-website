"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GlowCard } from "@/components/interactive/GlowCard";
import { articles } from "@/data/articles";
import { staggerContainer, fadeInUp } from "@/lib/animations";

// ─── Category helpers ─────────────────────────────────────────────────────────

const categories = ["all", "guide", "product", "opinion"] as const;
type Category = (typeof categories)[number];

const categoryLabels: Record<Category, string> = {
  all: "All",
  guide: "Guides",
  product: "Product",
  opinion: "Opinion",
};

function categoryBadgeClasses(category: "guide" | "product" | "opinion") {
  switch (category) {
    case "guide":
      return "bg-forest text-white";
    case "product":
      return "bg-golden text-forest-dark";
    case "opinion":
      return "bg-teal text-white";
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ArticlesHero() {
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Articles
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Guides, tips, and insights about markdown to Word conversion.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Category Filter ──────────────────────────────────────────────────────────

function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
            active === cat
              ? "bg-golden text-forest-dark font-semibold shadow-sm"
              : "bg-white text-bark border border-sand hover:bg-cream"
          }`}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({
  article,
}: {
  article: (typeof articles)[number];
}) {
  return (
    <Link href={`/articles/${article.slug}`} className="block h-full">
      <GlowCard className="h-full">
        <div className="p-6 flex flex-col h-full">
          {/* Category badge */}
          <span
            className={`inline-block self-start text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4 ${categoryBadgeClasses(
              article.category
            )}`}
          >
            {article.category}
          </span>

          {/* Title */}
          <h2 className="text-lg font-bold text-forest mb-2 leading-snug">
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-bark leading-relaxed mb-4 flex-1">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-warm-gray">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.publishedDate)}
            </span>
          </div>
        </div>
      </GlowCard>
    </Link>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────

export function ArticlesPageClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      <ArticlesHero />

      <section className="py-16 md:py-24 bg-cream">
        <Container>
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={activeCategory}
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.map((article) => (
              <motion.div key={article.slug} variants={fadeInUp}>
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>

          {filteredArticles.length === 0 && (
            <p className="text-center text-warm-gray mt-12">
              No articles in this category yet. Check back soon.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
