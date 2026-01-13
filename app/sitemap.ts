import type { MetadataRoute } from "next";
import { rankings, rankingYears } from "../data/rankings";
import { siteConfig } from "../lib/seo";
import { getAvailableRegionsForRanking } from "../lib/ranking-segments";
import { getEntities } from "../lib/entities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const staticRoutes = ["/", "/rankings", "/paises", "/ciudades"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  const rankingBaseRoutes = rankings.map((ranking) => ({
    url: `${baseUrl}/ranking/${ranking.slug}`,
    lastModified: new Date(ranking.updatedAt)
  }));

  const rankingRegionRoutes = rankings.flatMap((ranking) =>
    getAvailableRegionsForRanking(ranking).map((region) => ({
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
    getAvailableRegionsForRanking(ranking).flatMap((region) =>
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

  return [
    ...staticRoutes,
    ...rankingBaseRoutes,
    ...rankingRegionRoutes,
    ...rankingYearRoutes,
    ...rankingRegionYearRoutes,
    ...countryRoutes,
    ...cityRoutes
  ];
}
