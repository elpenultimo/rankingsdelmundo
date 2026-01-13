import type { MetadataRoute } from "next";
import { rankings } from "../data/rankings";
import { siteConfig } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const staticRoutes = ["/", "/rankings"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  const rankingRoutes = rankings.map((ranking) => ({
    url: `${baseUrl}/ranking/${ranking.slug}`,
    lastModified: new Date(ranking.updatedAt)
  }));

  return [...staticRoutes, ...rankingRoutes];
}
