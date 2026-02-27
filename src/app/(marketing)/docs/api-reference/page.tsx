import type { Metadata } from "next";
import Link from "next/link";
import { DocsContentLayout } from "@/components/docs/DocsContentLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "API Reference — DocMD Documentation",
  description:
    "Complete API reference for DocMD. Endpoints for markdown-to-Word conversion, template listing, mapping management, and conversion downloads.",
  alternates: { canonical: "/docs/api-reference" },
};

function MethodBadge({ method }: { method: "GET" | "POST" }) {
  const colors =
    method === "POST"
      ? "bg-forest/15 text-forest-dark"
      : "bg-teal/15 text-teal-dark";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase font-mono ${colors}`}
    >
      {method}
    </span>
  );
}

export default function ApiReferencePage() {
  return (
    <DocsContentLayout
      title="Conversion API"
      description="Every endpoint, every parameter, every error code."
    >
      {/* Base URL */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Base URL</h2>
        <CodeBlock code="https://api.docmd.io" language="text" />
        <p className="text-bark-light leading-relaxed mb-4">
          All endpoints are prefixed with{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            /api/v1
          </span>
          . Every request requires a{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            Bearer
          </span>{" "}
          token in the Authorization header. See{" "}
          <Link
            href="/docs/authentication"
            className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
          >
            Authentication
          </Link>
          .
        </p>
      </section>

      {/* Request / Response format */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Request &amp; response format
        </h2>
        <ul className="space-y-2 text-bark-light list-disc list-inside mb-6">
          <li>
            Request bodies are JSON with{" "}
            <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
              Content-Type: application/json
            </span>
          </li>
          <li>
            Successful responses return JSON or binary data depending on the
            endpoint
          </li>
          <li>
            Errors always return a JSON envelope with an{" "}
            <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
              error
            </span>{" "}
            object
          </li>
        </ul>
        <CodeBlock
          language="json"
          title="Error envelope"
          code={`{
  "error": {
    "code": "validation_error",
    "message": "Field 'markdown' is required."
  }
}`}
        />
      </section>

      {/* ─── POST /api/v1/convert ─── */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="POST" />
          <h2 className="text-xl font-bold text-foreground font-mono">
            /api/v1/convert
          </h2>
        </div>
        <p className="text-bark-light leading-relaxed mb-4">
          Convert markdown to a Word document. This is the core endpoint — it
          takes your markdown, applies a template and style mapping, and returns
          a .docx file.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          Request body
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Field
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Required
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light">
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">markdown</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">
                  Raw markdown content. Minimum 1 character.
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">template_id</td>
                <td className="py-3 px-4 font-mono text-xs">string (UUID)</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">
                  ID of the Word template to use.
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">mapping_id</td>
                <td className="py-3 px-4 font-mono text-xs">string (UUID)</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">
                  ID of the style mapping to apply.
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">filename</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">No</td>
                <td className="py-3 px-4">
                  Output filename without extension. Default:{" "}
                  <span className="font-mono">&quot;document&quot;</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">
                  response_format
                </td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">No</td>
                <td className="py-3 px-4">
                  <span className="font-mono">&quot;binary&quot;</span>{" "}
                  (default) returns raw .docx bytes.{" "}
                  <span className="font-mono">&quot;json&quot;</span> returns
                  metadata with a download URL.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          Binary response (default)
        </h3>
        <p className="text-bark-light leading-relaxed mb-4">
          Returns the .docx file directly. Check these response headers:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Header
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light">
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">Content-Type</td>
                <td className="py-3 px-4">
                  application/vnd.openxmlformats-officedocument.wordprocessingml.document
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">
                  Content-Disposition
                </td>
                <td className="py-3 px-4">
                  Filename for the download
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">
                  X-Conversion-Id
                </td>
                <td className="py-3 px-4">UUID of the conversion record</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">X-Warnings</td>
                <td className="py-3 px-4">
                  JSON array of warning strings (if any)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          JSON response
        </h3>
        <p className="text-bark-light leading-relaxed mb-4">
          When{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            response_format: &quot;json&quot;
          </span>
          , returns metadata and a download URL:
        </p>
        <CodeBlock
          language="json"
          title="JSON response"
          code={`{
  "conversion_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "completed",
  "filename": "document.docx",
  "download_url": "/api/v1/conversions/a1b2c3d4-.../download",
  "warnings": ["missing_style: Code Block"],
  "stats": {
    "headings": 8,
    "paragraphs": 23,
    "lists": 6,
    "tables": 2,
    "code_blocks": 5,
    "images": 0
  },
  "created_at": "2026-02-25T10:30:00Z"
}`}
        />
        <div className="bg-golden/10 border-l-4 border-golden rounded-r-lg p-4 mb-6">
          <p className="text-sm text-bark">
            <span className="font-semibold">Warnings</span> tell you when a
            markdown element had no matching style in the template, or when a
            mapping rule references a style that doesn&apos;t exist. The
            conversion still completes — it falls back to the default style.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          Example
        </h3>
        <CodeBlock
          language="bash"
          title="Convert with binary response"
          code={`curl -X POST https://api.docmd.io/api/v1/convert \\
  -H "Authorization: Bearer docmd_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "markdown": "# Quarterly Report\\n\\n## Summary\\n\\nRevenue grew 15%.",
    "template_id": "550e8400-e29b-41d4-a716-446655440000",
    "mapping_id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
  }' \\
  -o report.docx`}
        />
      </section>

      {/* ─── GET /api/v1/conversions/{id} ─── */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h2 className="text-xl font-bold text-foreground font-mono">
            /api/v1/conversions/:id
          </h2>
        </div>
        <p className="text-bark-light leading-relaxed mb-4">
          Check the status of a conversion. Useful when you need to poll for
          completion or retrieve metadata after a binary conversion.
        </p>
        <CodeBlock
          language="json"
          title="Response"
          code={`{
  "conversion_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "completed",
  "filename": "report.docx",
  "download_url": "/api/v1/conversions/a1b2c3d4-.../download",
  "warnings": [],
  "stats": {
    "headings": 2,
    "paragraphs": 1,
    "lists": 0,
    "tables": 0,
    "code_blocks": 0,
    "images": 0
  },
  "created_at": "2026-02-25T10:30:00Z"
}`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          Possible status values:{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            pending
          </span>
          ,{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            processing
          </span>
          ,{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            completed
          </span>
          ,{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            failed
          </span>
          .
        </p>
      </section>

      {/* ─── GET /api/v1/conversions/{id}/download ─── */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h2 className="text-xl font-bold text-foreground font-mono">
            /api/v1/conversions/:id/download
          </h2>
        </div>
        <p className="text-bark-light leading-relaxed mb-4">
          Download the converted .docx file. Returns the raw binary with
          appropriate content headers. The conversion must have status{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            completed
          </span>
          .
        </p>
        <CodeBlock
          language="bash"
          title="Download a conversion"
          code={`curl https://api.docmd.io/api/v1/conversions/CONVERSION_ID/download \\
  -H "Authorization: Bearer docmd_YOUR_KEY" \\
  -o output.docx`}
        />
      </section>

      {/* ─── GET /api/v1/templates ─── */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h2 className="text-xl font-bold text-foreground font-mono">
            /api/v1/templates
          </h2>
        </div>
        <p className="text-bark-light leading-relaxed mb-4">
          List all Word templates available to your account. Templates are
          managed via the dashboard — this endpoint is read-only.
        </p>
        <CodeBlock
          language="json"
          title="Response"
          code={`[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Corporate Report",
    "description": "Standard quarterly report template with cover page",
    "version": 3,
    "created_at": "2026-01-15T09:00:00Z",
    "updated_at": "2026-02-20T14:30:00Z"
  },
  {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "name": "Technical Spec",
    "description": "Engineering specification with appendix sections",
    "version": 1,
    "created_at": "2026-02-01T11:00:00Z",
    "updated_at": "2026-02-01T11:00:00Z"
  }
]`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          To learn how templates work and how to create them, see{" "}
          <Link
            href="/docs/templates"
            className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
          >
            Templates & Mappings
          </Link>
          .
        </p>
      </section>

      {/* ─── GET /api/v1/mappings ─── */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h2 className="text-xl font-bold text-foreground font-mono">
            /api/v1/mappings
          </h2>
        </div>
        <p className="text-bark-light leading-relaxed mb-4">
          List style mappings. Optionally filter by template.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          Query parameters
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Parameter
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light">
              <tr>
                <td className="py-3 px-4 font-mono text-xs">template_id</td>
                <td className="py-3 px-4 font-mono text-xs">string (UUID)</td>
                <td className="py-3 px-4">
                  Optional. Only return mappings for this template.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock
          language="json"
          title="Response"
          code={`[
  {
    "id": "mapping-uuid-here",
    "name": "Default Corporate Mapping",
    "template_id": "550e8400-e29b-41d4-a716-446655440000",
    "version": 2,
    "rules": {
      "heading": { "1": "Heading 1", "2": "Heading 2", "3": "Heading 3" },
      "paragraph": "Normal",
      "list_bullet": "List Bullet",
      "list_ordered": "List Number",
      "code_block": "Code",
      "blockquote": "Quote",
      "table": { "style": "Grid Table 1 Light", "header_row": true }
    },
    "created_at": "2026-01-15T09:30:00Z",
    "updated_at": "2026-02-18T16:00:00Z"
  }
]`}
        />
      </section>

      {/* Error codes */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Error codes
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          All errors follow the same envelope format. Here&apos;s the complete list:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  HTTP
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Code
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  When
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light">
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">401</td>
                <td className="py-3 px-4 font-mono text-xs">
                  missing_api_key
                </td>
                <td className="py-3 px-4">
                  No Authorization header provided
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">401</td>
                <td className="py-3 px-4 font-mono text-xs">
                  invalid_api_key
                </td>
                <td className="py-3 px-4">
                  Key is invalid, revoked, or wrong format
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">403</td>
                <td className="py-3 px-4 font-mono text-xs">
                  api_access_denied
                </td>
                <td className="py-3 px-4">
                  Plan doesn&apos;t include API access
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">404</td>
                <td className="py-3 px-4 font-mono text-xs">not_found</td>
                <td className="py-3 px-4">
                  Template, mapping, or conversion not found
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">422</td>
                <td className="py-3 px-4 font-mono text-xs">
                  validation_error
                </td>
                <td className="py-3 px-4">Request body failed validation</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">429</td>
                <td className="py-3 px-4 font-mono text-xs">
                  rate_limit_exceeded
                </td>
                <td className="py-3 px-4">
                  Monthly conversion quota exhausted
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">500</td>
                <td className="py-3 px-4 font-mono text-xs">
                  internal_error
                </td>
                <td className="py-3 px-4">Server error — retry or contact support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Conversion quotas */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Conversion quotas
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Solo plans get 20 conversions per month. Team and Enterprise plans are
          unlimited. When your quota is exhausted, the convert endpoint returns{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            429 rate_limit_exceeded
          </span>
          .
        </p>
        <p className="text-bark-light leading-relaxed mb-4">
          Check your current usage via the dashboard billing page. Quotas reset
          on your billing anniversary date each month.
        </p>
      </section>

      {/* Supported markdown */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Supported markdown
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          The conversion engine parses standard markdown plus these extensions:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Element
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Support
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light">
              {[
                ["Headings (h1–h6)", "Full"],
                ["Paragraphs", "Full"],
                ["Bold, italic, strikethrough", "Full"],
                ["Ordered & unordered lists", "Up to 3 nesting levels"],
                ["Code blocks", "Full (Courier New, 9pt)"],
                ["Inline code", "Full"],
                ["Blockquotes", "Full"],
                ["Tables", "Full (with header rows)"],
                ["Links", "Converted to hyperlinks"],
                ["Images", "Placeholder text inserted"],
                ["Horizontal rules", "Converted to page breaks"],
                ["Task lists", "Parsed (rendered as lists)"],
              ].map(([element, support]) => (
                <tr key={element} className="border-b border-sand last:border-0">
                  <td className="py-3 px-4">{element}</td>
                  <td className="py-3 px-4">{support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DocsContentLayout>
  );
}
