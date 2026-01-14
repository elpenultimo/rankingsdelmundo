import { notFound } from "next/navigation";
import { RankingTemplate } from "../../../../../components/RankingTemplate";
import { rankings, getRankingBySlug } from "../../../../../data/rankings";
import {
  buildBreadcrumbs,
  buildFAQPage,
  buildItemList,
  buildMetadata,
  siteConfig
} from "../../../../../lib/seo";
import {
  buildMethodologyNote,
  buildSegmentDescription,
  buildSegmentIntro,
  buildSegmentTitle
} from "../../../../../lib/rankingSegments";
import { isRankingYear, rankingYears } from "../../../../../data/taxonomy";

export const generateStaticParams = () =>
  rankings.flatMap((ranking) =>
    rankingYears.map((year) => ({
      slug: ranking.slug,
      year
    }))
  );

export const generateMetadata = async ({
  params
}: {
  params: { slug: string; year: string };
}) => {
  if (!isRankingYear(params.year)) return {};
  const ranking = getRankingBySlug(params.slug);
  if (!ranking) return {};

  const title = buildSegmentTitle({ ranking, year: params.year });
  const description = buildSegmentDescription({ ranking, year: params.year });

  return buildMetadata({
    title: `${title} | Rankings del Mundo`,
    description,
    path: `/ranking/${ranking.slug}/anio/${params.year}`
  });
};

export default function RankingYearPage({
  params
}: {
  params: { slug: string; year: string };
}) {
  if (!isRankingYear(params.year)) {
    notFound();
  }

  const ranking = getRankingBySlug(params.slug);
  if (!ranking) {
    notFound();
  }

  const related = rankings.filter((item) => ranking.related.includes(item.slug));

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Rankings", url: `${siteConfig.url}/rankings` },
    { name: ranking.title, url: `${siteConfig.url}/ranking/${ranking.slug}` },
    {
      name: `Edición ${params.year}`,
      url: `${siteConfig.url}/ranking/${ranking.slug}/anio/${params.year}`
    }
  ]);

  const faqSchema = buildFAQPage(ranking.faq);
  const itemListSchema = buildItemList(ranking, {
    name: buildSegmentTitle({ ranking, year: params.year })
  });

  return (
    <RankingTemplate
      ranking={ranking}
      items={ranking.items}
      pageTitle={buildSegmentTitle({ ranking, year: params.year })}
      description={buildSegmentDescription({ ranking, year: params.year })}
      introLines={buildSegmentIntro({ year: params.year })}
      methodologyNote={buildMethodologyNote({ ranking, year: params.year })}
      related={related}
      breadcrumbs={breadcrumbs}
      faqSchema={faqSchema}
      itemListSchema={itemListSchema}
    />
  );
}
