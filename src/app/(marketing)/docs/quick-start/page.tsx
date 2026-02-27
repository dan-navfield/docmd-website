import type { Metadata } from "next";
import Link from "next/link";
import { DocsContentLayout } from "@/components/docs/DocsContentLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "Quick Start — DocMD Documentation",
  description:
    "Get your first markdown-to-Word conversion running in under five minutes with the DocMD API.",
  alternates: { canonical: "/docs/quick-start" },
};

export default function QuickStartPage() {
  return (
    <DocsContentLayout
      title="Quick Start"
      description="Your first conversion in under five minutes."
    >
      {/* Prerequisites */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Prerequisites
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          You need two things to use the DocMD API:
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-bark-light">
          <li>
            A DocMD account on the{" "}
            <span className="font-medium text-foreground">Team</span> or{" "}
            <span className="font-medium text-foreground">Enterprise</span>{" "}
            plan (API access is not available on Solo)
          </li>
          <li>
            An API key generated from your{" "}
            <span className="font-medium text-foreground">
              dashboard settings
            </span>
          </li>
        </ol>
        <div className="bg-golden/10 border-l-4 border-golden rounded-r-lg p-4 mb-6">
          <p className="text-sm text-bark">
            <span className="font-semibold">Try it free.</span> Convert up to 3
            documents on the Convert page — no account needed.
          </p>
        </div>
      </section>

      {/* Step 1 */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          1. Get your API key
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Sign in to the DocMD dashboard. Go to{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            Settings → API Keys
          </span>{" "}
          and click <span className="font-medium text-foreground">Generate New Key</span>.
        </p>
        <p className="text-bark-light leading-relaxed mb-4">
          Give it a name you&apos;ll recognize. The key is shown once — copy it
          now. It looks like this:
        </p>
        <CodeBlock
          code="docmd_clmvMFXmPUJ6xK9Tq..."
          language="text"
          title="Your API key"
        />
        <p className="text-bark-light leading-relaxed mb-4">
          Keys always start with{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            docmd_
          </span>
          . Keep it secret. If it leaks, revoke it from the same settings page
          and generate a new one.
        </p>
      </section>

      {/* Step 2 */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          2. Find a template and mapping
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Every conversion needs a Word template (the .docx file with your
          styles) and a mapping (rules that connect markdown elements to those
          styles). List your available templates:
        </p>
        <CodeBlock
          language="bash"
          title="List templates"
          code={`curl https://api.docmd.io/api/v1/templates \\
  -H "Authorization: Bearer docmd_YOUR_KEY"`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          Pick a template ID from the response, then list its mappings:
        </p>
        <CodeBlock
          language="bash"
          title="List mappings for a template"
          code={`curl "https://api.docmd.io/api/v1/mappings?template_id=TEMPLATE_ID" \\
  -H "Authorization: Bearer docmd_YOUR_KEY"`}
        />
      </section>

      {/* Step 3 */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          3. Convert markdown to Word
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Now you have everything. Send your markdown with the template and
          mapping IDs:
        </p>
        <CodeBlock
          language="bash"
          title="Convert markdown"
          code={`curl -X POST https://api.docmd.io/api/v1/convert \\
  -H "Authorization: Bearer docmd_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "markdown": "# Project Brief\\n\\nThis is the overview.\\n\\n## Goals\\n\\n- Ship faster\\n- Reduce manual formatting",
    "template_id": "your-template-uuid",
    "mapping_id": "your-mapping-uuid",
    "filename": "project-brief",
    "response_format": "json"
  }'`}
        />
        <p className="text-bark-light leading-relaxed mb-4">Response:</p>
        <CodeBlock
          language="json"
          title="Response"
          code={`{
  "conversion_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "completed",
  "filename": "project-brief.docx",
  "download_url": "/api/v1/conversions/a1b2c3d4-.../download",
  "warnings": [],
  "stats": {
    "headings": 2,
    "paragraphs": 1,
    "lists": 1,
    "tables": 0,
    "code_blocks": 0,
    "images": 0
  },
  "created_at": "2026-02-25T10:30:00Z"
}`}
        />
      </section>

      {/* Step 4 */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          4. Download the file
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Use the <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">download_url</span> from the response:
        </p>
        <CodeBlock
          language="bash"
          title="Download"
          code={`curl https://api.docmd.io/api/v1/conversions/CONVERSION_ID/download \\
  -H "Authorization: Bearer docmd_YOUR_KEY" \\
  -o project-brief.docx`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          That&apos;s it. You now have a professionally styled Word document.
        </p>
        <div className="bg-golden/10 border-l-4 border-golden rounded-r-lg p-4 mb-6">
          <p className="text-sm text-bark">
            <span className="font-semibold">Shortcut:</span> Set{" "}
            <span className="font-mono bg-sand px-1 py-0.5 rounded text-xs">
              response_format
            </span>{" "}
            to{" "}
            <span className="font-mono bg-sand px-1 py-0.5 rounded text-xs">
              &quot;binary&quot;
            </span>{" "}
            (the default) and the convert endpoint returns the .docx bytes
            directly — no separate download step needed.
          </p>
        </div>
      </section>

      {/* Language examples */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Language examples
        </h2>

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          JavaScript / Node.js
        </h3>
        <CodeBlock
          language="javascript"
          code={`const response = await fetch("https://api.docmd.io/api/v1/convert", {
  method: "POST",
  headers: {
    "Authorization": "Bearer docmd_YOUR_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    markdown: "# Hello World\\n\\nConverted via the API.",
    template_id: "your-template-uuid",
    mapping_id: "your-mapping-uuid",
  }),
});

// Default response is binary — save directly
const buffer = await response.arrayBuffer();
fs.writeFileSync("output.docx", Buffer.from(buffer));`}
        />

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          Python
        </h3>
        <CodeBlock
          language="python"
          code={`import requests

response = requests.post(
    "https://api.docmd.io/api/v1/convert",
    headers={"Authorization": "Bearer docmd_YOUR_KEY"},
    json={
        "markdown": "# Hello World\\n\\nConverted via the API.",
        "template_id": "your-template-uuid",
        "mapping_id": "your-mapping-uuid",
    },
)

with open("output.docx", "wb") as f:
    f.write(response.content)`}
        />
      </section>

      {/* Next steps */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Next steps</h2>
        <ul className="space-y-2 text-bark-light">
          <li>
            <Link
              href="/docs/authentication"
              className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
            >
              Authentication
            </Link>{" "}
            — how API keys work, scopes, and tier access
          </li>
          <li>
            <Link
              href="/docs/api-reference"
              className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
            >
              API Reference
            </Link>{" "}
            — every endpoint, request format, and error code
          </li>
          <li>
            <Link
              href="/docs/templates"
              className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
            >
              Templates & Mappings
            </Link>{" "}
            — how to create and manage style mappings
          </li>
        </ul>
      </section>
    </DocsContentLayout>
  );
}
