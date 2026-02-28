import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <div className="relative w-9 h-9 transition-transform duration-200 group-hover:scale-105">
        <svg viewBox="0 0 512 512" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="512" height="512" rx="96" ry="96" fill="#FAFD99"/>
          <g transform="translate(140, 140)">
            <path d="M40,0 H185 L232,47 V310 Q232,320 222,320 H40 Q30,320 30,310 V10 Q30,0 40,0 Z" fill="#FDFCF5" stroke="#4C573E" strokeWidth="10"/>
            <path d="M185,0 V37 Q185,47 195,47 H232" fill="#EDEBE0" stroke="#4C573E" strokeWidth="10" strokeLinejoin="round"/>
            <line x1="70" y1="90" x2="192" y2="90" stroke="#DDDACC" strokeWidth="10" strokeLinecap="round"/>
            <line x1="70" y1="130" x2="192" y2="130" stroke="#DDDACC" strokeWidth="10" strokeLinecap="round"/>
            <line x1="70" y1="170" x2="160" y2="170" stroke="#DDDACC" strokeWidth="10" strokeLinecap="round"/>
            <line x1="70" y1="210" x2="192" y2="210" stroke="#DDDACC" strokeWidth="10" strokeLinecap="round"/>
            <line x1="70" y1="250" x2="140" y2="250" stroke="#DDDACC" strokeWidth="10" strokeLinecap="round"/>
          </g>
          <g transform="translate(108, 52)">
            <line x1="148" y1="0" x2="148" y2="40" stroke="#4C573E" strokeWidth="10" strokeLinecap="round"/>
            <circle cx="148" cy="0" r="14" fill="#6B7F5A"/>
            <rect x="48" y="40" width="200" height="160" rx="32" ry="32" fill="#4C573E"/>
            <rect x="72" y="70" width="152" height="80" rx="16" ry="16" fill="#5E6B4E"/>
            <circle cx="118" cy="110" r="22" fill="#FAFD99"/>
            <circle cx="178" cy="110" r="22" fill="#FAFD99"/>
            <circle cx="122" cy="108" r="10" fill="#3B432F"/>
            <circle cx="182" cy="108" r="10" fill="#3B432F"/>
            <circle cx="115" cy="103" r="5" fill="#FDFCF5" opacity="0.8"/>
            <circle cx="175" cy="103" r="5" fill="#FDFCF5" opacity="0.8"/>
            <rect x="112" y="164" width="72" height="20" rx="6" ry="6" fill="#5E6B4E"/>
            <line x1="130" y1="164" x2="130" y2="184" stroke="#4C573E" strokeWidth="3"/>
            <line x1="148" y1="164" x2="148" y2="184" stroke="#4C573E" strokeWidth="3"/>
            <line x1="166" y1="164" x2="166" y2="184" stroke="#4C573E" strokeWidth="3"/>
            <circle cx="48" cy="120" r="16" fill="#6B7F5A"/>
            <circle cx="248" cy="120" r="16" fill="#6B7F5A"/>
            <circle cx="48" cy="120" r="6" fill="#3B432F"/>
            <circle cx="248" cy="120" r="6" fill="#3B432F"/>
          </g>
        </svg>
      </div>
      <span
        className={cn(
          "text-xl font-bold tracking-tight font-display",
          variant === "dark" ? "text-forest" : "text-white"
        )}
      >
        MD<span className={variant === "dark" ? "text-golden-dark" : "text-golden"}>Doc</span>
      </span>
    </Link>
  );
}
