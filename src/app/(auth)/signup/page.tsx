"use client";

import { useState, type FormEvent, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

const tierLabels: Record<string, string> = {
  free: "Free plan selected",
  pro: "Pro plan selected",
  enterprise: "Enterprise plan selected",
};

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-8 animate-pulse h-[600px]" />}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const tier = searchParams.get("tier");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            ...(tier ? { selected_tier: tier } : {}),
          },
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  // Success state
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-teal" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
            Check your email
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            We sent a confirmation link to{" "}
            <span className="font-medium text-foreground">{email}</span>. Click
            the link to activate your account.
          </p>
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <button
                onClick={() => setSuccess(false)}
                className="font-medium text-orange hover:text-orange-dark transition-colors"
              >
                try again
              </button>
              .
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start converting markdown to beautiful documents
          </p>

          {/* Tier badge */}
          {tier && tierLabels[tier] && (
            <Badge className="mt-3 bg-golden/10 text-golden-dark border-golden/20 border gap-1.5">
              <Sparkles className="w-3 h-3" />
              {tierLabels[tier]}
            </Badge>
          )}
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Full name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="h-11"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="h-11"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={8}
              className="h-11"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Confirm password
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={8}
              className={`h-11 ${
                confirmPassword && password !== confirmPassword
                  ? "border-red-300 focus-visible:border-red-400 focus-visible:ring-red-200"
                  : ""
              }`}
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                Passwords do not match
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-orange text-white font-semibold hover:bg-orange-dark transition-colors text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        {/* Terms */}
        <p className="mt-4 text-center text-xs text-muted-foreground leading-relaxed">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="font-medium text-foreground hover:text-orange transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-foreground hover:text-orange transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* Bottom link */}
      <p className="text-center mt-6 text-sm text-white/60">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-white hover:text-golden transition-colors"
        >
          Log in
        </Link>
      </p>
    </motion.div>
  );
}
