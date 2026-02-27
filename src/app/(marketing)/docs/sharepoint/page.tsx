import type { Metadata } from "next";
import Link from "next/link";
import { DocsContentLayout } from "@/components/docs/DocsContentLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "SharePoint Export — DocMD Documentation",
  description:
    "Push converted Word documents directly to SharePoint from DocMD. OAuth setup, destination configuration, and export API.",
  alternates: { canonical: "/docs/sharepoint" },
};

export default function SharePointPage() {
  return (
    <DocsContentLayout
      title="SharePoint Export"
      description="Push converted documents straight to SharePoint. One API call."
    >
      {/* Overview */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
        <p className="text-bark-light leading-relaxed mb-4">
          After converting a document, you can export it directly to a
          SharePoint document library. No downloading, no manual uploading. One
          API call and it&apos;s there.
        </p>
        <div className="bg-golden/10 border-l-4 border-golden rounded-r-lg p-4 mb-6">
          <p className="text-sm text-bark">
            <span className="font-semibold">Team or Enterprise plan required.</span>{" "}
            SharePoint integration is not available on the Solo plan.
          </p>
        </div>
      </section>

      {/* Connect Microsoft */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          1. Connect your Microsoft account
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          From the DocMD dashboard, go to{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            Settings → Microsoft
          </span>{" "}
          and click{" "}
          <span className="font-medium text-foreground">Connect Account</span>.
        </p>
        <p className="text-bark-light leading-relaxed mb-4">
          You&apos;ll be redirected to Microsoft&apos;s login page. Sign in with
          the account that has access to your SharePoint site. DocMD requests
          these permissions:
        </p>
        <ul className="space-y-2 text-bark-light list-disc list-inside mb-6">
          <li>
            <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
              Sites.ReadWrite.All
            </span>{" "}
            — read and write to SharePoint sites
          </li>
          <li>
            <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
              Files.ReadWrite.All
            </span>{" "}
            — upload files to document libraries
          </li>
        </ul>
        <p className="text-bark-light leading-relaxed mb-4">
          After authorization, you&apos;ll see your connected email in the
          settings page. You can check the connection status via the API:
        </p>
        <CodeBlock
          language="bash"
          title="Check Microsoft connection"
          code={`curl https://api.docmd.io/api/settings/microsoft \\
  -H "Authorization: Bearer docmd_YOUR_KEY"`}
        />
        <CodeBlock
          language="json"
          title="Response"
          code={`{
  "connected": true,
  "email": "you@company.com"
}`}
        />
      </section>

      {/* Set up destinations */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          2. Set up a destination
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Destinations define where exports go. You create them within a
          project. Each destination points to a specific SharePoint site and
          document library.
        </p>
        <CodeBlock
          language="bash"
          title="Create a SharePoint destination"
          code={`curl -X POST https://api.docmd.io/api/projects/PROJECT_ID/destinations \\
  -H "Authorization: Bearer docmd_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Engineering Docs",
    "type": "sharepoint",
    "config": {
      "site_url": "https://company.sharepoint.com/sites/engineering",
      "library": "Documents",
      "folder": "Specs"
    }
  }'`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          The{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            config.folder
          </span>{" "}
          field is optional. If omitted, documents are uploaded to the root of
          the library.
        </p>
      </section>

      {/* Export */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          3. Export a conversion
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Once you have a completed conversion and a destination, trigger the
          export:
        </p>
        <CodeBlock
          language="bash"
          title="Export to SharePoint"
          code={`curl -X POST https://api.docmd.io/api/conversions/CONVERSION_ID/export \\
  -H "Authorization: Bearer docmd_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "destination_id": "your-destination-uuid" }'`}
        />
        <CodeBlock
          language="json"
          title="Response"
          code={`{
  "id": "export-uuid",
  "conversion_id": "conversion-uuid",
  "destination_id": "destination-uuid",
  "status": "exporting",
  "created_at": "2026-02-25T10:35:00Z"
}`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          Exports run asynchronously. Poll the export status to check when
          it&apos;s done:
        </p>
        <CodeBlock
          language="bash"
          title="Check export status"
          code={`curl https://api.docmd.io/api/exports/EXPORT_ID \\
  -H "Authorization: Bearer docmd_YOUR_KEY"`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          Possible status values:{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            pending
          </span>
          ,{" "}
          <span className="font-mono text-sm bg-sand px-1.5 py-0.5 rounded">
            exporting
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

      {/* Destination types */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Destination types
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          SharePoint is the primary export target, but DocMD supports three
          destination types:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sand/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-sand-dark">
                  Plan
                </th>
              </tr>
            </thead>
            <tbody className="text-bark-light">
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">sharepoint</td>
                <td className="py-3 px-4">
                  Microsoft SharePoint document library
                </td>
                <td className="py-3 px-4">Team+</td>
              </tr>
              <tr className="border-b border-sand">
                <td className="py-3 px-4 font-mono text-xs">supabase</td>
                <td className="py-3 px-4">Supabase Storage bucket</td>
                <td className="py-3 px-4">Team+</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">local</td>
                <td className="py-3 px-4">
                  Local file system (self-hosted only)
                </td>
                <td className="py-3 px-4">All</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Full pipeline */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Full pipeline example
        </h2>
        <p className="text-bark-light leading-relaxed mb-4">
          Convert markdown and export to SharePoint in three API calls:
        </p>
        <CodeBlock
          language="bash"
          title="1. Convert"
          code={`CONV_ID=$(curl -s -X POST https://api.docmd.io/api/v1/convert \\
  -H "Authorization: Bearer docmd_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "markdown": "# Quarterly Report\\n\\n...",
    "template_id": "TEMPLATE_ID",
    "mapping_id": "MAPPING_ID",
    "response_format": "json"
  }' | jq -r '.conversion_id')`}
        />
        <CodeBlock
          language="bash"
          title="2. Export"
          code={`curl -X POST https://api.docmd.io/api/conversions/$CONV_ID/export \\
  -H "Authorization: Bearer docmd_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "destination_id": "DEST_ID" }'`}
        />
        <CodeBlock
          language="bash"
          title="3. Check status"
          code={`curl https://api.docmd.io/api/exports/EXPORT_ID \\
  -H "Authorization: Bearer docmd_YOUR_KEY"`}
        />
        <p className="text-bark-light leading-relaxed mb-4">
          When the export completes, the document is sitting in your SharePoint
          library. No browser needed.
        </p>
      </section>

      {/* Troubleshooting */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Troubleshooting
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              Export fails with &quot;not connected&quot;
            </h3>
            <p className="text-sm text-bark-light">
              Your Microsoft account isn&apos;t linked, or the OAuth token has
              expired. Reconnect from{" "}
              <span className="font-mono bg-sand px-1 py-0.5 rounded text-xs">
                Settings → Microsoft
              </span>
              .
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              Export fails with &quot;access denied&quot;
            </h3>
            <p className="text-sm text-bark-light">
              The Microsoft account doesn&apos;t have write access to the
              target site or library. Check permissions in SharePoint admin.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              Export stays in &quot;exporting&quot; state
            </h3>
            <p className="text-sm text-bark-light">
              SharePoint may be slow to respond. Wait a minute and check again.
              If it stays stuck, the export likely failed silently — check the
              audit log for details.
            </p>
          </div>
        </div>
      </section>

      {/* Back to docs */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          That&apos;s everything
        </h2>
        <p className="text-bark-light leading-relaxed">
          You&apos;ve covered the full DocMD documentation. Go back to the{" "}
          <Link
            href="/docs"
            className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
          >
            docs overview
          </Link>{" "}
          or start building with the{" "}
          <Link
            href="/docs/quick-start"
            className="text-forest hover:text-forest-dark font-medium underline underline-offset-2"
          >
            Quick Start guide
          </Link>
          .
        </p>
      </section>
    </DocsContentLayout>
  );
}
