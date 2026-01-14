import { notFound } from "next/navigation";
import { RankingTemplate } from "../../../components/RankingTemplate";
import { rankings, getRankingBySlug } from "../../../data/rankings";
import {
  buildBreadcrumbs,
  buildFAQPage,
  buildItemList,
  buildRankingMetadata,
  siteConfig
} from "../../../lib/seo";
import { getTopicsForRanking } from "../../../lib/topic-discovery";
import { topics } from "../../../lib/topics";

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const ranking = getRankingBySlug(params.slug);
  if (!ranking) return {};
  return buildRankingMetadata(ranking);
};

export default function RankingPage({ params }: { params: { slug: string } }) {
  const ranking = getRankingBySlug(params.slug);

  if (!ranking) {
    notFound();
  }

  const related = rankings.filter((item) => ranking.related.includes(item.slug));
  const relatedTopics = getTopicsForRanking(ranking, 3).map((key) => ({
    key,
    label: topics[key].label
  }));

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Rankings", url: `${siteConfig.url}/rankings` },
    { name: ranking.title, url: `${siteConfig.url}/ranking/${ranking.slug}` }
  ]);

  const faqSchema = buildFAQPage(ranking.faq);
  const itemListSchema = buildItemList(ranking);

  return (
    <RankingTemplate
      ranking={ranking}
      items={ranking.items}
      pageTitle={ranking.title}
      description={ranking.description}
      related={related}
      relatedTopics={relatedTopics}
      breadcrumbs={breadcrumbs}
      faqSchema={faqSchema}
      itemListSchema={itemListSchema}
    />
  );
}
