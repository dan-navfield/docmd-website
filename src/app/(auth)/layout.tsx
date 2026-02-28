import type { Metadata } from "next";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-forest-dark via-forest to-forest-light px-4 py-12">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-golden/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-teal/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-golden/5 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8">
        <Logo variant="light" />
      </div>

      {/* Card container */}
      <div className="relative z-10 w-full max-w-md">{children}</div>

      {/* Footer text */}
      <p className="relative z-10 mt-8 text-xs text-white/30 text-center">
        &copy; {new Date().getFullYear()} MDDoc. All rights reserved.
      </p>
    </div>
  );
}
