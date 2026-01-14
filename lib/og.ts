import type { CategoryKey, RegionKey } from "../data/taxonomy";
import { categories } from "../data/rankings";
import { regionLabels } from "./regions";

export const ogTheme = {
  colors: {
    background: "#f3f4f6",
    card: "#ffffff",
    border: "#e5e7eb",
    title: "#0f172a",
    text: "#1f2937",
    muted: "#475569",
    chipBorder: "#e2e8f0",
    accent: "#2563eb"
  },
  layout: {
    radius: "32px",
    padding: "44px"
  }
};

const categoryColors: Record<CategoryKey, { bg: string; text: string }> = {
  paises: { bg: "#dbeafe", text: "#1d4ed8" },
  ciudades: { bg: "#dcfce7", text: "#15803d" },
  dinero: { bg: "#fef3c7", text: "#b45309" },
  clima: { bg: "#cffafe", text: "#0e7490" },
  vida: { bg: "#fae8ff", text: "#a21caf" }
};

const categoryLabelMap = new Map(categories.map((category) => [category.key, category.label]));

export const getCategoryLabel = (category: CategoryKey) =>
  categoryLabelMap.get(category) ?? category;

export const formatRegionLabel = (regionKey: RegionKey) =>
  regionLabels[regionKey] ?? regionKey;

export type CompareMetricRow = {
  key: string;
  label: string;
  aValue?: number | string;
  bValue?: number | string;
};

export const pickTopCompareMetrics = (metrics: CompareMetricRow[], n = 3) =>
  metrics.filter((metric) => metric.aValue !== undefined && metric.bValue !== undefined).slice(0, n);

export const safeText = (text: string, maxLength = 88) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
};

export const ogCategoryChips = categories.map((category) => ({
  key: category.key,
  label: category.label,
  colors: categoryColors[category.key] ?? { bg: "#e2e8f0", text: "#334155" }
}));
