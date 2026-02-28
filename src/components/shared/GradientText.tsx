import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "orange" | "teal" | "golden";
}

const gradients = {
  orange: "from-orange via-orange-light to-golden",
  teal: "from-teal via-teal-light to-golden",
  golden: "from-golden via-golden-light to-orange-light",
};

export function GradientText({
  children,
  className,
  variant = "orange",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
