import { notFound } from "next/navigation";
import { RankingDetail } from "../../../components/RankingDetail";
import { rankings, getRankingBySlug, rankingYears, type RankingYear } from "../../../data/rankings";
import { regions, type RegionKey } from "../../../data/geo";
import {
  buildBreadcrumbs,
  buildFAQPage,
  buildItemList,
  buildRankingMetadata,
  siteConfig
} from "../../../lib/seo";
import {
  getAvailableRegionsForRanking,
  getItemsForRegion,
  isRankingRegion,
  isRankingYear
} from "../../../lib/ranking-segments";

export const generateStaticParams = () => rankings.map((ranking) => ({ slug: ranking.slug }));

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const ranking = getRankingBySlug(params.slug);
  if (!ranking) return {};
  return buildRankingMetadata(ranking);
};

export default function RankingPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams?: { region?: string; year?: string };
}) {
  const ranking = getRankingBySlug(params.slug);

  if (!ranking) {
    notFound();
  }

  const related = rankings.filter((item) => ranking.related.includes(item.slug));
  const availableRegions = getAvailableRegionsForRanking(ranking);
  const regionParam = searchParams?.region ?? "";
  const yearParam = searchParams?.year ?? "";
  const activeRegion = isRankingRegion(regionParam)
    ? (regionParam as RegionKey)
    : undefined;
  const activeYear = isRankingYear(yearParam)
    ? (Number(yearParam) as RankingYear)
    : undefined;
  const resolvedRegion = activeRegion && availableRegions.includes(activeRegion) ? activeRegion : undefined;
  const regionLabel = resolvedRegion
    ? regions.find((item) => item.key === resolvedRegion)?.label ?? resolvedRegion
    : undefined;
  const items = resolvedRegion ? getItemsForRegion(ranking, resolvedRegion) : ranking.items;
  const segmentIntro =
    resolvedRegion || activeYear
      ? [
          resolvedRegion && activeYear
            ? `Vista segmentada del ranking base para ${regionLabel} en ${activeYear}.`
            : resolvedRegion
              ? `Vista segmentada del ranking base para ${regionLabel}.`
              : `Vista segmentada del ranking base para la edición ${activeYear}.`,
          "La metodología es la misma que en la edición principal."
        ]
      : undefined;

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Rankings", url: `${siteConfig.url}/rankings` },
    { name: ranking.title, url: `${siteConfig.url}/ranking/${ranking.slug}` }
  ]);

  const faqSchema = buildFAQPage(ranking.faq);
  const itemListSchema = buildItemList({ ...ranking, items });

  return (
    <>
      <RankingDetail
        ranking={ranking}
        items={items}
        title={ranking.title}
        description={ranking.description}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rankings", href: "/rankings" },
          { label: ranking.title, href: `/ranking/${ranking.slug}` }
        ]}
        related={related}
        segmentIntro={segmentIntro}
        segmentNote={
          segmentIntro ? "Esta vista segmenta el ranking base según los filtros seleccionados." : undefined
        }
        activeRegion={resolvedRegion}
        activeYear={activeYear}
        availableRegions={availableRegions}
        availableYears={[...rankingYears]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
