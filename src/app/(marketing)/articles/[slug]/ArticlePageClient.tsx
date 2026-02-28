"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GlowCard } from "@/components/interactive/GlowCard";
import { articles, type Article } from "@/data/articles";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Article content prose styles ─────────────────────────────────────────────

const proseClasses = [
  "[&_p]:text-bark [&_p]:leading-relaxed [&_p]:mb-4",
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-bark",
  "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-bark",
  "[&_li]:mb-2 [&_li]:leading-relaxed",
  "[&_a]:text-forest [&_a]:underline [&_a]:hover:text-forest-dark",
  "[&_code]:bg-sand [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono",
  "[&_pre]:bg-forest-dark [&_pre]:text-white/90 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_table]:w-full [&_table]:mb-4 [&_table]:border-collapse [&_th]:bg-forest [&_th]:text-white [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_td]:px-4 [&_td]:py-2 [&_td]:border-b [&_td]:border-sand",
  "[&_strong]:font-semibold [&_strong]:text-forest",
].join(" ");

// ─── Header Section ───────────────────────────────────────────────────────────

function ArticleHeader({ article }: { article: Article }) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
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
          className="max-w-3xl mx-auto"
        >
          {/* Back link */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to articles
          </Link>

          {/* Category badge */}
          <span
            className={`inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-6 ${categoryBadgeClasses(
              article.category
            )}`}
          >
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-6">
            {article.title}
          </h1>

          {/* Meta line */}
          <div className="flex items-center gap-5 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishedDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readingTime} min read
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Content Section ──────────────────────────────────────────────────────────

function ArticleContent({ article }: { article: Article }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {article.sections.map((section, i) => (
            <div key={i} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-bold text-forest mb-4">
                {section.heading}
              </h2>
              <div
                className={proseClasses}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Related Articles ─────────────────────────────────────────────────────────

function RelatedArticles({ article }: { article: Article }) {
  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  if (related.length === 0) {
    // Fall back to any other articles
    const fallback = articles
      .filter((a) => a.slug !== article.slug)
      .slice(0, 3);
    if (fallback.length === 0) return null;
    return <RelatedGrid articles={fallback} />;
  }

  return <RelatedGrid articles={related} />;
}

function RelatedGrid({ articles: relatedArticles }: { articles: Article[] }) {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        <h2 className="text-2xl font-bold text-forest text-center mb-12">
          More articles you might like
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="block h-full"
            >
              <GlowCard className="h-full">
                <div className="p-6 flex flex-col h-full">
                  <span
                    className={`inline-block self-start text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4 ${categoryBadgeClasses(
                      a.category
                    )}`}
                  >
                    {a.category}
                  </span>
                  <h3 className="text-lg font-bold text-forest mb-2 leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-sm text-bark leading-relaxed flex-1">
                    {a.excerpt}
                  </p>
                </div>
              </GlowCard>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function ArticleCta() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-forest-dark">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-golden/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to convert?
          </h2>
          <p className="text-lg text-white/50 mb-8">
            Paste your markdown, get a professional Word document in seconds.
          </p>
          <Link
            href="/convert"
            className="inline-flex items-center gap-2 bg-golden text-forest-dark font-semibold px-8 py-3.5 rounded-full hover:bg-golden-light transition-all hover:-translate-y-px shadow-lg shadow-black/15"
          >
            Try DocMD free
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────

export function ArticlePageClient({ article }: { article: Article }) {
  return (
    <>
      <ArticleHeader article={article} />
      <ArticleContent article={article} />
      <RelatedArticles article={article} />
      <ArticleCta />
    </>
  );
}
