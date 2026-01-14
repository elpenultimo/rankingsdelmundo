import { getTopMetrics, metricPreferences, type Metric } from "./compare";

export type EmbedComparisonRow = {
  key: string;
  label: string;
  aValue?: number | string;
  bValue?: number | string;
  betterWhen?: "lower" | "higher";
};

export const buildEmbedComparisonRows = (
  metricsA: Metric[],
  metricsB: Metric[]
): EmbedComparisonRow[] => {
  const map = new Map<string, EmbedComparisonRow>();
  metricsA.forEach((metric) => {
    map.set(metric.key, {
      key: metric.key,
      label: metric.label,
      aValue: metric.value,
      betterWhen: metricPreferences[metric.key]
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
      bValue: metric.value,
      betterWhen: metricPreferences[metric.key]
    });
  });

  return Array.from(map.values());
};

export const selectEmbedRows = (
  metricsA: Metric[],
  metricsB: Metric[],
  limit: number,
  preferredKeys: string[]
) => {
  const rows = buildEmbedComparisonRows(metricsA, metricsB);
  const rowMap = new Map(rows.map((row) => [row.key, row]));
  const topMetrics = getTopMetrics([...metricsA, ...metricsB], limit, preferredKeys);
  return topMetrics.map((metric) => rowMap.get(metric.key)).filter(Boolean) as EmbedComparisonRow[];
};
