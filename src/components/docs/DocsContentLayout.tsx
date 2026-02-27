"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DocsSidebar } from "./DocsSidebar";
import { docsNavFlat } from "@/data/docs-nav";

interface DocsContentLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function DocsContentLayout({
  children,
  title,
  description,
}: DocsContentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const currentIndex = docsNavFlat.findIndex((item) => item.href === pathname);
  const prev = currentIndex > 0 ? docsNavFlat[currentIndex - 1] : null;
  const next =
    currentIndex < docsNavFlat.length - 1
      ? docsNavFlat[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Compact header */}
      <div className="bg-gradient-to-r from-forest-dark to-forest border-b border-forest-light/30 pt-24 pb-8">
        <Container>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/70 transition-colors mb-3"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Docs
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {title}
          </h1>
          <p className="text-white/60 mt-1.5 text-sm md:text-base">
            {description}
          </p>
        </Container>
      </div>

      <Container className="py-10">
        <div className="flex gap-10">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <DocsSidebar />
            </div>
          </aside>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-forest text-white p-3 rounded-full shadow-lg hover:bg-forest-dark transition-colors"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            >
              <aside
                className="w-72 bg-white h-full p-6 pt-28 overflow-y-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <DocsSidebar onNavigate={() => setSidebarOpen(false)} />
              </aside>
            </div>
          )}

          {/* Content */}
          <main className="min-w-0 flex-1 max-w-3xl">
            {children}

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-sand">
              {prev ? (
                <Link
                  href={prev.href}
                  className="group flex items-center gap-2 text-sm text-bark-light hover:text-forest transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  {prev.title}
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={next.href}
                  className="group flex items-center gap-2 text-sm text-bark-light hover:text-forest transition-colors"
                >
                  {next.title}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
}
