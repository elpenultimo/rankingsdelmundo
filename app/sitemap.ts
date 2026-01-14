import type { MetadataRoute } from "next";
import { getEntities } from "../data/entities";
import { rankings } from "../data/rankings";
import { rankingYears, regionKeys } from "../data/taxonomy";
import { categoryKeys } from "../lib/categories";
import { getCuratedCompares, resolveCuratedCompare } from "../lib/curated-compares";
import { siteConfig } from "../lib/seo";
import { topicKeys } from "../lib/topics";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const staticRoutes = [
    "/",
    "/rankings",
    "/paises",
    "/ciudades",
    "/comparar",
    "/categorias",
    "/temas",
    "/metodologia"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  const categoryRoutes = categoryKeys.map((categoryKey) => ({
    url: `${baseUrl}/categoria/${categoryKey}`,
    lastModified: new Date()
  }));

  const rankingRoutes = rankings.map((ranking) => ({
    url: `${baseUrl}/ranking/${ranking.slug}`,
    lastModified: new Date(ranking.updatedAt)
  }));

  const topicRoutes = topicKeys.map((topicKey) => ({
    url: `${baseUrl}/tema/${topicKey}`,
    lastModified: new Date()
  }));

  const rankingRegionRoutes = rankings.flatMap((ranking) =>
    regionKeys.map((region) => ({
      url: `${baseUrl}/ranking/${ranking.slug}/region/${region}`,
      lastModified: new Date(ranking.updatedAt)
    }))
  );

  const rankingYearRoutes = rankings.flatMap((ranking) =>
    rankingYears.map((year) => ({
      url: `${baseUrl}/ranking/${ranking.slug}/anio/${year}`,
      lastModified: new Date(ranking.updatedAt)
    }))
  );

  const rankingRegionYearRoutes = rankings.flatMap((ranking) =>
    regionKeys.flatMap((region) =>
      rankingYears.map((year) => ({
        url: `${baseUrl}/ranking/${ranking.slug}/region/${region}/anio/${year}`,
        lastModified: new Date(ranking.updatedAt)
      }))
    )
  );

  const countryRoutes = getEntities("pais").map((entity) => ({
    url: `${baseUrl}/pais/${entity.slug}`,
    lastModified: new Date()
  }));

  const cityRoutes = getEntities("ciudad").map((entity) => ({
    url: `${baseUrl}/ciudad/${entity.slug}`,
    lastModified: new Date()
  }));

  const curatedCompareRoutes = getCuratedCompares()
    .map((compare) => resolveCuratedCompare(compare))
    .filter((compare): compare is NonNullable<typeof compare> => Boolean(compare))
    .map((compare) => ({
      url: `${baseUrl}${compare.href}`,
      lastModified: new Date()
    }));

  return [
    ...staticRoutes,
    ...rankingRoutes,
    ...rankingRegionRoutes,
    ...rankingYearRoutes,
    ...rankingRegionYearRoutes,
    ...topicRoutes,
    ...categoryRoutes,
    ...countryRoutes,
    ...cityRoutes,
    ...curatedCompareRoutes
  ];
}
