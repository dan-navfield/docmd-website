"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-forest-dark my-6 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <span className="text-xs text-white/40 font-mono">
          {title || language || "code"}
        </span>
        <button
          onClick={copy}
          className="text-white/30 hover:text-white/60 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-white/80 leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
