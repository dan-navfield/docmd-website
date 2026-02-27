"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypewriterText({
  phrases,
  className,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = phrases[phraseIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      if (text.length < currentPhrase.length) {
        setText(currentPhrase.slice(0, text.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      if (text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [text, isDeleting, currentPhrase, phrases.length, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className={className}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-current ml-0.5 align-baseline"
      />
    </span>
  );
}
