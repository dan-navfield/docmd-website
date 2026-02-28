export interface ComparisonRow {
  feature: string;
  mddoc: string | boolean;
  competitor: string | boolean;
}

export interface ComparisonPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  competitorName: string;
  competitorDescription: string;
  verdict: string;
  rows: ComparisonRow[];
  prosDocmd: string[];
  prosCompetitor: string[];
  useDocmdWhen: string[];
  useCompetitorWhen: string[];
  faqs: { question: string; answer: string }[];
}

export const comparisons: ComparisonPage[] = [
  {
    slug: "mddoc-vs-pandoc",
    title: "MDDoc vs Pandoc",
    metaTitle: "MDDoc vs Pandoc — Markdown to Word Compared",
    metaDescription:
      "Compare MDDoc and Pandoc for markdown to Word conversion. See the differences in setup, features, templates, and workflow to find the right tool for your team.",
    competitorName: "Pandoc",
    competitorDescription:
      "Pandoc is a free, open-source command-line tool that converts between dozens of document formats. It's the Swiss Army knife of document conversion — powerful, flexible, and beloved by developers who live in the terminal.",
    verdict:
      "Pandoc is a powerhouse if you're comfortable with command-line tools and need multi-format conversion. MDDoc is the better choice when your team needs a visual workflow, custom branded templates, and zero setup.",
    rows: [
      { feature: "Setup required", mddoc: "None — open browser", competitor: "Install CLI + dependencies" },
      { feature: "Live preview", mddoc: true, competitor: false },
      { feature: "Custom Word templates", mddoc: "Upload and map visually", competitor: "Reference file (manual setup)" },
      { feature: "AI document classification", mddoc: true, competitor: false },
      { feature: "Heading styles", mddoc: true, competitor: true },
      { feature: "Tables", mddoc: true, competitor: true },
      { feature: "Code blocks", mddoc: "Styled with background", competitor: "Basic formatting" },
      { feature: "Images", mddoc: true, competitor: true },
      { feature: "Batch conversion", mddoc: "API or dashboard", competitor: "Shell scripting" },
      { feature: "SharePoint export", mddoc: true, competitor: false },
      { feature: "REST API", mddoc: "48 endpoints", competitor: false },
      { feature: "MCP server (AI integration)", mddoc: true, competitor: false },
      { feature: "Multi-format support", mddoc: "Markdown to Word", competitor: "Dozens of formats" },
      { feature: "Price", mddoc: "Free tier + paid plans", competitor: "Free and open-source" },
      { feature: "Offline usage", mddoc: false, competitor: true },
    ],
    prosDocmd: [
      "Zero setup — paste markdown and convert in your browser",
      "Visual template editor — no reference file hacking required",
      "AI auto-classifies documents and picks the right template",
      "REST API with 48 endpoints for automation",
      "SharePoint integration for enterprise workflows",
      "Live preview shows exactly what your Word doc will look like",
      "Team-friendly — anyone can use it without training",
    ],
    prosCompetitor: [
      "Free and open-source with no usage limits",
      "Converts between dozens of formats, not just markdown to Word",
      "Works offline with no internet connection",
      "Deeply customizable via Lua filters and templates",
      "Huge community with decades of development",
      "Scriptable for complex CI/CD pipelines",
    ],
    useDocmdWhen: [
      "Your team includes non-technical people who need to convert documents",
      "You want branded Word output with your company's fonts, colors, and logo",
      "You need a visual preview before generating the final document",
      "You're building automation with an API rather than shell scripts",
      "You want AI to automatically classify and template documents",
      "You need to push documents directly to SharePoint",
    ],
    useCompetitorWhen: [
      "You need to convert between many formats — not just markdown to Word",
      "You're comfortable with the command line and prefer a local tool",
      "You need offline conversion with no internet dependency",
      "You want deep customization through Lua filters",
      "You're on a tight budget and need unlimited free conversions",
      "You're already using Pandoc in your CI/CD pipeline",
    ],
    faqs: [
      {
        question: "Can I switch from Pandoc to MDDoc easily?",
        answer:
          "Yes. If you have existing markdown files, they work in MDDoc with no changes. Standard markdown is standard markdown. The difference is in the conversion output and workflow, not the input format.",
      },
      {
        question: "Is MDDoc as customizable as Pandoc?",
        answer:
          "For markdown-to-Word specifically, MDDoc offers more accessible customization — you upload a Word template and visually map styles. Pandoc is more flexible in the abstract (Lua filters can do almost anything), but that flexibility requires programming knowledge.",
      },
      {
        question: "Does MDDoc use Pandoc under the hood?",
        answer:
          "No. MDDoc uses its own conversion engine built specifically for high-fidelity markdown to Word output. This lets us optimize for Word-specific features like style mapping, template support, and document classification.",
      },
      {
        question: "Which produces better-looking Word documents?",
        answer:
          "MDDoc, in most cases. Pandoc's default Word output is functional but plain. MDDoc's output is designed to look polished out of the box, with proper spacing, styled code blocks, and clean table formatting. With custom templates, MDDoc output matches your brand exactly.",
      },
      {
        question: "Can I use both MDDoc and Pandoc?",
        answer:
          "Absolutely. Some teams use Pandoc in CI/CD for bulk format conversion and MDDoc for client-facing documents that need to look polished. The tools complement each other.",
      },
    ],
  },
  {
    slug: "mddoc-vs-manual-formatting",
    title: "MDDoc vs Manual Formatting",
    metaTitle: "MDDoc vs Manual Formatting in Word",
    metaDescription:
      "Stop copying markdown into Word and reformatting by hand. MDDoc automates conversion with proper styles, templates, and consistent output.",
    competitorName: "Manual Formatting",
    competitorDescription:
      "The manual approach: copy your markdown text, paste it into Word, and spend the next 20 minutes fixing headings, reformatting tables, re-indenting code blocks, and adjusting fonts. It works. It's also the most tedious part of your week.",
    verdict:
      "Manual formatting works for a one-off document once a year. For anything more frequent, it's a time sink that produces inconsistent results. MDDoc eliminates the busywork entirely.",
    rows: [
      { feature: "Time per document", mddoc: "Under 30 seconds", competitor: "15-45 minutes" },
      { feature: "Heading styles applied", mddoc: "Automatically", competitor: "Select and apply each one" },
      { feature: "Table formatting", mddoc: "Clean, consistent tables", competitor: "Paste as plain text, rebuild manually" },
      { feature: "Code blocks", mddoc: "Styled with monospace font and background", competitor: "Lost on paste — manual reformatting" },
      { feature: "Consistent output", mddoc: "Every document matches your template", competitor: "Varies by person and mood" },
      { feature: "Custom branding", mddoc: "Upload template once, applied everywhere", competitor: "Apply styles manually every time" },
      { feature: "Batch conversion", mddoc: "Convert multiple docs via API", competitor: "One at a time, by hand" },
      { feature: "Learning curve", mddoc: "Paste and click", competitor: "Know Word styles inside and out" },
      { feature: "Error prone", mddoc: "No — automated", competitor: "Yes — missed headings, wrong fonts, broken tables" },
      { feature: "Cost", mddoc: "Free tier available, Pro from $10/mo", competitor: "Free (but your time isn't)" },
    ],
    prosDocmd: [
      "Convert in seconds instead of spending 20+ minutes formatting",
      "Consistent output — every document looks professional",
      "Code blocks, tables, and nested lists just work",
      "Custom templates mean your brand is applied automatically",
      "Anyone on your team gets the same result — no style expertise needed",
      "API and batch conversion for teams with volume",
    ],
    prosCompetitor: [
      "No tool to learn or pay for",
      "Full control over every formatting decision",
      "Works when you only format one document per year",
      "No internet connection required",
    ],
    useDocmdWhen: [
      "You convert markdown to Word more than once a month",
      "Multiple people on your team need to produce Word documents",
      "Your documents need consistent branding and formatting",
      "You're tired of fixing tables and code blocks by hand",
      "You need to convert AI-generated markdown into client-ready documents",
      "You value your time more than the cost of a tool",
    ],
    useCompetitorWhen: [
      "You convert one document per year and don't mind the manual work",
      "Your documents are extremely simple — just paragraphs, no tables or code",
      "You genuinely enjoy formatting documents in Word",
    ],
    faqs: [
      {
        question: "How much time does MDDoc actually save?",
        answer:
          "Most users report saving 15-30 minutes per document. If you convert 10 documents a month, that's 2.5 to 5 hours saved. Over a year, it adds up to weeks of time you get back for actual work.",
      },
      {
        question: "Will the output look as good as manual formatting?",
        answer:
          "Better, in most cases. MDDoc applies Word styles consistently — proper heading hierarchy, clean table borders, styled code blocks. Manual formatting often has subtle inconsistencies: a Heading 2 that's actually just bold text, a table with mismatched column widths, code in the wrong font.",
      },
      {
        question: "What about documents that need special formatting?",
        answer:
          "Upload a custom Word template with your special formatting built in. MDDoc maps your markdown elements to those styles. For truly unique one-off layouts, you can always fine-tune the Word output after conversion — but the 90% of formatting work is already done.",
      },
      {
        question: "Can I still edit the Word document after conversion?",
        answer:
          "Of course. MDDoc produces a standard .docx file. Open it in Word, Google Docs, or any compatible editor and make changes like you normally would. The styles are proper Word styles, not hacked formatting, so editing is clean.",
      },
      {
        question: "My team has a specific Word template. Can MDDoc use it?",
        answer:
          "Yes. Upload your team's .docx template to MDDoc and use the visual style mapping editor to connect markdown elements to your template's styles. Every conversion will match your brand.",
      },
    ],
  },
];
