import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

const reviewsDirectory = path.join(process.cwd(), "content/reviews");

export type ReviewMetaBase = {
  slug: string;
  title: string;
  author: string;
  tags: string[];
};

export type ReviewMeta = ReviewMetaBase & {
  description?: string;
} & Record<string, unknown>;

export type Review = ReviewMeta & {
  source: MDXRemoteSerializeResult;
};

export function getReviewSlugs(): string[] {
  return fs
    .readdirSync(reviewsDirectory)
    .filter((file: string) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file: string) => file.replace(/\.(md|mdx)$/, ""));
}

export function getAllReviews(): ReviewMeta[] {
  const slugs = getReviewSlugs();
  return slugs.map((slug) => {
    const mdxPath = path.join(reviewsDirectory, `${slug}.mdx`);
    const mdPath = path.join(reviewsDirectory, `${slug}.md`);
    const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title || "",
      author: data.author || "",
      tags: data.tags || [],
      ...data,
    };
  });
}

export async function getReviewBySlug(slug: string): Promise<Review> {
  const mdxPath = path.join(reviewsDirectory, `${slug}.mdx`);
  const mdPath = path.join(reviewsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const source = await serialize(content, { scope: data });
  return {
    slug,
    title: data.title || "",
    author: data.author || "",
    tags: data.tags || [],
    ...data,
    source,
  };
}

export function getAllTags(): string[] {
  const reviews = getAllReviews();
  const tagSet = new Set<string>();
  reviews.forEach((review) => {
    (review.tags || []).forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

export function getReviewsByTag(tag: string): ReviewMeta[] {
  return getAllReviews().filter((review) => (review.tags || []).includes(tag));
}
