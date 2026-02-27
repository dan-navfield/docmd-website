import type { Metadata } from "next";
import Link from "next/link";
import { DocsContentLayout } from "@/components/docs/DocsContentLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "MCP Server — DocMD Documentation",
  description:
    "Connect DocMD to Claude Desktop and Claude Code via the Model Context Protocol. Convert documents directly from your AI workflow.",
  alternates: { canonical: "/docs/mcp-server" },
};

export default function McpServerPage() {
  return (
    <DocsContentLayout
      title="MCP Server"
      description="Connect DocMD to Claude as a tool. Convert from your AI workflow."
    >
      {/* What is MCP */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          What is MCP?
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          The Model Context Protocol (MCP) lets AI assistants like Claude use
          external tools. DocMD provides an MCP server that gives Claude direct
          access to your templates, documents, and conversions.
        </p>
        <p className="text-bark-light leading-relaxed mb-4">
          Instead of switching between Claude and the DocMD dashboard, you just
          ask Claude to convert your document. It calls DocMD behind the scenes.
        </p>
        <div className="bg-golden/10 border-l-4 border-golden rounded-r-lg p-4 mb-6">
          <p className="text-sm text-bark">
            <span className="font-semibold">
              MCP access is available on all plans
            </span>{" "}
            — including Solo. No Team plan required.
          </p>
        </div>
      </section>

      {/* Setup */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Setup</h2>
        <p className="text-bark-light leading-relaxed mb-4">
          You need Python 3.10+ and an API key from your DocMD dashboard.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          1. Install dependencies
        </h3>
        <CodeBlock
          language="bash"
          code={`pip install httpx mcp`}
        />

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          2. Configure Claude Desktop
        </h3>
        <p className="text-bark-light leading-relaxed mb-4">
          Add this to your Claude Desktop{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            claude_desktop_config.json
          </span>
          :
        </p>
        <CodeBlock
          language="json"
          title="claude_desktop_config.json"
          code={`{
  "mcpServers": {
    "docmd": {
      "command": "python3",
      "args": ["/path/to/mcp_server.py"],
      "env": {
        "DOCMD_API_URL": "https://api.docmd.io",
        "DOCMD_API_KEY": "docmd_YOUR_KEY"
      }
    }
  }
}`}
        />

        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          3. Configure Claude Code
        </h3>
        <p className="text-bark-light leading-relaxed mb-4">
          For Claude Code, add a{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            .mcp.json
          </span>{" "}
          file in your project root:
        </p>
        <CodeBlock
          language="json"
          title=".mcp.json"
          code={`{
  "mcpServers": {
    "docmd": {
      "command": "python3",
      "args": ["./mcp_server.py"],
      "env": {
        "DOCMD_API_URL": "https://api.docmd.io",
        "DOCMD_API_KEY": "docmd_YOUR_KEY"
      }
    }
  }
}`}
        />

        <p className="text-bark-light leading-relaxed mb-4">
          Restart Claude after adding the config. You should see DocMD tools
          listed when you start a conversation.
        </p>
      </section>

      {/* Available tools */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Available tools
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          The MCP server exposes seven tools:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Tool
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light">
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">
                  docmd_list_templates
                </td>
                <td className="py-3 px-4">
                  List all available Word templates
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">
                  docmd_list_mappings
                </td>
                <td className="py-3 px-4">
                  List style mappings, optionally filtered by template
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">
                  docmd_list_documents
                </td>
                <td className="py-3 px-4">List all stored documents</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">
                  docmd_submit_document
                </td>
                <td className="py-3 px-4">
                  Submit markdown with a title and optional project
                </td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">
                  docmd_get_document
                </td>
                <td className="py-3 px-4">Get document details by ID</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">
                  docmd_convert
                </td>
                <td className="py-3 px-4">
                  Convert a document with a template and mapping
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">
                  docmd_classify
                </td>
                <td className="py-3 px-4">
                  AI-powered document type classification
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Example workflow */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Example workflow
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Here&apos;s what a typical conversation with Claude looks like:
        </p>
        <div className="bg-cream rounded-xl p-6 mb-6 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-1">
              You
            </p>
            <p className="text-sm text-bark">
              &quot;Convert this project spec to Word using the corporate
              template.&quot;
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-1">
              Claude
            </p>
            <p className="text-sm text-bark">
              Claude calls{" "}
              <span className="font-mono bg-sand px-1 py-0.5 rounded text-xs">
                docmd_list_templates
              </span>{" "}
              to find the corporate template, then{" "}
              <span className="font-mono bg-sand px-1 py-0.5 rounded text-xs">
                docmd_list_mappings
              </span>{" "}
              to get the matching mapping, then{" "}
              <span className="font-mono bg-sand px-1 py-0.5 rounded text-xs">
                docmd_submit_document
              </span>{" "}
              with your markdown, and finally{" "}
              <span className="font-mono bg-sand px-1 py-0.5 rounded text-xs">
                docmd_convert
              </span>
              .
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-1">
              Result
            </p>
            <p className="text-sm text-bark">
              A professionally formatted .docx file, ready to download or export
              to SharePoint.
            </p>
          </div>
        </div>
      </section>

      {/* AI classification */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          AI classification
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          The{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            docmd_classify
          </span>{" "}
          tool uses Claude or GPT-4 to analyze your markdown and recommend a
          document type. It recognizes 14 types:
        </p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {[
            "ADR",
            "Architecture Document",
            "Requirements Document",
            "Test Plan",
            "API Specification",
            "Runbook",
            "Design Document",
            "User Guide",
            "Release Notes",
            "Meeting Notes",
            "Technical Specification",
            "Deployment Guide",
            "Security Review",
            "General",
          ].map((type) => (
            <div
              key={type}
              className="text-sm text-bark-light bg-sand/50 px-3 py-1.5 rounded-lg"
            >
              {type}
            </div>
          ))}
        </div>
        <p className="text-bark-light leading-relaxed mb-4">
          Classification modes:
        </p>
        <ul className="space-y-2 text-bark-light list-disc list-inside mb-6">
          <li>
            <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
              suggest
            </span>{" "}
            — returns recommendations without taking action
          </li>
          <li>
            <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
              auto
            </span>{" "}
            — classifies and executes the full pipeline automatically
          </li>
          <li>
            <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
              dry-run
            </span>{" "}
            — shows the plan without writing anything
          </li>
        </ul>
      </section>

      {/* Billing validation */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Billing &amp; access
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          The MCP server validates your API key and billing status before every
          tool call. If your subscription has lapsed or your conversion quota is
          exhausted, the tool returns a clear error message that Claude can relay
          to you.
        </p>
        <p className="text-bark-light leading-relaxed mb-4">
          Unlike the public REST API (which requires Team or Enterprise), MCP
          server access is included on all plans — even Solo.
        </p>
      </section>

      {/* Next */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Next</h2>
        <p className="text-bark-light leading-relaxed">
          If you need to push converted documents to SharePoint, see{" "}
          <Link
            href="/docs/sharepoint"
            className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
          >
            SharePoint Export
          </Link>
          .
        </p>
      </section>
    </DocsContentLayout>
  );
}
