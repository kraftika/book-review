import Link from "next/link";
import { getReviewsByTag, ReviewMeta } from "../../../lib/reviews";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ tag: string }>;
};

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const reviews: ReviewMeta[] = getReviewsByTag(decodedTag);

  if (!reviews.length) return notFound();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Reviews tagged:{" "}
        <span className="text-blue-600 dark:text-blue-300">{decodedTag}</span>
      </h1>
      <div className="w-full max-w-3xl grid gap-6 grid-cols-1 sm:grid-cols-2">
        {reviews.map((review) => (
          <Link
            key={review.slug}
            href={`/reviews/${review.slug}`}
            className="block bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {review.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-medium">Author:</span> {review.author}
            </p>
            {review.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {review.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {(review.tags || []).map((tag: string) => (
                <span
                  key={tag}
                  className="bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-100 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
