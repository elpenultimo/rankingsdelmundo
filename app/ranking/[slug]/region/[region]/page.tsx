import { notFound } from "next/navigation";
import { RankingDetail } from "../../../../../components/RankingDetail";
import { rankings, getRankingBySlug, rankingYears } from "../../../../../data/rankings";
import { regions, type RegionKey } from "../../../../../data/geo";
import {
  buildBreadcrumbs,
  buildFAQPage,
  buildItemList,
  buildMetadata,
  siteConfig
} from "../../../../../lib/seo";
import {
  getAvailableRegionsForRanking,
  getItemsForRegion,
  isRankingRegion
} from "../../../../../lib/ranking-segments";

export const generateStaticParams = () =>
  rankings.flatMap((ranking) =>
    getAvailableRegionsForRanking(ranking).map((region) => ({
      slug: ranking.slug,
      region
    }))
  );

export const generateMetadata = async ({
  params
}: {
  params: { slug: string; region: string };
}) => {
  const ranking = getRankingBySlug(params.slug);
  if (!ranking || !isRankingRegion(params.region)) return {};

  const label = regions.find((item) => item.key === params.region)?.label ?? params.region;
  const title = `${ranking.title} en ${label} | Rankings del Mundo`;
  const description = `Versión regional del ranking ${ranking.title}, enfocada en ${label}. Edición ${ranking.year} con la misma metodología base.`;
  const path = `/ranking/${ranking.slug}/region/${params.region}`;

  return buildMetadata({ title, description, path });
};

export default function RankingRegionPage({
  params
}: {
  params: { slug: string; region: string };
}) {
  const ranking = getRankingBySlug(params.slug);

  if (!ranking || !isRankingRegion(params.region)) {
    notFound();
  }

  const availableRegions = getAvailableRegionsForRanking(ranking);
  const region = params.region as RegionKey;

  if (!availableRegions.includes(region)) {
    notFound();
  }

  const label = regions.find((item) => item.key === region)?.label ?? region;
  const items = getItemsForRegion(ranking, region);

  if (items.length === 0) {
    notFound();
  }

  const title = `${ranking.title} en ${label}`;
  const description = `Consulta el recorte regional del ranking ${ranking.title} para comparar países de ${label}.`;

  const intro = [
    `Este recorte muestra los países de ${label} que aparecen en el ranking base.`,
    "Úsalo para identificar líderes regionales y tendencias locales.",
    `Edición ${ranking.year} basada en la metodología original.`
  ];

  const related = rankings.filter((item) => ranking.related.includes(item.slug));

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Rankings", url: `${siteConfig.url}/rankings` },
    { name: ranking.title, url: `${siteConfig.url}/ranking/${ranking.slug}` },
    { name: label, url: `${siteConfig.url}/ranking/${ranking.slug}/region/${region}` }
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
          { label, href: `/ranking/${ranking.slug}/region/${region}` }
        ]}
        related={related}
        segmentIntro={intro}
        segmentNote="Esta página segmenta el ranking base por región geográfica."
        activeRegion={region}
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
