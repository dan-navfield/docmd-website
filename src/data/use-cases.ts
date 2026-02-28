export interface UseCase {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  persona: string;
  headline: string;
  subtitle: string;
  painPoints: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  workflow: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const useCases: UseCase[] = [
  {
    slug: "developers",
    title: "DocMD for Developers",
    metaTitle: "Markdown to Word for Developers",
    metaDescription:
      "Convert READMEs, ADRs, and runbooks from markdown to Word without leaving your workflow. DocMD handles formatting so you ship documents, not fiddle with styles.",
    persona: "Developers",
    headline: "Write markdown. Ship Word docs.",
    subtitle:
      "Convert READMEs, ADRs, and runbooks to polished Word documents without leaving your workflow. No formatting busywork. No copy-paste chaos.",
    painPoints: [
      {
        title: "The formatting tax",
        description:
          "Every time someone asks for a Word version of your documentation, you lose 20 minutes copying, pasting, and fixing formatting that Word mangles. Headings become bold paragraphs. Code blocks become Calibri. Tables fall apart.",
      },
      {
        title: "Inconsistent output across the team",
        description:
          "Five developers formatting the same ADR template produce five different-looking Word documents. There's no standard, no consistency, and no one wants to own the Word template.",
      },
      {
        title: "Context switching kills flow",
        description:
          "You're writing documentation in your editor. Now you need to open Word, remember how styles work, and become a desktop publishing expert for 30 minutes. By the time you're done formatting, you've lost your train of thought.",
      },
      {
        title: "Version control nightmare",
        description:
          "Markdown diffs cleanly in git. Word documents don't. When you maintain both formats, you inevitably end up with the Word version out of sync with the markdown source.",
      },
    ],
    solutions: [
      {
        title: "One-click conversion from markdown",
        description:
          "Paste your markdown, see a preview, download a .docx. Headings, tables, code blocks, and lists format automatically with proper Word styles. No manual formatting.",
      },
      {
        title: "Team templates for consistent output",
        description:
          "Upload your team's Word template once. Every conversion uses the same fonts, colors, and layout. Every developer produces identical-looking documents.",
      },
      {
        title: "API for CI/CD pipelines",
        description:
          "Automate document generation with the REST API. Generate Word docs from markdown on every release, pull request, or scheduled build. Keep your docs in git, serve them in Word.",
      },
      {
        title: "AI classification picks the right template",
        description:
          "Writing an ADR? A runbook? Meeting notes? DocMD's AI detects the document type and applies the right template automatically. No manual selection.",
      },
    ],
    workflow: [
      {
        step: 1,
        title: "Write in markdown",
        description:
          "Use your favorite editor — VS Code, Obsidian, vim, whatever. Write in markdown like you always do. Keep it in git.",
      },
      {
        step: 2,
        title: "Paste into DocMD",
        description:
          "Copy your markdown and paste it into the DocMD converter. Or send it via the API if you've automated the workflow.",
      },
      {
        step: 3,
        title: "Preview and convert",
        description:
          "Check the live preview. Everything looks right? Click convert. Your .docx downloads in seconds with proper styles.",
      },
      {
        step: 4,
        title: "Share the Word doc",
        description:
          "Send the .docx to your PM, client, or stakeholder. It looks like someone spent an hour formatting it in Word. It took you 30 seconds.",
      },
    ],
    faqs: [
      {
        question: "Does DocMD handle code blocks properly?",
        answer:
          "Yes. Fenced code blocks convert to styled monospace text with a shaded background in Word. Inline code renders in monospace too. It looks like properly formatted code, not plain text in the wrong font.",
      },
      {
        question: "Can I automate conversion in my CI/CD pipeline?",
        answer:
          "Yes. The REST API accepts markdown and returns a .docx file. Use it in GitHub Actions, GitLab CI, or any pipeline that can make HTTP requests. Generate Word docs from your markdown source on every release.",
      },
      {
        question: "Does it support mermaid diagrams or math notation?",
        answer:
          "Standard markdown elements are fully supported — headings, lists, tables, code blocks, images, links, blockquotes. For diagrams, we recommend rendering them as images first and referencing them in your markdown.",
      },
      {
        question: "Can I use this with my existing documentation in git?",
        answer:
          "Absolutely. Your markdown stays in git as the source of truth. When you need a Word version, convert it through DocMD. The markdown source is never modified.",
      },
      {
        question: "What about large documents?",
        answer:
          "The free converter supports up to 10,000 characters. Pro plans remove all limits — convert full architecture documents, lengthy ADRs, or comprehensive runbooks without restrictions.",
      },
    ],
  },
  {
    slug: "technical-writers",
    title: "DocMD for Technical Writers",
    metaTitle: "Markdown to Word for Technical Writers",
    metaDescription:
      "Write documentation in markdown, deliver in branded Word templates. DocMD gives technical writers consistent, professional output without manual formatting.",
    persona: "Technical Writers",
    headline: "Write once. Deliver everywhere.",
    subtitle:
      "Draft in markdown for speed and version control. Deliver in branded Word templates your stakeholders expect. DocMD handles the conversion so you focus on content.",
    painPoints: [
      {
        title: "Maintaining two formats",
        description:
          "You keep a markdown version for your team and a Word version for stakeholders. Every update means formatting the same changes twice. One version is always behind.",
      },
      {
        title: "Brand consistency across documents",
        description:
          "Your organization has brand guidelines — fonts, colors, header styles, logo placement. Applying them consistently across dozens of documents is tedious and error-prone.",
      },
      {
        title: "Collaboration across tool preferences",
        description:
          "Engineers want to review docs in GitHub. Product managers want to comment in Word. You're stuck converting between formats and merging feedback from two different worlds.",
      },
      {
        title: "Template maintenance overhead",
        description:
          "When the brand updates (new font, new logo, new color), you need to update every existing document. If your docs aren't template-driven, that means opening and reformatting each one by hand.",
      },
    ],
    solutions: [
      {
        title: "Markdown source, Word delivery",
        description:
          "Keep markdown as your single source of truth. Convert to Word only when you need to deliver. Changes happen in one place, and the Word version is always fresh.",
      },
      {
        title: "Custom branded templates",
        description:
          "Upload your organization's Word template with the exact fonts, colors, headers, and footers required. Every conversion produces on-brand output automatically.",
      },
      {
        title: "Visual style mapping",
        description:
          "Map markdown elements to your template's Word styles using a visual editor. No XML editing, no guessing — see exactly which markdown element maps to which Word style.",
      },
      {
        title: "One template update, all docs updated",
        description:
          "When the brand changes, update your template once. Every new conversion automatically uses the new branding. No retroactive reformatting.",
      },
    ],
    workflow: [
      {
        step: 1,
        title: "Draft in markdown",
        description:
          "Write in your preferred markdown editor. Focus on content, structure, and accuracy. Don't think about formatting.",
      },
      {
        step: 2,
        title: "Set up your template (once)",
        description:
          "Upload your branded Word template and map styles using DocMD's visual editor. This is a one-time setup per template.",
      },
      {
        step: 3,
        title: "Convert and deliver",
        description:
          "Paste your markdown, select your template, convert. The output matches your brand exactly — headers, footers, fonts, colors, all of it.",
      },
      {
        step: 4,
        title: "Iterate confidently",
        description:
          "Need to update the document? Edit the markdown source. Re-convert. The Word version is always in sync, always on-brand.",
      },
    ],
    faqs: [
      {
        question: "Can I have multiple templates for different document types?",
        answer:
          "Yes. Create as many templates as you need — one for proposals, one for technical specs, one for user guides. Select the right template at conversion time, or let AI classification pick it automatically based on content.",
      },
      {
        question: "How does the style mapping work?",
        answer:
          "DocMD's visual editor shows each markdown element (headings, body text, code, tables) alongside your template's Word styles. You connect them visually. When you convert, those mappings determine how the Word output is styled.",
      },
      {
        question: "Can I collaborate with engineers who use markdown and PMs who use Word?",
        answer:
          "That's the core workflow. Engineers write and review in markdown. When PMs or stakeholders need a Word version, convert it. Feedback goes back into the markdown source. One source of truth, multiple output formats.",
      },
      {
        question: "What if our brand template changes?",
        answer:
          "Upload the new template and update your style mappings if needed. All future conversions use the new brand automatically. Existing documents can be re-converted from their markdown source to get the new look.",
      },
      {
        question: "Does DocMD handle tables and figures properly?",
        answer:
          "Yes. Tables convert with clean formatting, proper borders, and header row styling. Images referenced in markdown are embedded in the Word output. Both respect your template's styles.",
      },
    ],
  },
  {
    slug: "ai-teams",
    title: "DocMD for AI Teams",
    metaTitle: "Markdown to Word for AI Teams",
    metaDescription:
      "Turn AI-generated markdown from ChatGPT, Claude, and Copilot into client-ready Word documents. Automate the last mile to professional delivery.",
    persona: "AI Teams",
    headline: "AI writes it. DocMD formats it.",
    subtitle:
      "Turn ChatGPT, Claude, and Copilot output into client-ready Word documents. Automate the last mile between AI generation and professional delivery.",
    painPoints: [
      {
        title: "AI outputs markdown, clients expect Word",
        description:
          "Every AI tool generates markdown by default — headings, lists, code blocks. Your clients don't want a markdown file. They want a polished Word document they can review and share.",
      },
      {
        title: "Copy-paste destroys formatting",
        description:
          "Copying AI output into Word loses structure. Headings become bold text. Tables become garbled text. Code blocks turn into regular paragraphs. You spend 20 minutes fixing what the AI generated in 20 seconds.",
      },
      {
        title: "No branding on AI output",
        description:
          "AI doesn't know your brand guidelines. The raw output has no logo, no brand fonts, no headers or footers. Making it look professional is a manual process every single time.",
      },
      {
        title: "Scaling AI document generation",
        description:
          "One document at a time is manageable. But when your team generates dozens of AI documents per week — proposals, reports, documentation — the conversion bottleneck kills the productivity gains AI promised.",
      },
    ],
    solutions: [
      {
        title: "Direct AI-to-Word pipeline",
        description:
          "Paste AI-generated markdown into DocMD and get a properly formatted Word document in seconds. All the structure the AI created — headings, tables, lists, code — converts cleanly.",
      },
      {
        title: "Branded output from AI content",
        description:
          "Your Word template is applied automatically. The AI writes the content, DocMD applies your brand. Clients see a polished document that looks hand-crafted.",
      },
      {
        title: "API for automated pipelines",
        description:
          "Connect your AI generation pipeline to DocMD's API. AI generates markdown, API converts to branded Word, output goes to SharePoint or email. Fully automated, zero manual steps.",
      },
      {
        title: "AI classification for smart templating",
        description:
          "DocMD's AI detects whether the content is a proposal, report, spec, or meeting notes — and applies the right template automatically. Your team doesn't need to think about templates.",
      },
    ],
    workflow: [
      {
        step: 1,
        title: "Generate content with AI",
        description:
          "Use ChatGPT, Claude, Copilot, or any AI tool to draft your document. Let the AI output markdown — it's what it does best.",
      },
      {
        step: 2,
        title: "Paste into DocMD",
        description:
          "Copy the raw markdown output (including the # and ** symbols) and paste it into DocMD's converter. The live preview shows your formatted document instantly.",
      },
      {
        step: 3,
        title: "Convert with your brand",
        description:
          "Select your template (or let AI classification pick one) and convert. Your .docx downloads with professional formatting and your brand applied.",
      },
      {
        step: 4,
        title: "Deliver to clients",
        description:
          "Send the Word document to your client, stakeholder, or team. It looks like your team spent an hour on formatting. The AI wrote it in seconds, DocMD converted it in seconds.",
      },
    ],
    faqs: [
      {
        question: "Which AI tools work with DocMD?",
        answer:
          "Any AI tool that outputs markdown — ChatGPT, Claude, GitHub Copilot, Gemini, Mistral, and others. If the AI generates text with # headings, **bold**, and - lists, DocMD converts it to Word.",
      },
      {
        question: "Can I automate the AI-to-Word pipeline?",
        answer:
          "Yes. Use DocMD's REST API to send AI-generated markdown and receive a .docx file programmatically. This works in any automation pipeline — n8n, Zapier, custom scripts, or direct API integration.",
      },
      {
        question: "How do I handle AI output that needs editing?",
        answer:
          "Edit the markdown in DocMD's editor before converting. The live preview updates as you type, so you can refine the AI's output and see exactly what the Word document will look like before downloading.",
      },
      {
        question: "Can multiple team members use the same templates?",
        answer:
          "Yes. Templates are shared across your team's account. Everyone who converts a document gets the same branded output, regardless of which AI tool they used to generate the content.",
      },
      {
        question: "What about confidential or sensitive content?",
        answer:
          "DocMD processes your content over HTTPS and discards it immediately after conversion. We don't store, log, or train on your documents. Your content is yours.",
      },
    ],
  },
];
