import { NextRequest, NextResponse } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  LevelFormat,
  convertInchesToTwip,
  ShadingType,
} from "docx";

// ─── Rate Limiter ────────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per window

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

// Clean up stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
      if (now > entry.resetAt) rateLimitMap.delete(ip);
    }
  }, 300_000);
}

// ─── Types ──────────────────────────────────────────────────────────────────

interface ParsedBlock {
  type:
    | "heading1"
    | "heading2"
    | "heading3"
    | "paragraph"
    | "bullet"
    | "ordered"
    | "codeblock"
    | "table"
    | "blockquote"
    | "empty";
  content: string;
  rows?: string[][];
  language?: string;
  listIndex?: number;
}

interface InlineSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
}

// ─── Colors & Styles ────────────────────────────────────────────────────────

const COLORS = {
  forest: "0A372F",
  teal: "077771",
  body: "333333",
  codeBg: "F5F5F5",
  tableBorder: "CCCCCC",
  tableHeaderBg: "E8F5F3",
  white: "FFFFFF",
};

// ─── Inline Parser ──────────────────────────────────────────────────────────

function parseInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  // Match: `code`, ***bolditalic***, **bold**, *italic*, _italic_
  const inlineRegex = /(`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index) });
    }

    const raw = match[0];

    if (raw.startsWith("`")) {
      segments.push({ text: raw.slice(1, -1), code: true });
    } else if (raw.startsWith("***")) {
      segments.push({ text: raw.slice(3, -3), bold: true, italic: true });
    } else if (raw.startsWith("**")) {
      segments.push({ text: raw.slice(2, -2), bold: true });
    } else if (raw.startsWith("*") || raw.startsWith("_")) {
      segments.push({ text: raw.slice(1, -1), italic: true });
    }

    lastIndex = match.index + raw.length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex) });
  }

  if (segments.length === 0) {
    segments.push({ text });
  }

  return segments;
}

// ─── Markdown Block Parser ──────────────────────────────────────────────────

function parseMarkdownBlocks(markdown: string): ParsedBlock[] {
  const lines = markdown.split("\n");
  const blocks: ParsedBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trimStart().startsWith("```")) {
      const language = line.trimStart().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({
        type: "codeblock",
        content: codeLines.join("\n"),
        language,
      });
      i++; // skip closing ```
      continue;
    }

    // Table: detect by pipe at start and a separator row (|---|)
    if (line.trim().startsWith("|") && i + 1 < lines.length && /^\|[\s-:|]+\|$/.test(lines[i + 1].trim())) {
      const tableRows: string[][] = [];

      // Header row
      const headerCells = line
        .trim()
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim());
      tableRows.push(headerCells);

      i++; // skip header
      i++; // skip separator

      // Data rows
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i]
          .trim()
          .split("|")
          .filter((c) => c.trim() !== "")
          .map((c) => c.trim());
        tableRows.push(cells);
        i++;
      }

      blocks.push({ type: "table", content: "", rows: tableRows });
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      blocks.push({ type: "heading3", content: line.slice(4).trim() });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "heading2", content: line.slice(3).trim() });
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      blocks.push({ type: "heading1", content: line.slice(2).trim() });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "blockquote", content: quoteLines.join("\n") });
      continue;
    }

    // Unordered list
    if (/^[\-\*\+]\s/.test(line.trim())) {
      blocks.push({
        type: "bullet",
        content: line.trim().replace(/^[\-\*\+]\s+/, ""),
      });
      i++;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const match = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (match) {
        blocks.push({
          type: "ordered",
          content: match[2],
          listIndex: parseInt(match[1]),
        });
      }
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      blocks.push({ type: "empty", content: "" });
      i++;
      continue;
    }

    // Normal paragraph
    blocks.push({ type: "paragraph", content: line.trim() });
    i++;
  }

  return blocks;
}

// ─── Build TextRuns from inline segments ────────────────────────────────────

function buildTextRuns(text: string, baseOpts?: Partial<{ bold: boolean; italic: boolean; color: string; size: number; font: string }>): TextRun[] {
  const segments = parseInline(text);
  return segments.map((seg) => {
    const opts: Record<string, unknown> = {
      text: seg.text,
      bold: seg.bold || baseOpts?.bold || false,
      italics: seg.italic || baseOpts?.italic || false,
      size: baseOpts?.size || 22, // 11pt in half-points
      color: baseOpts?.color || COLORS.body,
      font: baseOpts?.font || undefined,
    };

    if (seg.code) {
      opts.font = "Courier New";
      opts.shading = {
        type: ShadingType.SOLID,
        color: COLORS.codeBg,
        fill: COLORS.codeBg,
      };
    }

    return new TextRun(opts as ConstructorParameters<typeof TextRun>[0]);
  });
}

// ─── Build docx paragraphs from parsed blocks ──────────────────────────────

function buildDocxElements(blocks: ParsedBlock[]): (Paragraph | Table)[] {
  const elements: (Paragraph | Table)[] = [];

  // Track if the first heading1 should be a title
  let isFirstH1 = true;

  for (const block of blocks) {
    switch (block.type) {
      case "heading1": {
        if (isFirstH1) {
          // Render as title style
          elements.push(
            new Paragraph({
              spacing: { before: 240, after: 200 },
              children: [
                new TextRun({
                  text: block.content,
                  bold: true,
                  size: 56, // 28pt
                  color: COLORS.forest,
                }),
              ],
            })
          );
          isFirstH1 = false;
        } else {
          elements.push(
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 360, after: 120 },
              children: [
                new TextRun({
                  text: block.content,
                  bold: true,
                  size: 44, // 22pt
                  color: COLORS.forest,
                }),
              ],
            })
          );
        }
        break;
      }

      case "heading2":
        elements.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 100 },
            children: [
              new TextRun({
                text: block.content,
                bold: true,
                size: 36, // 18pt
                color: COLORS.teal,
              }),
            ],
          })
        );
        break;

      case "heading3":
        elements.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 240, after: 80 },
            children: [
              new TextRun({
                text: block.content,
                bold: true,
                size: 28, // 14pt
                color: COLORS.teal,
              }),
            ],
          })
        );
        break;

      case "paragraph":
        elements.push(
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: buildTextRuns(block.content),
          })
        );
        break;

      case "bullet":
        elements.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 40, after: 40 },
            children: buildTextRuns(block.content),
          })
        );
        break;

      case "ordered":
        elements.push(
          new Paragraph({
            numbering: { reference: "ordered-list", level: 0 },
            spacing: { before: 40, after: 40 },
            children: buildTextRuns(block.content),
          })
        );
        break;

      case "codeblock":
        elements.push(
          new Paragraph({
            spacing: { before: 120, after: 120 },
            indent: { left: convertInchesToTwip(0.25), right: convertInchesToTwip(0.25) },
            shading: {
              type: ShadingType.SOLID,
              color: COLORS.codeBg,
              fill: COLORS.codeBg,
            },
            children: block.content.split("\n").flatMap((codeLine, idx, arr) => {
              const runs: TextRun[] = [
                new TextRun({
                  text: codeLine || " ",
                  font: "Courier New",
                  size: 20, // 10pt
                  color: COLORS.body,
                }),
              ];
              if (idx < arr.length - 1) {
                runs.push(new TextRun({ break: 1, text: "", font: "Courier New", size: 20 }));
              }
              return runs;
            }),
          })
        );
        break;

      case "blockquote":
        elements.push(
          new Paragraph({
            spacing: { before: 120, after: 120 },
            indent: { left: convertInchesToTwip(0.5) },
            children: buildTextRuns(block.content, {
              italic: true,
              color: "666666",
            }),
          })
        );
        break;

      case "table": {
        if (!block.rows || block.rows.length === 0) break;
        const columnCount = block.rows[0].length;

        const tableRows = block.rows.map((row, rowIdx) => {
          const cells = row.map(
            (cellText) =>
              new TableCell({
                width: { size: Math.floor(9000 / columnCount), type: WidthType.DXA },
                shading:
                  rowIdx === 0
                    ? { type: ShadingType.SOLID, color: COLORS.tableHeaderBg, fill: COLORS.tableHeaderBg }
                    : undefined,
                children: [
                  new Paragraph({
                    spacing: { before: 40, after: 40 },
                    children: buildTextRuns(cellText, {
                      bold: rowIdx === 0,
                      size: 20,
                    }),
                  }),
                ],
              })
          );

          // Pad with empty cells if row has fewer columns
          while (cells.length < columnCount) {
            cells.push(
              new TableCell({
                width: { size: Math.floor(9000 / columnCount), type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "" })] })],
              })
            );
          }

          return new TableRow({ children: cells });
        });

        elements.push(
          new Table({
            width: { size: 9000, type: WidthType.DXA },
            rows: tableRows,
          })
        );
        break;
      }

      case "empty":
        // Skip empty lines (they just create spacing)
        break;
    }
  }

  return elements;
}

// ─── POST Handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { markdown } = body;

    if (!markdown || typeof markdown !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'markdown' field. Expected a string." },
        { status: 400 }
      );
    }

    if (markdown.length > 10000) {
      return NextResponse.json(
        { error: "Markdown content exceeds the 10,000 character limit." },
        { status: 400 }
      );
    }

    // Parse markdown into blocks
    const blocks = parseMarkdownBlocks(markdown);

    // Build docx elements
    const docxElements = buildDocxElements(blocks);

    // Create the Word document
    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "ordered-list",
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: "%1.",
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.25),
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(1),
                right: convertInchesToTwip(1),
                bottom: convertInchesToTwip(1),
                left: convertInchesToTwip(1),
              },
            },
          },
          children: docxElements,
        },
      ],
    });

    // Generate the buffer and convert to Uint8Array for NextResponse compatibility
    const buffer = await Packer.toBuffer(doc);
    const uint8 = new Uint8Array(buffer);

    // Return as downloadable .docx
    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="docmd-output.docx"',
        "Content-Length": buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "Failed to convert markdown to Word document. Please try again." },
      { status: 500 }
    );
  }
}
