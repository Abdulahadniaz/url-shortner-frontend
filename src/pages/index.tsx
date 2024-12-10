import UrlShortenerForm from "@/components/UrlShortenerForm";
import UrlTable from "@/components/UrlTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">URL Shortener</h1>
      <div className="w-full max-w-4xl space-y-8">
        <UrlShortenerForm />
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Shortened URLs
          </h2>
          <UrlTable />
        </div>
      </div>
    </main>
  );
}
