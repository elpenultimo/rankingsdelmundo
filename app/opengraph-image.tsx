import { ImageResponse } from "next/og";
import { ogCategoryChips, ogTheme, safeText } from "../lib/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: ogTheme.colors.background,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: "48px"
        }}
      >
        <div
          style={{
            backgroundColor: ogTheme.colors.card,
            borderRadius: ogTheme.layout.radius,
            border: `1px solid ${ogTheme.colors.border}`,
            width: "100%",
            height: "100%",
            padding: ogTheme.layout.padding,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "54px",
                fontWeight: 700,
                color: ogTheme.colors.title,
                lineHeight: 1.1
              }}
            >
              {safeText("Rankings del Mundo", 48)}
            </div>
            <div
              style={{
                fontSize: "28px",
                color: ogTheme.colors.muted,
                lineHeight: 1.3
              }}
            >
              {safeText("Rankings, comparaciones y tablas en español", 80)}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {ogCategoryChips.map((chip) => (
                <span
                  key={chip.key}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "999px",
                    fontSize: "18px",
                    fontWeight: 600,
                    backgroundColor: chip.colors.bg,
                    color: chip.colors.text,
                    border: `1px solid ${ogTheme.colors.chipBorder}`
                  }}
                >
                  {chip.label}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: ogTheme.colors.muted,
                fontSize: "18px"
              }}
            >
              <span style={{ fontWeight: 600 }}>Rankings del Mundo</span>
              <span>rankingsdelmundo.com</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height
    }
  );
}
