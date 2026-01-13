import { notFound } from "next/navigation";
import { RankingDetail } from "../../../../../components/RankingDetail";
import { rankings, getRankingBySlug, rankingYears, type RankingYear } from "../../../../../data/rankings";
import {
  buildBreadcrumbs,
  buildFAQPage,
  buildItemList,
  buildMetadata,
  siteConfig
} from "../../../../../lib/seo";
import {
  getAvailableRegionsForRanking,
  isRankingYear
} from "../../../../../lib/ranking-segments";

export const generateStaticParams = () =>
  rankings.flatMap((ranking) =>
    rankingYears.map((year) => ({
      slug: ranking.slug,
      year: String(year)
    }))
  );

export const generateMetadata = async ({
  params
}: {
  params: { slug: string; year: string };
}) => {
  const ranking = getRankingBySlug(params.slug);
  if (!ranking || !isRankingYear(params.year)) return {};

  const title = `${ranking.title} ${params.year} | Rankings del Mundo`;
  const description = `Edición ${params.year} del ranking ${ranking.title}, con la misma metodología y contexto editorial.`;
  const path = `/ranking/${ranking.slug}/anio/${params.year}`;

  return buildMetadata({ title, description, path });
};

export default function RankingYearPage({
  params
}: {
  params: { slug: string; year: string };
}) {
  const ranking = getRankingBySlug(params.slug);

  if (!ranking || !isRankingYear(params.year)) {
    notFound();
  }

  const year = Number(params.year) as RankingYear;
  const title = `${ranking.title} ${year}`;
  const description = `Consulta la edición ${year} del ranking ${ranking.title} con el mismo marco metodológico.`;
  const intro = [
    `Esta versión resume el ranking base en su edición ${year}.`,
    "Úsala para comparar tendencias a lo largo del tiempo.",
    "Los indicadores y la metodología se mantienen consistentes con la edición principal."
  ];

  const availableRegions = getAvailableRegionsForRanking(ranking);
  const related = rankings.filter((item) => ranking.related.includes(item.slug));

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Rankings", url: `${siteConfig.url}/rankings` },
    { name: ranking.title, url: `${siteConfig.url}/ranking/${ranking.slug}` },
    { name: String(year), url: `${siteConfig.url}/ranking/${ranking.slug}/anio/${year}` }
  ]);

  const faqSchema = buildFAQPage(ranking.faq);
  const itemListSchema = buildItemList({ ...ranking, title, items: ranking.items });

  return (
    <>
      <RankingDetail
        ranking={ranking}
        items={ranking.items}
        title={title}
        description={description}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rankings", href: "/rankings" },
          { label: ranking.title, href: `/ranking/${ranking.slug}` },
          { label: String(year), href: `/ranking/${ranking.slug}/anio/${year}` }
        ]}
        related={related}
        segmentIntro={intro}
        segmentNote="Esta página segmenta el ranking base por año de referencia."
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
