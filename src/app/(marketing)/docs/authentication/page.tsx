import type { Metadata } from "next";
import Link from "next/link";
import { DocsContentLayout } from "@/components/docs/DocsContentLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "Authentication — DocMD Documentation",
  description:
    "How to authenticate with the DocMD API using API keys, bearer tokens, and understand tier-based access controls.",
  alternates: { canonical: "/docs/authentication" },
};

export default function AuthenticationPage() {
  return (
    <DocsContentLayout
      title="Authentication"
      description="API keys, bearer tokens, and access tiers."
    >
      {/* Overview */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
        <p className="text-bark-light leading-relaxed mb-4">
          DocMD uses API keys for programmatic access. Every request to the
          public API must include a valid key in the{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            Authorization
          </span>{" "}
          header.
        </p>
        <p className="text-bark-light leading-relaxed mb-4">
          No OAuth flows, no token refresh, no complexity. One key, one header.
        </p>
      </section>

      {/* Generating keys */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Generating API keys
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          From the DocMD dashboard:
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-bark-light">
          <li>
            Go to{" "}
            <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
              Settings → API Keys
            </span>
          </li>
          <li>
            Click{" "}
            <span className="font-medium text-foreground">
              Generate New Key
            </span>
          </li>
          <li>Give it a descriptive name (e.g. &quot;CI Pipeline&quot;, &quot;Claude MCP&quot;)</li>
          <li>Copy the key immediately — it&apos;s only shown once</li>
        </ol>
        <CodeBlock
          language="json"
          title="POST /api/settings/api-keys"
          code={`// Request
{ "name": "CI Pipeline" }

// Response
{
  "id": "key_abc123",
  "name": "CI Pipeline",
  "key": "docmd_clmvMFXmPUJ6xK9TqR8nW...",
  "key_prefix": "docmd_clmv",
  "created_at": "2026-02-25T10:00:00Z"
}`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          Keys always start with{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            docmd_
          </span>
          . The full key is only returned at creation time. After that, only the
          prefix is visible in your dashboard.
        </p>
      </section>

      {/* Using keys */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Using your API key
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Include the key as a Bearer token in the{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            Authorization
          </span>{" "}
          header of every request:
        </p>
        <CodeBlock
          language="bash"
          code={`curl https://api.docmd.io/api/v1/templates \\
  -H "Authorization: Bearer docmd_YOUR_KEY"`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          That&apos;s it. No additional headers, no session management.
        </p>
      </section>

      {/* Access tiers */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Access by plan
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Not every plan gets API access. Here&apos;s what each tier includes:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Feature
                </th>
                <th className="text-center py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Solo
                </th>
                <th className="text-center py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Team
                </th>
                <th className="text-center py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light">
              <tr className="border-b border-sand">
                <td className="py-3 px-4">
                  Public API{" "}
                  <span className="font-mono text-xs text-warm-gray">
                    /api/v1/*
                  </span>
                </td>
                <td className="py-3 px-4 text-center">—</td>
                <td className="py-3 px-4 text-center text-forest font-medium">
                  Yes
                </td>
                <td className="py-3 px-4 text-center text-forest font-medium">
                  Yes
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4">MCP server access</td>
                <td className="py-3 px-4 text-center text-forest font-medium">
                  Yes
                </td>
                <td className="py-3 px-4 text-center text-forest font-medium">
                  Yes
                </td>
                <td className="py-3 px-4 text-center text-forest font-medium">
                  Yes
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4">Conversions per month</td>
                <td className="py-3 px-4 text-center">20</td>
                <td className="py-3 px-4 text-center">Unlimited</td>
                <td className="py-3 px-4 text-center">Unlimited</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4">Templates</td>
                <td className="py-3 px-4 text-center">5</td>
                <td className="py-3 px-4 text-center">Unlimited</td>
                <td className="py-3 px-4 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4">SharePoint export</td>
                <td className="py-3 px-4 text-center">—</td>
                <td className="py-3 px-4 text-center text-forest font-medium">
                  Yes
                </td>
                <td className="py-3 px-4 text-center text-forest font-medium">
                  Yes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-golden/10 border-l-4 border-golden rounded-r-lg p-4 mb-6">
          <p className="text-sm text-bark">
            <span className="font-semibold">MCP is available on all plans.</span>{" "}
            Even Solo users can connect DocMD to Claude Desktop or Claude Code
            via the MCP server. The public REST API requires Team or higher.
          </p>
        </div>
      </section>

      {/* Revoking keys */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Revoking keys
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          If a key is compromised, revoke it immediately from{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            Settings → API Keys
          </span>
          . Revoked keys return a{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            401
          </span>{" "}
          on every subsequent request. Generate a new key and update your
          integration.
        </p>
        <p className="text-bark-light leading-relaxed mb-4">
          You can have multiple active keys. Use separate keys for different
          environments (dev, staging, production) so you can revoke one without
          disrupting the others.
        </p>
      </section>

      {/* Error responses */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Authentication errors
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          When authentication fails, the API returns a structured error:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Code
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light font-mono text-xs">
              <tr className="border-b border-sand">
                <td className="py-3 px-4">401</td>
                <td className="py-3 px-4">missing_api_key</td>
                <td className="py-3 px-4 font-sans text-sm">
                  No Authorization header sent
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4">401</td>
                <td className="py-3 px-4">invalid_api_key</td>
                <td className="py-3 px-4 font-sans text-sm">
                  Key is invalid, revoked, or not a{" "}
                  <span className="font-mono">docmd_</span> key
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">403</td>
                <td className="py-3 px-4">api_access_denied</td>
                <td className="py-3 px-4 font-sans text-sm">
                  Your plan doesn&apos;t include API access (Solo plan)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          language="json"
          title="Example error response"
          code={`{
  "error": {
    "code": "invalid_api_key",
    "message": "The API key provided is invalid or has been revoked."
  }
}`}
        />
      </section>

      {/* Security */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Security notes
        </h2>
        <ul className="space-y-2 text-bark-light list-disc list-inside">
          <li>Keys are SHA-256 hashed before storage. We never store the raw key.</li>
          <li>All API traffic must use HTTPS.</li>
          <li>
            Never commit keys to version control. Use environment variables or a
            secrets manager.
          </li>
          <li>
            Each key records a{" "}
            <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
              last_used_at
            </span>{" "}
            timestamp — check for unauthorized usage in your dashboard.
          </li>
        </ul>
      </section>

      {/* Next */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Next</h2>
        <p className="text-bark-light leading-relaxed">
          Now that you&apos;re authenticated, explore the{" "}
          <Link
            href="/docs/api-reference"
            className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
          >
            full API reference
          </Link>{" "}
          to see every endpoint, parameter, and response format.
        </p>
      </section>
    </DocsContentLayout>
  );
}
