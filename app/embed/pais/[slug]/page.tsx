import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmbedCompare } from "../../../../components/EmbedCompare";
import { EmbedThemeController, type EmbedTheme } from "../../../../components/EmbedThemeController";
import { getEntityBySlug } from "../../../../data/entities";
import { getComparableMetricsForCountry } from "../../../../lib/compare";
import { selectEmbedRows } from "../../../../lib/embed";
import { siteConfig } from "../../../../lib/seo";
import { buildCompareDetailPath, parseCompareSlug } from "../../../../lib/url";

const preferredKeys = [
  "costo-de-vida",
  "seguridad",
  "calidad-de-vida",
  "clima",
  "impuestos",
  "poder-adquisitivo"
];

const parseVariant = (value?: string | null) =>
  value === "compact" || value === "full" ? value : "full";

const parseTheme = (value?: string | null): EmbedTheme =>
  value === "light" || value === "dark" || value === "auto" ? value : "auto";

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const parsed = parseCompareSlug(params.slug);
  if (!parsed) {
    return {
      robots: { index: false, follow: false }
    };
  }
  const entityA = getEntityBySlug("pais", parsed.aSlug);
  const entityB = getEntityBySlug("pais", parsed.bSlug);
  if (!entityA || !entityB) {
    return {
      robots: { index: false, follow: false }
    };
  }
  const canonical = buildCompareDetailPath("pais", entityA.slug, entityB.slug);
  return {
    title: `${entityA.name} vs ${entityB.name} (embed)`,
    description: `Comparación rápida de ${entityA.name} vs ${entityB.name} para embeber en tu sitio.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${siteConfig.url}${canonical}`
    }
  };
};

export default function EmbedCountryComparePage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams?: { variant?: string; theme?: string };
}) {
  const parsed = parseCompareSlug(params.slug);
  if (!parsed) {
    notFound();
  }

  const entityA = getEntityBySlug("pais", parsed.aSlug);
  const entityB = getEntityBySlug("pais", parsed.bSlug);
  if (!entityA || !entityB) {
    notFound();
  }

  const variant = parseVariant(searchParams?.variant);
  const theme = parseTheme(searchParams?.theme);
  const limit = variant === "compact" ? 4 : 8;

  const rows = selectEmbedRows(
    getComparableMetricsForCountry(entityA.name),
    getComparableMetricsForCountry(entityB.name),
    limit,
    preferredKeys
  );

  return (
    <div className="px-4 py-6">
      <EmbedThemeController theme={theme} />
      <EmbedCompare
        entityA={entityA}
        entityB={entityB}
        rows={rows}
        variant={variant}
        compareUrl={buildCompareDetailPath("pais", entityA.slug, entityB.slug)}
      />
    </div>
  );
}
