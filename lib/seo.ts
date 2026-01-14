import type { Metadata } from "next";
import type { Ranking, RankingItem } from "../data/rankings";

export const siteConfig = {
  name: "Rankings del Mundo",
  description:
    "Rankings globales en español con comparativas claras sobre países, ciudades, clima, dinero y calidad de vida.",
  url: "https://rankingsdelmundo.com",
  twitterHandle: "@rankingsdelmundo"
};

export const buildMetadata = (options: {
  title: string;
  description: string;
  path?: string;
}): Metadata => {
  const url = options.path ? `${siteConfig.url}${options.path}` : siteConfig.url;
  return {
    title: options.title,
    description: options.description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: options.title,
      description: options.description,
      type: "website",
      url,
      siteName: siteConfig.name
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      creator: siteConfig.twitterHandle
    }
  };
};

export const buildRankingMetadata = (ranking: Ranking): Metadata =>
  buildMetadata({
    title: `${ranking.title} | Rankings del Mundo`,
    description: ranking.description,
    path: `/ranking/${ranking.slug}`
  });

export const buildBreadcrumbs = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const buildFAQPage = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a
    }
  }))
});

export const buildItemList = (
  ranking: Ranking,
  options?: { name?: string; items?: RankingItem[] }
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: options?.name ?? ranking.title,
  itemListElement: (options?.items ?? ranking.items).map((item) => ({
    "@type": "ListItem",
    position: item.rank,
    name: item.name,
    description: item.note
  }))
});
