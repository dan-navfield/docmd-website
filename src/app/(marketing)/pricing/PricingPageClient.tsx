"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GradientText } from "@/components/shared/GradientText";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/interactive/GlowCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { tiers, faqs } from "@/data/pricing";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// ─── Hero ────────────────────────────────────────────────────────────────────

function PricingHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
      {/* Background orbs */}
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
            Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Simple pricing.{" "}
            <GradientText variant="golden">No surprises.</GradientText>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Try it free on the Convert page. Plans start at $10/month.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Billing Toggle ──────────────────────────────────────────────────────────

function BillingToggle({
  isAnnual,
  onToggle,
}: {
  isAnnual: boolean;
  onToggle: () => void;
}) {
  return (
    <ScrollReveal className="flex items-center justify-center gap-4 mb-12 md:mb-16">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          !isAnnual ? "text-foreground" : "text-muted-foreground"
        )}
      >
        Monthly
      </span>
      <button
        onClick={onToggle}
        className={cn(
          "relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/50",
          isAnnual ? "bg-forest" : "bg-gray-300"
        )}
        aria-label="Toggle annual billing"
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
          animate={{ x: isAnnual ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          isAnnual ? "text-foreground" : "text-muted-foreground"
        )}
      >
        Annual
        <span className="ml-1.5 inline-block text-xs font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded-full">
          Save 17%
        </span>
      </span>
    </ScrollReveal>
  );
}

// ─── Pricing Cards ───────────────────────────────────────────────────────────

function PricingCards({ isAnnual }: { isAnnual: boolean }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-5xl mx-auto"
    >
      {tiers.map((tier, index) => {
        const isHighlighted = tier.highlighted;
        const price = isAnnual ? tier.price.annual : tier.price.monthly;
        const tierSlug = tier.name.toLowerCase();

        return (
          <motion.div
            key={tier.name}
            variants={fadeInUp}
            className={cn(isHighlighted && "md:-mt-4 md:mb-[-16px]")}
          >
            <GlowCard
              className={cn(
                "p-8 h-full flex flex-col",
                isHighlighted
                  ? "border-2 border-golden-dark shadow-xl shadow-golden-dark/10 scale-100 md:scale-[1.03]"
                  : "border border-border"
              )}
              glowColor={
                isHighlighted
                  ? "rgba(76, 87, 62, 0.2)"
                  : "rgba(7, 119, 113, 0.1)"
              }
            >
              {/* Most Popular badge */}
              {isHighlighted && (
                <div className="text-center -mt-4 mb-4">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-forest-dark bg-golden px-4 py-1 rounded-full shadow-md shadow-golden-dark/20">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                {price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground tracking-tight">
                      ${price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      /mo{isAnnual && ", billed yearly"}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground tracking-tight">
                      Contact us
                    </span>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="mb-8">
                {isHighlighted ? (
                  <MagneticButton
                    as="a"
                    href={`/signup?tier=${tierSlug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-golden text-forest-dark font-semibold px-6 py-3.5 rounded-xl hover:bg-golden-dark transition-all shadow-md shadow-golden-dark/20"
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                ) : (
                  <Link
                    href={`/signup?tier=${tierSlug}`}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-all",
                      tierSlug === "enterprise"
                        ? "bg-golden text-forest-dark hover:bg-golden-dark"
                        : "border border-border text-foreground hover:bg-muted"
                    )}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>

              {/* Feature list */}
              <div className="space-y-3 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  What&apos;s included
                </p>
                {tier.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="flex items-start gap-3"
                  >
                    {feature.included ? (
                      <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      )}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

function FaqSection() {
  return (
    <section className="py-20 md:py-28 bg-golden">
      <Container size="narrow">
        <SectionHeading
          badge="FAQ"
          title="Questions? Answered."
          subtitle="If we missed something, just email us. We reply fast."
        />

        <ScrollReveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
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

// ─── CTA Banner ──────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-teal" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,253,153,0.08),transparent_70%)]" />

      <Container className="relative z-10 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Start converting today.
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            Try it free on the Convert page. When you&apos;re ready, Solo starts
            at just $10/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              as="a"
              href="/signup?tier=solo"
              className="inline-flex items-center justify-center gap-2 bg-golden text-forest-dark font-bold px-8 py-4 rounded-xl text-lg hover:bg-golden-light transition-all shadow-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <Link
              href="/convert"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all"
            >
              Try It Free
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function PricingPageClient() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      <PricingHero />
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <BillingToggle
            isAnnual={isAnnual}
            onToggle={() => setIsAnnual(!isAnnual)}
          />
          <PricingCards isAnnual={isAnnual} />
        </Container>
      </section>
      <FaqSection />
      <CtaBanner />
    </>
  );
}
