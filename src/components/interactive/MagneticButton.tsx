"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as: Component = "button",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="inline-block"
    >
      {Component === "a" ? (
        <a href={href} onClick={onClick} className={cn(className)}>
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={cn(className)}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
