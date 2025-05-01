// app/read/page.js
"use client";
import { useTBR } from "../context/TBRContext";
import BookCard from "../components/BookCard";
import BookReadHistory from "../components/BookReadHistory";

export default function ReadPage() {
  const { readBooks } = useTBR();

  // Group readings by book ID
  const groupedReadings = readBooks.reduce((acc, reading) => {
    const bookId = reading.id;
    if (!acc[bookId]) {
      acc[bookId] = [];
    }
    acc[bookId].push(reading);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Books You've Read ({Object.keys(groupedReadings).length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedReadings).map(([bookId, readings]) => {
          const latestReading = readings[0];
          const book = {
            ...latestReading,
            volumeInfo: latestReading.volumeInfo || {}
          };

          return (
            <div key={bookId} className="border rounded-lg p-4">
              <BookCard book={book} />
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <span className="mr-2">Latest Rating:</span>
                  <div className="text-yellow-500">
                    {"★".repeat(latestReading.rating)}
                    {"☆".repeat(5 - latestReading.rating)}
                  </div>
                </div>
                {latestReading.comment && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">"{latestReading.comment}"</p>
                  </div>
                )}
                {readings.length > 1 && (
                  <BookReadHistory readings={readings} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}