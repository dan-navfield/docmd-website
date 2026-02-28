"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, isDropdown, type NavItem, type NavDropdown } from "@/data/navigation";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

function DesktopDropdown({
  item,
  scrolled,
}: {
  item: NavDropdown;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors duration-200",
          scrolled
            ? "text-bark-light hover:text-forest"
            : "text-white/80 hover:text-white"
        )}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
          >
            <div className="w-56 bg-white rounded-xl border border-sand shadow-lg overflow-hidden">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 hover:bg-cream transition-colors"
                >
                  <span className="block text-sm font-medium text-forest">
                    {child.label}
                  </span>
                  <span className="block text-xs text-warm-gray mt-0.5">
                    {child.description}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
            : "bg-transparent border-b border-transparent"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            <Logo variant={scrolled ? "dark" : "light"} />

            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((item: NavItem) =>
                isDropdown(item) ? (
                  <DesktopDropdown
                    key={item.label}
                    item={item}
                    scrolled={scrolled}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      scrolled
                        ? "text-bark-light hover:text-forest"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://app.mddoc.app/login"
                className={cn(
                  "text-sm font-medium transition-colors px-4 py-2",
                  scrolled
                    ? "text-bark-light hover:text-forest"
                    : "text-white/80 hover:text-white"
                )}
              >
                Log in
              </a>
              <a
                href="https://app.mddoc.app/signup"
                className={cn(
                  "text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:-translate-y-px",
                  scrolled
                    ? "bg-golden text-forest-dark hover:bg-golden-dark shadow-sm"
                    : "bg-golden text-forest-dark hover:bg-golden-light shadow-lg shadow-black/15"
                )}
              >
                Get started
              </a>
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
