"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function TermsPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-golden/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Scale className="w-10 h-10 text-golden mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Terms of Service
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
              Use DocMD for its intended purpose. Don&apos;t abuse it. Your
              content is yours. Our service is ours. Be reasonable and
              we&apos;ll be reasonable.
            </p>

            <h2>What DocMD does</h2>
            <p>
              DocMD is a web-based platform that converts markdown text into
              Microsoft Word (.docx) documents using your templates. We also
              offer AI-powered document classification, template management, and
              integration features. These terms govern your use of docmd.io and
              all related services.
            </p>

            <h2>Accounts</h2>
            <p>
              Some features require an account. You&apos;re responsible for
              keeping your login credentials secure. If you suspect unauthorized
              access, let us know immediately at{" "}
              <a href="mailto:hello@docmd.io">hello@docmd.io</a>.
            </p>
            <p>
              You must be at least 16 years old to create an account. If
              you&apos;re using DocMD on behalf of a company, you confirm you
              have authority to bind that company to these terms.
            </p>

            <h2>Free tier</h2>
            <p>
              We offer free conversions without an account. These are limited per
              device and may change. Free conversions are provided as-is with no
              guaranteed uptime or support.
            </p>

            <h2>Paid plans</h2>
            <p>
              Paid plans are billed monthly or annually, depending on your
              choice. Prices are in USD. We use Stripe for payment processing.
            </p>
            <ul>
              <li>Plans renew automatically unless you cancel</li>
              <li>You can cancel anytime from your account settings</li>
              <li>Cancellation takes effect at the end of your billing period</li>
              <li>We don&apos;t offer refunds for partial months or years</li>
              <li>We may change pricing with 30 days&apos; notice</li>
            </ul>

            <h2>Your content</h2>
            <p>
              You own your markdown, templates, and converted documents. By using
              DocMD, you grant us the limited right to process your content
              solely to provide the service. We don&apos;t claim any ownership
              over your content and we don&apos;t use it to train AI models.
            </p>

            <h2>Acceptable use</h2>
            <p>Don&apos;t use DocMD to:</p>
            <ul>
              <li>Convert content that violates any law</li>
              <li>Attempt to reverse-engineer or exploit the service</li>
              <li>Abuse rate limits or circumvent usage restrictions</li>
              <li>Resell the service without our written permission</li>
              <li>
                Interfere with other users or the infrastructure
              </li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>

            <h2>API usage</h2>
            <p>
              The DocMD API is subject to rate limits documented in our API
              reference. API keys are tied to your account and must not be
              shared publicly. We may revoke keys that are abused.
            </p>

            <h2>AI features</h2>
            <p>
              AI classification and related features use third-party AI
              providers (Anthropic, OpenAI) through your own API keys. You&apos;re
              responsible for complying with those providers&apos; terms of
              service. AI outputs are suggestions &mdash; verify them before
              relying on them.
            </p>

            <h2>Uptime and availability</h2>
            <p>
              We aim for high availability but don&apos;t guarantee 100% uptime.
              We&apos;ll do our best to notify you of planned maintenance. Check{" "}
              <a href="/status">our status page</a> for current system health.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              DocMD is provided &ldquo;as is.&rdquo; We do our best to keep
              things running smoothly, but we&apos;re not liable for indirect,
              incidental, or consequential damages arising from your use of the
              service. Our total liability is limited to the amount you&apos;ve
              paid us in the 12 months before the claim.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              We may update these terms. For significant changes, we&apos;ll
              email you at least 30 days in advance. Continued use after changes
              take effect means you accept the new terms.
            </p>

            <h2>Termination</h2>
            <p>
              You can close your account at any time. We can terminate your
              account if you violate these terms, with notice when possible. On
              termination, your right to use the service ends. We&apos;ll retain
              your data for 30 days in case you change your mind, then delete
              it.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the United States. Any
              disputes will be resolved through binding arbitration, not
              litigation.
            </p>

            <h2>Contact</h2>
            <p>
              Questions? Email{" "}
              <a href="mailto:hello@docmd.io">hello@docmd.io</a>. We read every
              message.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
