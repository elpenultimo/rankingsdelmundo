import type { MetadataRoute } from "next";
import { getEntities } from "../data/entities";
import { rankings } from "../data/rankings";
import { rankingYears, regionKeys } from "../data/taxonomy";
import { categoryKeys } from "../lib/categories";
import { buildComparePairs, getTopCities, getTopCountries } from "../lib/compare";
import { siteConfig } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const staticRoutes = [
    "/",
    "/rankings",
    "/paises",
    "/ciudades",
    "/comparar",
    "/categorias"
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

  const compareCountryRoutes = buildComparePairs(getTopCountries(20), 190).map((slug) => ({
    url: `${baseUrl}/comparar/pais/${slug}`,
    lastModified: new Date()
  }));

  const compareCityRoutes = buildComparePairs(getTopCities(15), 105).map((slug) => ({
    url: `${baseUrl}/comparar/ciudad/${slug}`,
    lastModified: new Date()
  }));

  return [
    ...staticRoutes,
    ...rankingRoutes,
    ...rankingRegionRoutes,
    ...rankingYearRoutes,
    ...rankingRegionYearRoutes,
    ...categoryRoutes,
    ...countryRoutes,
    ...cityRoutes,
    ...compareCountryRoutes,
    ...compareCityRoutes
  ];
}
