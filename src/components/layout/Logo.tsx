import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <div
        className={cn(
          "relative w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105",
          variant === "dark" ? "bg-forest" : "bg-white/10"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5"
          stroke={variant === "dark" ? "#FAFD99" : "#FAFD99"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6" />
          <path d="M9 17h3" />
        </svg>
      </div>
      <span
        className={cn(
          "text-xl font-bold tracking-tight font-display",
          variant === "dark" ? "text-forest" : "text-white"
        )}
      >
        Doc<span className={variant === "dark" ? "text-golden-dark" : "text-golden"}>MD</span>
      </span>
    </Link>
  );
}
