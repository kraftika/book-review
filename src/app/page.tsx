import Link from "next/link";
import { getAllReviews, ReviewMeta } from "../lib/reviews";
import Menu from "@/components/Menu";
import Image from "next/image";

export default async function HomePage() {
  const reviews: ReviewMeta[] = await getAllReviews();

  return (
    <div>
      <Menu />
      <main className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="w-full max-w-screen-lg mx-auto px-4">
          <div className="grid gap-8 grid-cols-1">
            {reviews.map((review) => (
              <div key={review.slug} className="lg:overflow-hidden">
                {review.og_image && (
                  <div className="lg:float-left lg:mr-4 mb-4">
                    <Image
                      src={review.og_image}
                      alt={review.title}
                      width={200}
                      height={200}
                      className="object-cover w-full lg:w-auto"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {review.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-medium">Author:</span> {review.author}
                  </p>
                  {review.firstParagraph && (
                    <p className="text-gray-600 dark:text-gray-400 mb-2 first-letter-styled">
                      {review.firstParagraph}
                    </p>
                  )}
                  <Link
                    href={`/reviews/${review.slug}`}
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </Link>
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
