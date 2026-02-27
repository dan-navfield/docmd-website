"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsNav } from "@/data/docs-nav";
import { BookOpen } from "lucide-react";

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      <Link
        href="/docs"
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2 text-sm py-1.5 px-3 rounded-lg transition-colors",
          pathname === "/docs"
            ? "bg-golden/20 text-forest-dark font-medium"
            : "text-bark-light hover:text-forest hover:bg-cream"
        )}
      >
        <BookOpen className="w-4 h-4" />
        Overview
      </Link>

      {docsNav.map((section) => (
        <div key={section.title}>
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-warm-gray mb-2 px-3">
            {section.title}
          </h4>
          <ul className="space-y-0.5">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2 text-sm py-1.5 px-3 rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-golden/20 text-forest-dark font-medium"
                      : "text-bark-light hover:text-forest hover:bg-cream"
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
