"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight, Sparkles } from "lucide-react";

export function CodeToDocAnimation() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 md:gap-8 items-center">
        {/* Markdown side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-forest-dark/80 backdrop-blur-sm rounded-xl border border-white/10 p-5 font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="text-white/30 text-xs ml-2">report.md</span>
          </div>
          <div className="space-y-1.5 text-white/70">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-orange"># </span>
              <span className="text-white font-semibold">Status Report</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/40"
            >
              &nbsp;
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-teal">## </span>
              <span className="text-white/90">Key Metrics</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <span className="text-golden">- </span>
              Deployments: <span className="text-orange font-semibold">**142**</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <span className="text-golden">- </span>
              Uptime: <span className="text-orange font-semibold">**99.97%**</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-golden">- </span>
              Team: <span className="text-orange font-semibold">**12 engineers**</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Arrow / Sparkles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col items-center gap-2 py-4 md:py-0"
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-golden" />
          </motion.div>
          <ArrowRight className="w-6 h-6 text-orange hidden md:block" />
          <motion.div
            className="md:hidden"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-6 h-6 text-orange rotate-90" />
          </motion.div>
          <motion.div
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-orange" />
          </motion.div>
        </motion.div>

        {/* Word doc side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="bg-white rounded-xl border border-border shadow-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-muted-foreground">status-report.docx</span>
          </div>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
            >
              <h3 className="text-lg font-bold text-forest tracking-tight">
                Status Report
              </h3>
              <div className="w-full h-0.5 bg-orange mt-1" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <h4 className="text-sm font-semibold text-teal mt-3">
                Key Metrics
              </h4>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                Deployments: <strong>142</strong>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                Uptime: <strong>99.97%</strong>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                Team: <strong>12 engineers</strong>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
