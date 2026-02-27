"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(76, 87, 62, 0.15)",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-2xl border border-border bg-white overflow-hidden",
        className
      )}
    >
      {/* Glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
