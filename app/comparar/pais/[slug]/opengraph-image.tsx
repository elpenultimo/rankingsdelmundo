import { ImageResponse } from "next/og";
import { getEntityBySlug } from "../../../../data/entities";
import {
  getComparableMetricsForCountry,
  type Metric
} from "../../../../lib/compare";
import {
  CompareMetricRow,
  ogCategoryChips,
  ogTheme,
  pickTopCompareMetrics,
  safeText
} from "../../../../lib/og";
import { parseCompareSlug } from "../../../../lib/url";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

const buildComparisonRows = (metricsA: Metric[], metricsB: Metric[]): CompareMetricRow[] => {
  const map = new Map<string, CompareMetricRow>();
  metricsA.forEach((metric) => {
    map.set(metric.key, {
      key: metric.key,
      label: metric.label,
      aValue: metric.value
    });
  });

  metricsB.forEach((metric) => {
    const existing = map.get(metric.key);
    if (existing) {
      existing.bValue = metric.value;
      return;
    }
    map.set(metric.key, {
      key: metric.key,
      label: metric.label,
      bValue: metric.value
    });
  });

  return Array.from(map.values());
};

const formatMetricValue = (value: number | string) =>
  typeof value === "number" ? value.toFixed(0) : value;

export default function OpenGraphImage({ params }: { params: { slug: string } }) {
  const parsed = parseCompareSlug(params.slug);
  const entityA = parsed ? getEntityBySlug("pais", parsed.aSlug) : undefined;
  const entityB = parsed ? getEntityBySlug("pais", parsed.bSlug) : undefined;

  const metricsA = entityA ? getComparableMetricsForCountry(entityA.name) : [];
  const metricsB = entityB ? getComparableMetricsForCountry(entityB.name) : [];
  const rows = buildComparisonRows(metricsA, metricsB);
  const topMetrics = pickTopCompareMetrics(rows, 3);
  const metricsCount = rows.length;

  const title = entityA && entityB ? `${entityA.name} vs ${entityB.name}` : "Comparación no disponible";
  const subtitle = entityA && entityB
    ? metricsCount > 0
      ? `Comparación en ${metricsCount} métricas: costo de vida, seguridad y más`
      : "Resumen comparativo disponible"
    : "Revisa el enlace compartido.";

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
                fontSize: "50px",
                fontWeight: 700,
                color: ogTheme.colors.title,
                lineHeight: 1.15
              }}
            >
              {safeText(title, 52)}
            </div>
            <div
              style={{
                fontSize: "24px",
                color: ogTheme.colors.muted,
                lineHeight: 1.3
              }}
            >
              {safeText(subtitle, 96)}
            </div>

            <div
              style={{
                borderRadius: "20px",
                backgroundColor: "#f8fafc",
                border: `1px solid ${ogTheme.colors.border}`,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              {topMetrics.length > 0 ? (
                topMetrics.map((metric) => (
                  <div
                    key={metric.key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "20px",
                      color: ogTheme.colors.text
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{safeText(metric.label, 32)}</span>
                    <span style={{ color: ogTheme.colors.muted }}>
                      {formatMetricValue(metric.aValue ?? "-")} vs {formatMetricValue(metric.bValue ?? "-")}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 600, color: ogTheme.colors.text }}>
                    Resumen
                  </span>
                  <span style={{ fontSize: "18px", color: ogTheme.colors.muted }}>
                    Comparación editorial disponible.
                  </span>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
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
    { width: size.width, height: size.height }
  );
}
