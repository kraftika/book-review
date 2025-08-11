import { getReviewSlugs, getAllTags } from "../lib/reviews";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const reviewSlugs = getReviewSlugs();
  const tagList = getAllTags();

  const routes = [
    "", // homepage
    ...reviewSlugs.map((slug) => `reviews/${slug}`),
    "tags",
    ...tagList.map((tag) => `tags/${encodeURIComponent(tag)}`),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString(),
  }));
}
