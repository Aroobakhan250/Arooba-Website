import type { MetadataRoute } from "next";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    ...PROJECTS_DATA.map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
