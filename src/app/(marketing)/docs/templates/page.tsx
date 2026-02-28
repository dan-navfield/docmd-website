import type { Metadata } from "next";
import Link from "next/link";
import { DocsContentLayout } from "@/components/docs/DocsContentLayout";
import { BreadcrumbSchema } from "@/components/docs/BreadcrumbSchema";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Templates & Mappings — DocMD Documentation",
  description:
    "How DocMD templates and style mappings work. Upload Word templates, extract styles, and define rules that connect markdown to Word formatting.",
  alternates: { canonical: "/docs/templates" },
};

export default function TemplatesPage() {
  return (
    <>
    <BreadcrumbSchema title="Templates & Mappings" href="/docs/templates" />
    <DocsContentLayout
      title="Templates & Mappings"
      description="The system that connects markdown elements to Word styles."
    >
      {/* What are templates */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          What are templates?
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          A template is a regular Word .docx file. It contains the styles,
          fonts, headers, footers, and page layout you want in your output
          documents. Think of it as the shell — DocMD pours your markdown
          content into it.
        </p>
        <p className="text-bark-light leading-relaxed mb-4">
          You create templates in Word (or Google Docs exported as .docx). Then
          you upload them to DocMD. Every template gets versioned — update it
          whenever your branding changes.
        </p>
        <div className="bg-golden/10 border-l-4 border-golden rounded-r-lg p-4 mb-6">
          <p className="text-sm text-bark">
            <span className="font-semibold">Templates are managed via the dashboard.</span>{" "}
            The public API provides read-only access for listing templates and
            their styles. Upload and edit templates in the DocMD web app.
          </p>
        </div>
      </section>

      {/* Template features */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          What templates can include
        </h2>
        <ul className="space-y-2 text-bark-light list-disc list-inside mb-6">
          <li>
            <span className="font-medium text-foreground">Cover page</span> —
            automatically preserved. DocMD keeps the first section of your
            template as-is and can update the title from your first H1.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Paragraph and character styles
            </span>{" "}
            — Heading 1 through Heading 6, body text, lists, code blocks,
            quotes, tables.
          </li>
          <li>
            <span className="font-medium text-foreground">Custom fonts</span> —
            upload .ttf, .otf, .woff, or .woff2 files to the font library.
            Templates using custom fonts will render correctly.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Headers and footers
            </span>{" "}
            — page numbers, logos, dates. They carry through to the output.
          </li>
          <li>
            <span className="font-medium text-foreground">Final page</span> —
            content after the last section break is preserved (useful for
            appendix pages, back covers).
          </li>
        </ul>
      </section>

      {/* Style extraction */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Style extraction
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          When you upload a template, DocMD reads every paragraph and character
          style defined in the .docx file. You can see the full list via the
          dashboard or API:
        </p>
        <CodeBlock
          language="bash"
          title="Get template styles (internal API)"
          code={`curl https://api.mddoc.app/api/templates/TEMPLATE_ID/styles \\
  -H "Authorization: Bearer docmd_YOUR_KEY"`}
        />
        <CodeBlock
          language="json"
          title="Response"
          code={`{
  "template_id": "550e8400-...",
  "styles": [
    "Normal", "Heading 1", "Heading 2", "Heading 3",
    "List Bullet", "List Bullet 2", "List Number",
    "Code", "Quote", "Title", "Subtitle",
    "Header", "Footer", "TOC Heading"
  ],
  "used_styles": [
    "Normal", "Heading 1", "Title", "Subtitle"
  ]
}`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            styles
          </span>{" "}
          lists every style defined in the template.{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            used_styles
          </span>{" "}
          shows which styles are actually applied to content in the template
          file. Use both to build your mapping.
        </p>
      </section>

      {/* What are mappings */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          What are mappings?
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          A mapping is a set of rules that tell DocMD which Word style to apply
          for each markdown element. Heading 1 becomes &quot;Heading 1&quot; in
          Word. A bullet list becomes &quot;List Bullet.&quot; A code block
          becomes your &quot;Code&quot; style.
        </p>
        <p className="text-bark-light leading-relaxed mb-4">
          Each mapping is tied to a template. Different templates have different
          style names, so you need different mappings.
        </p>
      </section>

      {/* Mapping rules schema */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Mapping rules schema
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Here&apos;s the full schema for a mapping&apos;s{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            rules
          </span>{" "}
          object:
        </p>
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
                  Default
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light text-xs">
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">heading</td>
                <td className="py-3 px-4 font-mono">object</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4 text-sm">
                  Map of heading level to style name, e.g.{" "}
                  <span className="font-mono">
                    {`{"1": "Heading 1", "2": "Heading 2"}`}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">document_title</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;&quot;</td>
                <td className="py-3 px-4 text-sm">
                  Style for the cover page title (from first H1)
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">document_subtitle</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;&quot;</td>
                <td className="py-3 px-4 text-sm">Cover page subtitle style</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">paragraph</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;Normal&quot;</td>
                <td className="py-3 px-4 text-sm">Body text style</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">list_bullet</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;List Bullet&quot;</td>
                <td className="py-3 px-4 text-sm">Level 1 bullet list</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">list_bullet_2</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;List Bullet 2&quot;</td>
                <td className="py-3 px-4 text-sm">Level 2 bullet list</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">list_bullet_3</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;List Bullet 3&quot;</td>
                <td className="py-3 px-4 text-sm">Level 3 bullet list</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">list_ordered</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;List Number&quot;</td>
                <td className="py-3 px-4 text-sm">Level 1 numbered list</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">list_ordered_2</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;List Number 2&quot;</td>
                <td className="py-3 px-4 text-sm">Level 2 numbered list</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">list_ordered_3</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;List Number 3&quot;</td>
                <td className="py-3 px-4 text-sm">Level 3 numbered list</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">code_block</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;Code&quot;</td>
                <td className="py-3 px-4 text-sm">Fenced code block style</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">blockquote</td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">&quot;Quote&quot;</td>
                <td className="py-3 px-4 text-sm">Block quote style</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">table</td>
                <td className="py-3 px-4 font-mono">object</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4 text-sm">
                  <span className="font-mono">{`{style, header_row}`}</span> —
                  table style name and whether first row is a header
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono">page_break_before</td>
                <td className="py-3 px-4 font-mono">string[]</td>
                <td className="py-3 px-4 font-mono">[]</td>
                <td className="py-3 px-4 text-sm">
                  Elements that trigger a page break, e.g.{" "}
                  <span className="font-mono">[&quot;heading.1&quot;]</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono">metadata_mapping</td>
                <td className="py-3 px-4 font-mono">object</td>
                <td className="py-3 px-4 font-mono">{`{}`}</td>
                <td className="py-3 px-4 text-sm">
                  Cover page field-to-style mapping for metadata clearing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Example mapping */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Example mapping
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Here&apos;s a complete mapping for a typical corporate template:
        </p>
        <CodeBlock
          language="json"
          title="Full mapping rules"
          code={`{
  "heading": {
    "1": "Heading 1",
    "2": "Heading 2",
    "3": "Heading 3",
    "4": "Heading 4"
  },
  "document_title": "Cover heading",
  "document_subtitle": "Cover subtitle",
  "paragraph": "Normal",
  "list_bullet": "List Bullet",
  "list_bullet_2": "List Bullet 2",
  "list_bullet_3": "List Bullet 3",
  "list_ordered": "List Number",
  "list_ordered_2": "List Number 2",
  "list_ordered_3": "List Number 3",
  "code_block": "Code Block",
  "blockquote": "Block Quote",
  "table": {
    "style": "Grid Table 1 Light",
    "header_row": true
  },
  "page_break_before": ["heading.1"],
  "metadata_mapping": {
    "Author": "Cover Author",
    "Date": "Cover Date"
  }
}`}
        />
      </section>

      {/* How conversion uses mappings */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          How conversion uses mappings
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          When DocMD converts your markdown, it:
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-bark-light">
          <li>Parses the markdown into a structured AST (abstract syntax tree)</li>
          <li>Loads the .docx template</li>
          <li>Validates that every style referenced in the mapping exists in the template</li>
          <li>Preserves the cover page and final page sections</li>
          <li>Walks each AST node and creates a Word paragraph with the mapped style</li>
          <li>Returns the result with a conversion report</li>
        </ol>
        <p className="text-bark-light leading-relaxed mb-4">
          If a mapped style doesn&apos;t exist in the template, the conversion
          still succeeds — it falls back to the default style and includes a
          warning in the response.
        </p>
      </section>

      {/* Validation warnings */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Validation warnings
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          The conversion report includes two types of warnings:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Warning type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light">
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">missing_style</td>
                <td className="py-3 px-4">
                  A mapping rule references a style that doesn&apos;t exist in the template
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">
                  unmapped_element
                </td>
                <td className="py-3 px-4">
                  The markdown contains an element with no corresponding mapping rule
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-bark-light leading-relaxed mb-4">
          Check warnings in your API response to catch mapping issues early.
          Zero warnings means a clean conversion.
        </p>
      </section>

      {/* Next */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Next</h2>
        <p className="text-bark-light leading-relaxed">
          Learn how to use DocMD directly from your AI assistant with the{" "}
          <Link
            href="/docs/mcp-server"
            className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
          >
            MCP Server integration
          </Link>
          .
        </p>
      </section>
    </DocsContentLayout>
    </>
  );
}
