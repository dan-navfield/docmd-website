"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-dark via-forest to-forest-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-orange/10 flex items-center justify-center mx-auto mb-8">
          <FileQuestion className="w-10 h-10 text-orange" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white/60 mb-8">
          This page doesn&apos;t exist. Maybe it was converted to a Word doc.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
