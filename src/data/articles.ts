export interface ArticleSection {
  heading: string;
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: "guide" | "product" | "opinion";
  publishedDate: string;
  readingTime: number;
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: "how-to-convert-markdown-to-word",
    title: "How to Convert Markdown to Word: The Complete Guide",
    metaTitle: "How to Convert Markdown to Word — 4 Methods",
    metaDescription:
      "Learn how to convert markdown files to Word documents using online converters, Pandoc, copy-paste, or API automation. Step-by-step instructions for each method.",
    excerpt:
      "Four ways to turn a .md file into a .docx — from the quick browser method to full API automation. We break down each approach so you can pick the right one.",
    category: "guide",
    publishedDate: "2026-02-15",
    readingTime: 7,
    sections: [
      {
        heading: "The problem with markdown and Word",
        content: `<p>Markdown is great for writing. Headings, lists, code blocks, tables — you get structure without touching a mouse. Developers, technical writers, and increasingly everyone who uses AI tools writes in markdown whether they realize it or not.</p>
<p>But the people who read your documents? They use Word. Your project manager wants a .docx. Your client expects a branded proposal. Legal needs a contract they can redline in Track Changes. The gap between "I wrote this in markdown" and "here's your Word document" is where hours disappear.</p>
<p>There are four common ways to bridge that gap. Each has trade-offs. Here's when to use which.</p>`,
      },
      {
        heading: "Method 1: Online converter (fastest)",
        content: `<p>The fastest path from markdown to Word is a browser-based converter. Paste your markdown, see a preview, click a button, download a .docx.</p>
<p><strong>How it works with DocMD:</strong></p>
<ol>
<li>Go to <a href="/convert">mddoc.app/convert</a></li>
<li>Paste your markdown into the editor (or type directly)</li>
<li>Check the live preview on the right</li>
<li>Click <strong>Convert &amp; Download</strong></li>
<li>Open your .docx in Word, Google Docs, or LibreOffice</li>
</ol>
<p>That's it. No installation, no account required, no configuration. The output includes proper heading styles, formatted tables, styled code blocks, and clean typography.</p>
<p><strong>Best for:</strong> Quick one-off conversions, trying out the result before committing to a tool, converting AI-generated content into something you can send to a client.</p>
<p><strong>Limitations:</strong> The free tier has a character limit and conversion cap. For unlimited conversions and custom templates, you'll need a paid plan.</p>`,
      },
      {
        heading: "Method 2: Pandoc (the power tool)",
        content: `<p>Pandoc is a free, open-source command-line tool that converts between dozens of document formats. It's been around since 2006 and it's excellent at what it does.</p>
<p><strong>How to convert with Pandoc:</strong></p>
<ol>
<li>Install Pandoc: <code>brew install pandoc</code> (macOS) or download from pandoc.org</li>
<li>Run: <code>pandoc input.md -o output.docx</code></li>
<li>For a custom template: <code>pandoc input.md --reference-doc=template.docx -o output.docx</code></li>
</ol>
<p>Pandoc handles the conversion well, but the default Word output is plain. To get branded output, you need to create a reference document with the right styles — which means understanding Word's style system and Pandoc's mapping rules.</p>
<p><strong>Best for:</strong> Developers comfortable with the terminal, CI/CD pipelines that need automated conversion, workflows that convert between many formats (not just markdown to Word).</p>
<p><strong>Limitations:</strong> Requires installation and command-line knowledge. No live preview. Custom templates require manual reference document setup. No visual style mapping — you're editing XML if something doesn't look right.</p>`,
      },
      {
        heading: "Method 3: Copy and paste (the manual way)",
        content: `<p>The oldest method in the book: copy your text, paste it into Word, and format everything by hand.</p>
<p><strong>The process:</strong></p>
<ol>
<li>Open your .md file (or render it somewhere like GitHub)</li>
<li>Copy the rendered content</li>
<li>Paste into Word</li>
<li>Spend the next 15-45 minutes fixing headings, rebuilding tables, reformatting code blocks, and adjusting fonts</li>
</ol>
<p>This works. It's also the most time-consuming approach and produces inconsistent results. Every person on your team will format things slightly differently. Headings might be "bold paragraph" instead of actual Heading styles. Tables lose their structure. Code blocks become plain text in Times New Roman.</p>
<p><strong>Best for:</strong> A single, simple document you'll never need to convert again.</p>
<p><strong>Limitations:</strong> Everything. It's slow, error-prone, and doesn't scale. If you're doing this more than once a month, you're wasting time you could spend on actual work.</p>`,
      },
      {
        heading: "Method 4: API automation (for teams and pipelines)",
        content: `<p>If your team converts documents regularly — or you're building a product that generates Word output — an API is the right tool.</p>
<p><strong>How it works with DocMD's API:</strong></p>
<ol>
<li>Send a POST request with your markdown content</li>
<li>Optionally specify a template ID for branded output</li>
<li>Receive a .docx file in the response</li>
</ol>
<p>This is how teams automate document generation at scale. Convert README files on every release. Generate client proposals from templates. Turn AI-generated content into formatted Word docs without any manual steps.</p>
<p><strong>Best for:</strong> Teams converting 10+ documents per week, products that generate Word output, CI/CD pipelines, AI workflows that need formatted document output.</p>
<p><strong>Limitations:</strong> Requires development work to integrate. Needs an API key and a paid plan.</p>`,
      },
      {
        heading: "Which method should you use?",
        content: `<table>
<thead><tr><th>Scenario</th><th>Best method</th></tr></thead>
<tbody>
<tr><td>Quick one-off conversion</td><td>Online converter</td></tr>
<tr><td>Developer who lives in the terminal</td><td>Pandoc</td></tr>
<tr><td>Team needs consistent branded output</td><td>Online converter with custom templates</td></tr>
<tr><td>Converting AI output to Word</td><td>Online converter or API</td></tr>
<tr><td>Automated pipeline / CI/CD</td><td>API</td></tr>
<tr><td>One document, never again</td><td>Copy and paste</td></tr>
</tbody>
</table>
<p>The right answer depends on how often you convert, how many people need to do it, and how much the output's appearance matters. For most teams, an online converter with template support hits the sweet spot — fast enough for ad-hoc use, consistent enough for professional output.</p>`,
      },
    ],
  },
  {
    slug: "why-developers-write-markdown-clients-need-word",
    title: "Why Developers Write in Markdown but Clients Need Word",
    metaTitle: "Why Developers Write Markdown but Clients Want Word",
    metaDescription:
      "Developers love markdown for speed and simplicity. Clients expect Word. Here's why the gap exists and how to bridge it fast.",
    excerpt:
      "You write in markdown because it's fast and version-controllable. Your clients want Word because it's what they know. This gap isn't going away — but it doesn't have to be your problem.",
    category: "opinion",
    publishedDate: "2026-02-18",
    readingTime: 5,
    sections: [
      {
        heading: "Markdown is a developer's native language",
        content: `<p>Developers didn't adopt markdown because someone told them to. They adopted it because it's the fastest way to write structured content without leaving the keyboard.</p>
<p>Type <code>#</code> for a heading. <code>**</code> for bold. <code>-</code> for a list. No ribbon menus. No style dialogs. No hunting through formatting options while you lose your train of thought. You just write.</p>
<p>Markdown files are plain text, which means they work with git, diff cleanly, live next to your code, and survive every tool migration. Your README from 2015 still opens perfectly. Try that with a Word document created in Office 2010.</p>
<p>When you write an ADR, a runbook, or project documentation, markdown is the obvious choice. It's the format that respects how developers actually work.</p>`,
      },
      {
        heading: "Word is everyone else's native language",
        content: `<p>Here's the thing: your client doesn't care about plain text files. Your project manager doesn't use vim. Legal doesn't have a markdown renderer.</p>
<p>They have Word. They've always had Word. They'll comment in Track Changes. They'll add their signature. They'll email it to someone who will print it out and put it in a binder. And that binder matters to the deal you're trying to close.</p>
<p>This isn't a technology gap — it's a workflow gap. Both sides are using the right tool for their context. A developer writing documentation in Word would be as miserable as a lawyer editing contracts in VS Code.</p>
<p>The problem isn't that either format is wrong. The problem is converting between them.</p>`,
      },
      {
        heading: "The conversion tax",
        content: `<p>Every time you convert a markdown document to Word by hand, you pay a tax. It's usually 15-30 minutes of:</p>
<ul>
<li>Copying rendered markdown and pasting into Word</li>
<li>Fixing headings that pasted as bold text instead of actual styles</li>
<li>Rebuilding tables that lost their structure</li>
<li>Reformatting code blocks that became plain text in Calibri</li>
<li>Adjusting spacing, fonts, and margins to match your brand</li>
<li>Checking that nothing got lost or mangled in the process</li>
</ul>
<p>Do that ten times a month and you've lost a full workday to formatting. Not writing. Not building. Formatting.</p>
<p>The worst part? It's different every time. The document you formatted last Tuesday won't look quite the same as the one you format this Thursday. Consistency requires vigilance, and vigilance requires energy you'd rather spend elsewhere.</p>`,
      },
      {
        heading: "The real cost is context switching",
        content: `<p>The time cost is obvious. The hidden cost is worse: context switching.</p>
<p>You're deep in documentation. You've just written a clean, well-structured markdown file. Now you need to stop thinking about content and start thinking about formatting. Open Word. Find the template. Apply the right styles. Check the table alignment. Fix the code font.</p>
<p>By the time you're done formatting, you've lost whatever flow you were in when you were writing. You've gone from creator to formatter. That switch has a real cognitive cost, and doing it multiple times a day compounds.</p>
<p>Good tools eliminate context switches. That's the whole point.</p>`,
      },
      {
        heading: "Bridge the gap, don't fight it",
        content: `<p>The answer isn't to convince your clients to accept markdown files. It's not to start writing in Word. Both sides of the gap are entrenched for good reasons.</p>
<p>The answer is a bridge that's so fast you forget it's there. Write in markdown because that's where you think best. Convert to Word because that's what the other side needs. Make the conversion instant, consistent, and branded.</p>
<p>That's what <a href="/convert">DocMD</a> does. Paste your markdown, see a preview, download a .docx that looks like your team produced it in Word from scratch. Custom templates mean your brand shows up automatically. AI classification picks the right template without you thinking about it.</p>
<p>The gap between markdown and Word isn't going away. But the time you spend bridging it can go to zero.</p>`,
      },
    ],
  },
  {
    slug: "markdown-to-word-for-ai-content",
    title: "Markdown to Word for AI-Generated Content",
    metaTitle: "Convert AI-Generated Markdown to Word",
    metaDescription:
      "ChatGPT, Claude, and Copilot output markdown by default. Learn how to convert AI-generated content into professional Word documents ready to share with clients.",
    excerpt:
      "Every AI tool outputs markdown. Your clients expect Word. Here's the fastest workflow for turning ChatGPT, Claude, or Copilot output into professional documents.",
    category: "guide",
    publishedDate: "2026-02-20",
    readingTime: 6,
    sections: [
      {
        heading: "AI writes in markdown — whether you asked it to or not",
        content: `<p>Ask ChatGPT to write a project proposal. Ask Claude to draft documentation. Ask Copilot to generate a report. What do you get? Markdown.</p>
<p>Headings with <code>#</code> symbols. Bold text wrapped in <code>**asterisks**</code>. Bullet lists with dashes. Code blocks with triple backticks. The AI doesn't ask what format you want — it defaults to markdown because markdown is the lingua franca of structured text on the internet.</p>
<p>This is great if you're pasting that content into a README or a wiki. It's less great when your client expects a Word document they can review, comment on, and send to their legal team.</p>
<p>The explosion of AI-generated content has turned "how do I convert markdown to Word" from a developer niche question into an everyday problem for anyone using AI to draft documents.</p>`,
      },
      {
        heading: "The copy-paste trap",
        content: `<p>The instinct is to copy the AI output and paste it into Word. Simple, right?</p>
<p>Except the markdown syntax comes along for the ride. You get literal <code>##</code> characters instead of headings. Asterisks around words instead of bold. Raw table syntax that looks like a broken spreadsheet. Code blocks that are just monospace text with no background or borders.</p>
<p>If you paste from a rendered preview (like ChatGPT's interface), you get <em>some</em> formatting — but it's browser formatting, not Word styles. Headings are just big bold text. Lists might look right but aren't using Word's list styles. Tables lose their clean borders. None of it matches your template.</p>
<p>You end up spending more time fixing the formatting than the AI spent writing the content. That's backwards.</p>`,
      },
      {
        heading: "The AI-to-Word workflow that actually works",
        content: `<p>Here's the workflow that takes AI-generated content from raw markdown to polished Word document in under a minute:</p>
<ol>
<li><strong>Generate your content</strong> in ChatGPT, Claude, or any AI tool. Don't worry about formatting — let the AI write in its natural markdown.</li>
<li><strong>Copy the raw markdown</strong> — including the <code>#</code> symbols, <code>**bold**</code> markers, and all. You want the source, not the rendered version.</li>
<li><strong>Paste into <a href="/convert">DocMD's converter</a></strong> — the editor accepts raw markdown and shows you a live preview instantly.</li>
<li><strong>Check the preview</strong> — make sure headings, tables, lists, and code blocks look right. Edit in the markdown editor if anything needs adjusting.</li>
<li><strong>Click Convert &amp; Download</strong> — your .docx downloads with proper Word styles, clean formatting, and professional typography.</li>
</ol>
<p>Total time: about 30 seconds. The output has real Heading 1, Heading 2, Heading 3 styles. Tables have clean borders. Code blocks have monospace fonts and shaded backgrounds. Lists are properly indented. It looks like someone carefully formatted it in Word.</p>`,
      },
      {
        heading: "Custom templates for branded AI output",
        content: `<p>The basic conversion handles formatting. But what about branding?</p>
<p>If you're generating proposals, reports, or documentation for clients, you need the output to look like it came from your organization. Your logo in the header. Your fonts. Your color scheme. Your footer with contact information.</p>
<p>With DocMD Pro, you upload your Word template once. Every conversion after that uses your brand automatically. The AI writes the content, DocMD applies your brand. Your client sees a polished document that looks like your team spent an hour on it.</p>
<p>For teams doing this at scale — generating dozens of documents per week from AI content — the <a href="/docs/api-reference">API</a> lets you automate the entire pipeline. Send markdown in, get branded .docx out, push to SharePoint or email it directly.</p>`,
      },
      {
        heading: "Tips for better AI-to-Word output",
        content: `<ul>
<li><strong>Ask the AI for consistent heading levels.</strong> Tell it to use <code>##</code> for main sections and <code>###</code> for subsections. This maps cleanly to Word's heading hierarchy.</li>
<li><strong>Request markdown tables.</strong> If your document needs data tables, explicitly ask the AI to format them as markdown tables. Most AI tools will comply.</li>
<li><strong>Don't fight the markdown.</strong> If the AI outputs code blocks, let it. DocMD will format them properly in Word. Trying to "clean up" markdown before conversion usually makes things worse.</li>
<li><strong>Use the preview.</strong> Glance at the DocMD preview before converting. It takes two seconds and catches issues like a heading level that's off or a table that didn't parse correctly.</li>
<li><strong>Batch your conversions.</strong> If you're generating multiple documents, collect them and convert in a session rather than one at a time. Or use the API to automate the whole batch.</li>
</ul>
<p>AI is changing how documents get written. The content creation step is faster than ever. Don't let the conversion step become the new bottleneck.</p>`,
      },
    ],
  },
  {
    slug: "create-word-template-for-markdown",
    title: "How to Create a Word Template That Works With Markdown Conversion",
    metaTitle: "Create a Word Template for Markdown Conversion",
    metaDescription:
      "Learn how to set up a Word template with proper heading styles, fonts, and formatting that works perfectly with markdown to Word conversion tools like DocMD.",
    excerpt:
      "A good Word template makes every converted document look professional automatically. Here's how to set one up — the right styles, the right structure, and the mistakes to avoid.",
    category: "guide",
    publishedDate: "2026-02-22",
    readingTime: 8,
    sections: [
      {
        heading: "Why your template matters",
        content: `<p>A markdown-to-Word converter can only produce output as good as the template it uses. Feed it a well-structured template with proper styles, and every converted document looks polished. Feed it a messy template with ad-hoc formatting, and you'll spend time cleaning up every conversion.</p>
<p>Most people skip template setup because it feels like overhead. It's not — it's a one-time investment that pays off on every single conversion after that. Spend an hour on your template now, save 15 minutes on every document forever.</p>
<p>Here's how to create a template that works perfectly with markdown conversion.</p>`,
      },
      {
        heading: "Start with Word's built-in styles",
        content: `<p>The single most important thing: <strong>use Word's built-in heading styles</strong>. Not bold text that looks like a heading. Not a custom font size that approximates a heading. The actual Heading 1, Heading 2, Heading 3 styles from Word's Styles panel.</p>
<p>Why? Because markdown-to-Word converters map <code>#</code> to Heading 1, <code>##</code> to Heading 2, and <code>###</code> to Heading 3. If your template has these styles defined with your brand's fonts and colors, every heading in every converted document will look exactly right.</p>
<p>The styles you need to define:</p>
<ul>
<li><strong>Heading 1</strong> — maps to <code>#</code> in markdown. Typically your largest heading, used for document title or major sections.</li>
<li><strong>Heading 2</strong> — maps to <code>##</code>. Your primary section headings within the document.</li>
<li><strong>Heading 3</strong> — maps to <code>###</code>. Subsection headings.</li>
<li><strong>Normal</strong> — your body text style. This is what paragraphs use.</li>
<li><strong>List Paragraph</strong> — used for bullet and numbered lists.</li>
</ul>
<p>Customize each of these with your preferred font, size, color, and spacing. That's your foundation.</p>`,
      },
      {
        heading: "Set up your page layout",
        content: `<p>Before styling individual elements, configure your page:</p>
<ul>
<li><strong>Margins:</strong> Standard is 1 inch all around. If your brand uses narrower margins, set them in the template.</li>
<li><strong>Headers and footers:</strong> Add your logo, document title field, page numbers — whatever your brand requires. These appear on every converted document automatically.</li>
<li><strong>Default font:</strong> Set the Normal style's font to your brand's body font. Every paragraph will inherit this.</li>
<li><strong>Page size:</strong> Letter (US) or A4 (international). Set it once so you don't think about it again.</li>
</ul>
<p>These settings are baked into the template file. You don't need to configure them per conversion.</p>`,
      },
      {
        heading: "Style your special elements",
        content: `<p>Beyond headings and body text, markdown uses several elements that need dedicated styles:</p>
<p><strong>Tables:</strong> Word has table styles that control borders, shading, header rows, and cell padding. Pick or create a table style that matches your brand. Light borders work better than heavy ones for most documents. Alternating row shading improves readability.</p>
<p><strong>Code blocks:</strong> For inline code and fenced code blocks, you want a monospace font (like Consolas, Fira Code, or Courier New) on a light gray background. Create or modify a style for this — DocMD maps code blocks to a style you can customize.</p>
<p><strong>Block quotes:</strong> Markdown's <code>&gt;</code> syntax creates block quotes. Style these with a left border, slight indent, and italic or lighter font color. They should look distinct from body text without being distracting.</p>
<p><strong>Hyperlinks:</strong> Your brand probably has a link color. Set it in the Hyperlink style. Underlined or not is your call — both are common in professional documents.</p>`,
      },
      {
        heading: "Common template mistakes to avoid",
        content: `<ul>
<li><strong>Manual formatting instead of styles.</strong> If your heading "looks" like a heading because you made it bold and 18pt, it won't work. It has to use the actual Heading style. Converters look for style names, not visual appearance.</li>
<li><strong>Too many heading levels.</strong> Most markdown documents use 3-4 heading levels. If your template defines elaborate styles for Heading 5 through Heading 9, you're over-engineering. Focus on 1-3.</li>
<li><strong>Inconsistent spacing.</strong> Set spacing before and after each heading and paragraph style in the style definition. Don't add blank lines between sections manually — let the styles handle spacing.</li>
<li><strong>Forgetting the Normal style.</strong> Everything inherits from Normal. If Normal uses the wrong font or spacing, everything looks off.</li>
<li><strong>Complex headers/footers with fields that break.</strong> Keep headers and footers simple. A logo, document title, and page number. Complex field codes can cause issues depending on the conversion tool.</li>
</ul>`,
      },
      {
        heading: "Using your template with DocMD",
        content: `<p>Once your template is ready:</p>
<ol>
<li><strong>Upload it</strong> to DocMD through the template management dashboard.</li>
<li><strong>Map your styles</strong> using the visual editor — connect markdown elements to your template's style names. If you used standard names (Heading 1, Heading 2, Normal), most mappings happen automatically.</li>
<li><strong>Test with a sample document</strong> — paste some markdown with headings, tables, code blocks, and lists. Convert and check the output.</li>
<li><strong>Adjust and re-upload</strong> if anything looks off. Usually it's a spacing tweak or a font size adjustment.</li>
</ol>
<p>After this initial setup, every conversion uses your template automatically. If you have multiple templates for different document types (proposals, reports, documentation), DocMD's <a href="/features">AI classification</a> can pick the right one based on the content.</p>
<p>A good template is the difference between "converted markdown" and "a professional document that happens to have been written in markdown." Spend the time to get it right once.</p>`,
      },
    ],
  },
  {
    slug: "markdown-tips-for-better-word-output",
    title: "Markdown Formatting Tips for Better Word Documents",
    metaTitle: "Markdown Tips for Better Word Documents",
    metaDescription:
      "Write markdown that converts to clean Word documents. Tips for headings, tables, code blocks, and lists that produce professional .docx output.",
    excerpt:
      "Small changes in how you write markdown lead to significantly better Word output. These practical tips help you get clean, professional documents on every conversion.",
    category: "guide",
    publishedDate: "2026-02-25",
    readingTime: 6,
    sections: [
      {
        heading: "Better input, better output",
        content: `<p>Markdown-to-Word conversion is deterministic. The same markdown always produces the same Word output. Which means if your Word documents don't look right, the fix is almost always in your markdown, not in the converter.</p>
<p>These aren't obscure tricks. They're practical formatting habits that make your markdown cleaner <em>and</em> produce better Word output. Most of them take zero extra time once they're habits.</p>`,
      },
      {
        heading: "Use consistent heading levels",
        content: `<p>The most common mistake: jumping from <code>#</code> (Heading 1) straight to <code>###</code> (Heading 3), skipping Heading 2 entirely. This looks fine in markdown but creates a broken hierarchy in Word. Table of contents generators, accessibility tools, and style inheritance all depend on proper heading order.</p>
<p><strong>Do this:</strong></p>
<pre><code># Document Title
## First Section
### Subsection
## Second Section</code></pre>
<p><strong>Not this:</strong></p>
<pre><code># Document Title
### Jumped to H3
# Back to H1 for some reason
## Now H2</code></pre>
<p>One Heading 1 per document (the title). Heading 2 for major sections. Heading 3 for subsections within those. That's enough for 95% of documents.</p>`,
      },
      {
        heading: "Format tables properly",
        content: `<p>Markdown tables need the header separator row. Without it, most parsers won't recognize the table at all.</p>
<p><strong>Correct table format:</strong></p>
<pre><code>| Feature    | Status    |
|------------|-----------|
| Headings   | Supported |
| Tables     | Supported |
| Code blocks| Supported |</code></pre>
<p>Tips for better table output:</p>
<ul>
<li><strong>Keep cells concise.</strong> Long paragraphs inside table cells make Word output hard to read. Tables are for quick-reference data, not prose.</li>
<li><strong>Align your pipes.</strong> Not required, but it makes the markdown source readable and helps you spot missing cells.</li>
<li><strong>Use simple content.</strong> Bold and inline code work inside cells. Avoid images, lists, or complex formatting inside table cells — Word support varies.</li>
</ul>`,
      },
      {
        heading: "Write clean code blocks",
        content: `<p>Use fenced code blocks (triple backticks) instead of indented code blocks. Fenced blocks are more reliable across parsers and let you specify a language for syntax context.</p>
<pre><code>\`\`\`javascript
const result = await convert(markdown);
\`\`\`</code></pre>
<p>For inline code (a function name or variable in the middle of a sentence), use single backticks: <code>\`functionName()\`</code>. This renders in a monospace font in Word, making it visually distinct from surrounding text.</p>
<p><strong>Watch for:</strong></p>
<ul>
<li><strong>Very long lines.</strong> Word has page margins. A 200-character code line will overflow or wrap awkwardly. Break long lines if the Word output matters.</li>
<li><strong>Nested backticks.</strong> If your code contains backticks, use double backticks for the outer fence. This is rare but can break rendering when it happens.</li>
</ul>`,
      },
      {
        heading: "Structure lists for Word compatibility",
        content: `<p>Markdown supports nested lists, but the nesting needs to be consistent. Use the same indentation character (spaces, not a mix of tabs and spaces) and the same list marker at each level.</p>
<p><strong>Clean nested list:</strong></p>
<pre><code>- First item
  - Nested item
  - Another nested item
- Second item
  1. Ordered sub-item
  2. Another ordered sub-item</code></pre>
<p>Tips:</p>
<ul>
<li><strong>Don't nest more than 2-3 levels deep.</strong> Word handles deep nesting, but it becomes unreadable. If you need 4+ levels, restructure your content.</li>
<li><strong>Blank lines between list items</strong> can cause each item to be treated as a separate paragraph. This affects spacing in Word output. For tight lists, don't add blank lines.</li>
<li><strong>Consistent markers.</strong> Use <code>-</code> for unordered lists throughout your document, not a mix of <code>-</code>, <code>*</code>, and <code>+</code>.</li>
</ul>`,
      },
      {
        heading: "Handle images thoughtfully",
        content: `<p>Images in markdown are straightforward: <code>![Alt text](image-url)</code>. But the Word output depends on a few things:</p>
<ul>
<li><strong>Use descriptive alt text.</strong> It becomes the image's alt text in Word, which matters for accessibility and for anyone reading the document with images disabled.</li>
<li><strong>Use accessible image URLs.</strong> If you're converting through a web tool, the image URL must be publicly accessible. Local file paths won't resolve.</li>
<li><strong>Size matters.</strong> Very large images will be full-width in Word. Very small images might look odd. Aim for images that are reasonable at Word's page width (about 6.5 inches for letter-size with standard margins).</li>
</ul>`,
      },
      {
        heading: "Small habits, big improvement",
        content: `<p>None of these tips require extra tools or complicated workflows. They're just writing habits:</p>
<ul>
<li>Don't skip heading levels</li>
<li>Always include the table separator row</li>
<li>Use fenced code blocks with language hints</li>
<li>Keep list nesting shallow and consistent</li>
<li>Add meaningful alt text to images</li>
</ul>
<p>Adopt these and your Word output improves immediately — whether you're converting through <a href="/convert">DocMD</a>, Pandoc, or any other tool. Good markdown is good markdown, regardless of what converts it.</p>`,
      },
    ],
  },
];
