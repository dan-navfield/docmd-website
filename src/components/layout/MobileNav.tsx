"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { navLinks, isDropdown, type NavItem } from "@/data/navigation";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setExpandedDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-forest-dark/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-warm-white z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center justify-between mb-14">
                <Logo />
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-warm-gray hover:text-forest transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((item: NavItem, i) =>
                  isDropdown(item) ? (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="flex items-center justify-between w-full text-lg font-medium text-forest py-3.5 px-4 rounded-xl hover:bg-cream transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            expandedDropdown === item.label && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={onClose}
                                  className="block py-2.5 px-4 rounded-lg hover:bg-cream transition-colors"
                                >
                                  <span className="block text-base font-medium text-forest">
                                    {child.label}
                                  </span>
                                  <span className="block text-sm text-warm-gray">
                                    {child.description}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block text-lg font-medium text-forest py-3.5 px-4 rounded-xl hover:bg-cream transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <a
                  href="https://app.mddoc.app/login"
                  onClick={onClose}
                  className="text-center text-sm font-medium text-forest py-3.5 px-4 rounded-xl border border-sand-dark hover:bg-cream transition-colors"
                >
                  Log in
                </a>
                <a
                  href="https://app.mddoc.app/signup"
                  onClick={onClose}
                  className="text-center text-sm font-semibold bg-golden text-forest-dark py-3.5 px-4 rounded-xl hover:bg-golden-dark transition-colors"
                >
                  Get started free
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
