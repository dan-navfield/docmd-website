"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn(
        "mb-12 md:mb-16",
        centered && "text-center",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4",
            light
              ? "bg-white/10 text-white/80"
              : "bg-forest/10 text-forest"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl max-w-2xl leading-relaxed",
            centered && "mx-auto",
            light ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
