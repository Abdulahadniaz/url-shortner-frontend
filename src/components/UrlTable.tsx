"use client";

import { useState, useEffect } from "react";

interface Url {
  id: number;
  urlCode: string;
  longUrl: string;
  shortUrl: string;
}

export default function UrlTable() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUrls = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3001/urls/all");
      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }
      const data = await response.json();
      setUrls(data);
    } catch (err) {
      setError("An error occurred while fetching URLs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Shortened URLs</h2>
        <button
          onClick={fetchUrls}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          Refresh
        </button>
      </div>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : urls.length === 0 ? (
        <div className="text-center text-gray-500">No URLs shortened yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Short URL</th>
                <th className="px-4 py-2 text-left text-gray-600">Long URL</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.id} className="border-b">
                  <td className="px-4 py-2">
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={url.longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:underline"
                    >
                      {url.longUrl}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
