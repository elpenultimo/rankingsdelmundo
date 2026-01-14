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
  buildSegmentTitle,
  filterItemsByRegion
} from "../../../../../lib/rankingSegments";
import { regionLabels } from "../../../../../lib/regions";
import { isRankingRegion, regionKeys } from "../../../../../data/taxonomy";

export const generateStaticParams = () =>
  rankings.flatMap((ranking) =>
    regionKeys.map((region) => ({
      slug: ranking.slug,
      region
    }))
  );

export const generateMetadata = async ({
  params
}: {
  params: { slug: string; region: string };
}) => {
  if (!isRankingRegion(params.region)) return {};
  const ranking = getRankingBySlug(params.slug);
  if (!ranking) return {};

  const title = buildSegmentTitle({ ranking, region: params.region });
  const description = buildSegmentDescription({ ranking, region: params.region });

  return buildMetadata({
    title: `${title} | Rankings del Mundo`,
    description,
    path: `/ranking/${ranking.slug}/region/${params.region}`
  });
};

export default function RankingRegionPage({
  params
}: {
  params: { slug: string; region: string };
}) {
  if (!isRankingRegion(params.region)) {
    notFound();
  }

  const ranking = getRankingBySlug(params.slug);
  if (!ranking) {
    notFound();
  }

  const related = rankings.filter((item) => ranking.related.includes(item.slug));
  const items = filterItemsByRegion(ranking, params.region);

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Rankings", url: `${siteConfig.url}/rankings` },
    { name: ranking.title, url: `${siteConfig.url}/ranking/${ranking.slug}` },
    {
      name: regionLabels[params.region],
      url: `${siteConfig.url}/ranking/${ranking.slug}/region/${params.region}`
    }
  ]);

  const faqSchema = buildFAQPage(ranking.faq);
  const itemListSchema = buildItemList(ranking, {
    name: buildSegmentTitle({ ranking, region: params.region }),
    items
  });

  return (
    <RankingTemplate
      ranking={ranking}
      items={items}
      pageTitle={buildSegmentTitle({ ranking, region: params.region })}
      description={buildSegmentDescription({ ranking, region: params.region })}
      introLines={buildSegmentIntro({ region: params.region })}
      methodologyNote={buildMethodologyNote({ ranking })}
      related={related}
      breadcrumbs={breadcrumbs}
      faqSchema={faqSchema}
      itemListSchema={itemListSchema}
    />
  );
}
