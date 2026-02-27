"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { Logo } from "./Logo";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
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
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block text-lg font-medium text-forest py-3.5 px-4 rounded-xl hover:bg-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="text-center text-sm font-medium text-forest py-3.5 px-4 rounded-xl border border-sand-dark hover:bg-cream transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={onClose}
                  className="text-center text-sm font-semibold bg-golden text-forest-dark py-3.5 px-4 rounded-xl hover:bg-golden-dark transition-colors"
                >
                  Get started free
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
