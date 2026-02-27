"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-sand shadow-sm"
            : "bg-transparent"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            <Logo variant={scrolled ? "dark" : "light"} />

            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    scrolled
                      ? "text-bark-light hover:text-forest"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className={cn(
                  "text-sm font-medium transition-colors px-4 py-2",
                  scrolled
                    ? "text-bark-light hover:text-forest"
                    : "text-white/80 hover:text-white"
                )}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className={cn(
                  "text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:-translate-y-px",
                  scrolled
                    ? "bg-golden text-forest-dark hover:bg-golden-dark shadow-sm"
                    : "bg-golden text-forest-dark hover:bg-golden-light shadow-lg shadow-black/15"
                )}
              >
                Get started
              </Link>
            </div>

            <button
              className={cn(
                "md:hidden p-2 -mr-2",
                scrolled ? "text-forest" : "text-white"
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </Container>
      </motion.header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
