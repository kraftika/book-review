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
          <div className="grid gap-12 grid-cols-1">
            {reviews.map((review) => (
              <div key={review.slug}>
                <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
                  {review.title.trim()}
                </h2>
                <h4 className="text-black dark:text-gray-300 my-4 leading-relaxed font-semibold italic">
                  Author: {review.author}
                </h4>
                <div className="lg:flex lg:items-start">
                  {review.og_image && (
                    <div className="flex-shrink-0 lg:w-1/4 lg:mr-8 mb-4 lg:mb-0">
                      <Image
                        src={review.og_image}
                        alt={review.title}
                        width={200}
                        height={200}
                        className="object-cover w-full"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    {review.firstParagraph && (
                      <p className="text-black dark:text-gray-400 mb-2 first-letter-styled leading-relaxed text-justify">
                        {review.firstParagraph}{" "}
                        <Link
                          href={`/reviews/${review.slug}`}
                          className="text-black hover:underline font-semibold"
                        >
                          Read more
                        </Link>
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
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
