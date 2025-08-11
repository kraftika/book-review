import Link from "next/link";
import { getAllTags } from "../../lib/reviews";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Tags
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {tags.map((tag: string) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-100 px-4 py-2 rounded text-lg hover:bg-blue-300 dark:hover:bg-blue-600 transition"
          >
            {tag}
          </Link>
        ))}
      </div>
    </main>
  );
}
