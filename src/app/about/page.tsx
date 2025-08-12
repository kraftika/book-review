import Menu from "@/components/Menu";

export default function AboutPage() {
  return (
    <div>
      <Menu />
      <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Despre mine
        </h1>
        <div className="w-full max-w-3xl text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Aceasta este pagina despre mine.
          </p>
        </div>
      </main>
    </div>
  );
}
