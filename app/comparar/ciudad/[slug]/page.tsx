import { notFound } from "next/navigation";
import { CompareDetail, type ComparisonRow } from "../../../../components/CompareDetail";
import { getEntityBySlug } from "../../../../data/entities";
import { rankings } from "../../../../data/rankings";
import {
  buildCompareItemListSchema,
  buildCompareIntro,
  buildCompareSummary,
  compareFaq
} from "../../../../lib/compare-content";
import {
  buildComparePairs,
  getComparableMetricsForCity,
  getTopCities,
  metricPreferences
} from "../../../../lib/compare";
import { buildBreadcrumbs, buildFAQPage, buildMetadata, siteConfig } from "../../../../lib/seo";

const parseCompareSlug = (slug: string) => {
  const [aSlug, bSlug] = slug.split("-vs-");
  if (!aSlug || !bSlug) return null;
  return { aSlug, bSlug };
};

const buildComparisonRows = (
  metricsA: ReturnType<typeof getComparableMetricsForCity>,
  metricsB: ReturnType<typeof getComparableMetricsForCity>
): ComparisonRow[] => {
  const map = new Map<string, ComparisonRow>();
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

export const generateStaticParams = () => {
  const topCities = getTopCities(15);
  return buildComparePairs(topCities, 105).map((slug) => ({ slug }));
};

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const parsed = parseCompareSlug(params.slug);
  if (!parsed) return {};
  const entityA = getEntityBySlug("ciudad", parsed.aSlug);
  const entityB = getEntityBySlug("ciudad", parsed.bSlug);
  if (!entityA || !entityB) return {};

  const metrics = buildComparisonRows(
    getComparableMetricsForCity(entityA.name),
    getComparableMetricsForCity(entityB.name)
  );

  const metricsCount = metrics.length || 0;

  return buildMetadata({
    title: `${entityA.name} vs ${entityB.name}: comparación en ${metricsCount} métricas (2026)`,
    description: `Compara ${entityA.name} vs ${entityB.name} en costo de vida, seguridad, calidad de vida y más. Índices referenciales 2026 para decidir.`,
    path: `/comparar/ciudad/${entityA.slug}-vs-${entityB.slug}`
  });
};

export default function CityComparePage({ params }: { params: { slug: string } }) {
  const parsed = parseCompareSlug(params.slug);
  if (!parsed) {
    notFound();
  }

  const entityA = getEntityBySlug("ciudad", parsed.aSlug);
  const entityB = getEntityBySlug("ciudad", parsed.bSlug);
  if (!entityA || !entityB) {
    notFound();
  }

  const rows = buildComparisonRows(
    getComparableMetricsForCity(entityA.name),
    getComparableMetricsForCity(entityB.name)
  );

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Comparar", url: `${siteConfig.url}/comparar` },
    {
      name: `${entityA.name} vs ${entityB.name}`,
      url: `${siteConfig.url}/comparar/ciudad/${entityA.slug}-vs-${entityB.slug}`
    }
  ]);

  const introText = buildCompareIntro(entityA.name, entityB.name, rows);
  const summaryText = buildCompareSummary(entityA.name, entityB.name, rows);

  const relatedRankings = rankings
    .filter((ranking) => ranking.category === "ciudades")
    .filter(
      (ranking) =>
        !entityA.rankings.find((entry) => entry.slug === ranking.slug) &&
        !entityB.rankings.find((entry) => entry.slug === ranking.slug)
    )
    .slice(0, 6);

  const itemListSchema = buildCompareItemListSchema(entityA.name, entityB.name, rows);
  const faqSchema = buildFAQPage(compareFaq);

  return (
    <CompareDetail
      entityTypeLabel="Ciudad"
      entityA={entityA}
      entityB={entityB}
      introText={introText}
      summaryText={summaryText}
      rows={rows}
      rankingsA={entityA.rankings}
      rankingsB={entityB.rankings}
      relatedRankings={relatedRankings}
      faq={compareFaq}
      breadcrumbs={breadcrumbs}
      faqSchema={faqSchema}
      itemListSchema={itemListSchema}
    />
  );
}
