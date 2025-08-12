import Link from "next/link";
import { getAllReviews, ReviewMeta } from "../lib/reviews";
import Menu from "@/components/Menu";
import Image from "next/image";

export default async function HomePage() {
  const reviews: ReviewMeta[] = await getAllReviews();

  return (
    <div>
      <Menu />
      <main className="min-h-screen flex flex-col items-center bg-white dark:bg-gray-900 px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Book Reviews
        </h1>
        <div className="w-full max-w-3xl grid gap-8 grid-cols-1">
          {reviews.map((review) => (
            <Link
              key={review.slug}
              href={`/reviews/${review.slug}`}
              className="block bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start">
                {review.og_image && (
                  <div className="w-1/3 mr-4">
                    <Image
                      src={review.og_image}
                      alt={review.title}
                      width={200}
                      height={200}
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="w-2/3">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
