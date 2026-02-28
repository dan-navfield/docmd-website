import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DocMD — Markdown to Word, Powered by AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3B432F 0%, #4C573E 40%, #5E6B4E 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(250, 253, 153, 0.08)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(250, 253, 153, 0.06)",
            filter: "blur(60px)",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(250, 253, 153, 0.15)",
            marginBottom: 32,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            width="44"
            height="44"
            stroke="#FAFD99"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6" />
            <path d="M9 13h6" />
            <path d="M9 17h3" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Doc
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#FAFD99",
              letterSpacing: "-0.02em",
            }}
          >
            MD
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.6)",
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Markdown in. Word out. Perfectly styled.
        </p>

        {/* URL */}
        <p
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "rgba(255, 255, 255, 0.3)",
            letterSpacing: "0.05em",
          }}
        >
          mddoc.app
        </p>
      </div>
    ),
    { ...size }
  );
}
