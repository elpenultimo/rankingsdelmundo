import { notFound } from "next/navigation";
import { RankingTemplate } from "../../../../../../../components/RankingTemplate";
import { TrackView } from "../../../../../../../components/TrackView";
import { rankings, getRankingBySlug } from "../../../../../../../data/rankings";
import {
  buildBreadcrumbs,
  buildFAQPage,
  buildItemList,
  buildMetadata,
  siteConfig
} from "../../../../../../../lib/seo";
import {
  buildMethodologyNote,
  buildSegmentDescription,
  buildSegmentIntro,
  buildSegmentTitle,
  filterItemsByRegion
} from "../../../../../../../lib/rankingSegments";
import { regionLabels } from "../../../../../../../lib/regions";
import { isRankingRegion, isRankingYear, rankingYears, regionKeys } from "../../../../../../../data/taxonomy";
import { buildRankingMetricSlug } from "../../../../../../../lib/metrics/utils";

export const generateStaticParams = () =>
  rankings.flatMap((ranking) =>
    regionKeys.flatMap((region) =>
      rankingYears.map((year) => ({
        slug: ranking.slug,
        region,
        year
      }))
    )
  );

export const generateMetadata = async ({
  params
}: {
  params: { slug: string; region: string; year: string };
}) => {
  if (!isRankingRegion(params.region) || !isRankingYear(params.year)) return {};
  const ranking = getRankingBySlug(params.slug);
  if (!ranking) return {};

  const title = buildSegmentTitle({
    ranking,
    region: params.region,
    year: params.year
  });
  const description = buildSegmentDescription({
    ranking,
    region: params.region,
    year: params.year
  });

  return buildMetadata({
    title: `${title} | Rankings del Mundo`,
    description,
    path: `/ranking/${ranking.slug}/region/${params.region}/anio/${params.year}`
  });
};

export default function RankingRegionYearPage({
  params
}: {
  params: { slug: string; region: string; year: string };
}) {
  if (!isRankingRegion(params.region) || !isRankingYear(params.year)) {
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
    },
    {
      name: `Edición ${params.year}`,
      url: `${siteConfig.url}/ranking/${ranking.slug}/region/${params.region}/anio/${params.year}`
    }
  ]);

  const faqSchema = buildFAQPage(ranking.faq);
  const itemListSchema = buildItemList(ranking, {
    name: buildSegmentTitle({ ranking, region: params.region, year: params.year }),
    items
  });

  return (
    <>
      <TrackView
        scope="ranking"
        slug={buildRankingMetricSlug({
          slug: ranking.slug,
          region: params.region,
          year: params.year
        })}
      />
      <RankingTemplate
        ranking={ranking}
        items={items}
        pageTitle={buildSegmentTitle({ ranking, region: params.region, year: params.year })}
        description={buildSegmentDescription({
          ranking,
          region: params.region,
          year: params.year
        })}
        introLines={buildSegmentIntro({ region: params.region, year: params.year })}
        methodologyNote={buildMethodologyNote({ ranking, year: params.year })}
        related={related}
        breadcrumbs={breadcrumbs}
        faqSchema={faqSchema}
        itemListSchema={itemListSchema}
      />
    </>
  );
}
