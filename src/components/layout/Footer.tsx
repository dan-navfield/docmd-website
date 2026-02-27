"use client";

import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { footerLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <Container>
        <div className="py-20 md:py-24">
          {/* Top */}
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
            <div className="max-w-sm">
              <Logo variant="light" className="mb-5" />
              <p className="text-white/50 text-base leading-relaxed">
                Markdown in. Word out. Perfectly styled. Stop copy-pasting
                into Word and start shipping documents.
              </p>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
              <div>
                <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
                  Product
                </h4>
                <ul className="space-y-3.5">
                  {footerLinks.product.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
                  Company
                </h4>
                <ul className="space-y-3.5">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
                  Resources
                </h4>
                <ul className="space-y-3.5">
                  {footerLinks.resources.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
                  Legal
                </h4>
                <ul className="space-y-3.5">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/30">
              &copy; {new Date().getFullYear()} DocMD. All rights reserved.
            </p>
            <p className="text-sm text-white/30">
              Made for people who write in markdown and ship in Word.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
