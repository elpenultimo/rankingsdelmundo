import { notFound } from "next/navigation";
import { RankingDetail } from "../../../../../../../components/RankingDetail";
import { rankings, getRankingBySlug, rankingYears, type RankingYear } from "../../../../../../../data/rankings";
import { regions, type RegionKey } from "../../../../../../../data/geo";
import {
  buildBreadcrumbs,
  buildFAQPage,
  buildItemList,
  buildMetadata,
  siteConfig
} from "../../../../../../../lib/seo";
import {
  getAvailableRegionsForRanking,
  getItemsForRegion,
  isRankingRegion,
  isRankingYear
} from "../../../../../../../lib/ranking-segments";

export const generateStaticParams = () =>
  rankings.flatMap((ranking) =>
    getAvailableRegionsForRanking(ranking).flatMap((region) =>
      rankingYears.map((year) => ({
        slug: ranking.slug,
        region,
        year: String(year)
      }))
    )
  );

export const generateMetadata = async ({
  params
}: {
  params: { slug: string; region: string; year: string };
}) => {
  const ranking = getRankingBySlug(params.slug);
  if (!ranking || !isRankingRegion(params.region) || !isRankingYear(params.year)) return {};

  const label = regions.find((item) => item.key === params.region)?.label ?? params.region;
  const title = `${ranking.title} en ${label} ${params.year} | Rankings del Mundo`;
  const description = `Edición ${params.year} del ranking ${ranking.title} para ${label}, con el mismo enfoque metodológico.`;
  const path = `/ranking/${ranking.slug}/region/${params.region}/anio/${params.year}`;

  return buildMetadata({ title, description, path });
};

export default function RankingRegionYearPage({
  params
}: {
  params: { slug: string; region: string; year: string };
}) {
  const ranking = getRankingBySlug(params.slug);

  if (!ranking || !isRankingRegion(params.region) || !isRankingYear(params.year)) {
    notFound();
  }

  const availableRegions = getAvailableRegionsForRanking(ranking);
  const region = params.region as RegionKey;

  if (!availableRegions.includes(region)) {
    notFound();
  }

  const year = Number(params.year) as RankingYear;
  const label = regions.find((item) => item.key === region)?.label ?? region;
  const items = getItemsForRegion(ranking, region);

  if (items.length === 0) {
    notFound();
  }

  const title = `${ranking.title} en ${label} ${year}`;
  const description = `Consulta la edición ${year} del ranking ${ranking.title} enfocada en ${label}.`;
  const intro = [
    `Este recorte combina región (${label}) y año (${year}).`,
    "Permite comparar resultados regionales dentro de la edición seleccionada.",
    "La metodología es la misma que en el ranking base."
  ];

  const related = rankings.filter((item) => ranking.related.includes(item.slug));

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Rankings", url: `${siteConfig.url}/rankings` },
    { name: ranking.title, url: `${siteConfig.url}/ranking/${ranking.slug}` },
    { name: label, url: `${siteConfig.url}/ranking/${ranking.slug}/region/${region}` },
    { name: String(year), url: `${siteConfig.url}/ranking/${ranking.slug}/region/${region}/anio/${year}` }
  ]);

  const faqSchema = buildFAQPage(ranking.faq);
  const itemListSchema = buildItemList({ ...ranking, title, items });

  return (
    <>
      <RankingDetail
        ranking={ranking}
        items={items}
        title={title}
        description={description}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rankings", href: "/rankings" },
          { label: ranking.title, href: `/ranking/${ranking.slug}` },
          { label, href: `/ranking/${ranking.slug}/region/${region}` },
          { label: String(year), href: `/ranking/${ranking.slug}/region/${region}/anio/${year}` }
        ]}
        related={related}
        segmentIntro={intro}
        segmentNote="Esta página segmenta el ranking base por región y año de referencia."
        activeRegion={region}
        activeYear={year}
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
