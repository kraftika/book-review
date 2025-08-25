import { notFound } from "next/navigation";
import { getReviewBySlug } from "../../../lib/reviews";
import type { Metadata } from "next";
import ClientMDX from "../../../components/ClientMDX";
import NextImage from "next/image";
import Menu from "@/components/Menu";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return {};
  const title = typeof review.title === "string" ? review.title : "";
  const description =
    typeof review.description === "string" ? review.description : "";
  const og_image = typeof review.og_image === "string" ? review.og_image : "";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: og_image ? [og_image] : [],
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <main className="flex-grow flex flex-col items-center bg-white dark:bg-gray-900 px-4 py-8">
        <article className="w-full max-w-screen-lg px-4">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {review.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <span className="font-medium">Author:</span> {review.author}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {review.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-100 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          {typeof review.og_image === "string" && (
            <NextImage
              src={review.og_image}
              alt={review.title as string}
              width={672}
              height={256}
              className="w-full h-64 object-cover rounded mb-6"
            />
          )}
          <div className="prose dark:prose-invert max-w-none">
            <ClientMDX source={review.source} />
          </div>
        </article>
      </main>
    </div>
  );
}
