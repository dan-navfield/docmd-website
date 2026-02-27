"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function PrivacyPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-golden/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Shield className="w-10 h-10 text-golden mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/60">
              Last updated: February 22, 2026
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <Container size="narrow">
          <div className="prose prose-lg max-w-none text-bark prose-headings:text-forest prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-teal prose-a:no-underline hover:prose-a:underline">
            <h2>The short version</h2>
            <p>
              We collect the minimum data needed to run DocMD. We don&apos;t sell
              your data. We don&apos;t read your documents. Your markdown and
              converted files are yours.
            </p>

            <h2>What we collect</h2>
            <h3>Account information</h3>
            <p>
              When you create an account, we collect your email address and name.
              If you sign up via Google or GitHub OAuth, we receive the profile
              information you authorize.
            </p>

            <h3>Documents</h3>
            <p>
              When you convert a document, your markdown is processed on our
              servers to generate the Word file. Free conversions (without an
              account) are processed and immediately discarded &mdash; we
              don&apos;t store them. For logged-in users, converted documents are
              stored in your account until you delete them.
            </p>

            <h3>Usage data</h3>
            <p>
              We collect basic analytics: pages visited, features used,
              conversion counts. This helps us understand what&apos;s working and
              what needs fixing. We use privacy-respecting analytics and don&apos;t
              track you across other websites.
            </p>

            <h3>Payment information</h3>
            <p>
              Payments are processed by Stripe. We never see or store your full
              credit card number. Stripe handles PCI compliance.
            </p>

            <h2>How we use your data</h2>
            <ul>
              <li>To provide the DocMD service &mdash; converting your documents</li>
              <li>To send you important account and service updates</li>
              <li>To improve the product based on aggregate usage patterns</li>
              <li>To respond to support requests</li>
            </ul>
            <p>
              We don&apos;t use your documents to train AI models. We don&apos;t
              sell or share your personal information with third parties for
              marketing purposes.
            </p>

            <h2>AI processing</h2>
            <p>
              If you enable AI classification, your document content is sent to
              your chosen AI provider (Anthropic or OpenAI) using your own API
              keys. We act as a pass-through &mdash; the AI provider&apos;s
              privacy policy governs how they handle that data. We don&apos;t
              store AI classification results beyond what&apos;s needed to
              complete the conversion.
            </p>

            <h2>Third-party services</h2>
            <p>We use these services to run DocMD:</p>
            <ul>
              <li><strong>Supabase</strong> &mdash; Authentication and database</li>
              <li><strong>Stripe</strong> &mdash; Payment processing</li>
              <li><strong>Vercel</strong> &mdash; Hosting and deployment</li>
            </ul>
            <p>
              Each operates under their own privacy policies. We choose
              providers with strong privacy practices.
            </p>

            <h2>Data retention</h2>
            <p>
              Your account data is retained while your account is active. If you
              delete your account, we remove your personal data within 30 days.
              Converted documents stored in your account are deleted when you
              delete them or when your account is closed.
            </p>

            <h2>Your rights</h2>
            <p>You can:</p>
            <ul>
              <li>Export your data at any time from your account settings</li>
              <li>Delete your documents at any time</li>
              <li>Delete your account entirely</li>
              <li>Request a copy of all data we hold about you</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              We use essential cookies for authentication and session management.
              We use a single analytics cookie that doesn&apos;t track you across
              sites. We don&apos;t use advertising cookies.
            </p>

            <h2>Security</h2>
            <p>
              All data is encrypted in transit (TLS) and at rest. We follow
              security best practices including regular dependency audits,
              principle of least privilege, and infrastructure monitoring. If we
              discover a breach, we&apos;ll notify affected users within 72
              hours.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We&apos;ll post changes here and, for significant changes, email
              you. Your continued use of DocMD after changes constitutes
              acceptance.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about privacy? Email us at{" "}
              <a href="mailto:hello@docmd.io">hello@docmd.io</a>. We respond
              fast.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
