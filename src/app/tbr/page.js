"use client";

import { useTBR } from "../context/TBRContext";
import Link from "next/link";
import BookCard from "../components/BookCard";

export default function TBRPage() {
  const { tbr, deleteFromTBR } = useTBR();

  const handleMarkAsRead = (bookId) => {
    // Placeholder: implement your mark-as-read logic here
    alert(`Marked book ${bookId} as read!`);
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <h3 className="text-4xl font-bold text-green-800 mb-8">
        My TBR List <span className="text-2xl">📘</span>
      </h3>

      {tbr.length === 0 ? (
        <p className="text-gray-600 text-lg">No books in your TBR yet. Start adding some!</p>
      ) : (
        <div className="space-y-8">
          {tbr.map((book) => (
            <div
              key={`${book.id}-${book.volumeInfo.title}`}
              className="flex items-start gap-6 mb-6"
            >
              {/* Book Info */}
              <Link href={`/books/${book.id}`} passHref>
                <div className="flex-shrink-0 group hover:scale-105 transition-transform duration-300">
                  <BookCard book={book} />
                </div>
              </Link>

              {/* Button Group */}
              <div className="flex flex-col gap-3">
                {/* Mark as Read Button */}
                <button
                  onClick={() => handleMarkAsRead(book.id)}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition"
                >
                  Mark as Read
                </button>

                {/* Remove Button (placed at the bottom) */}
                <button
                  onClick={() => deleteFromTBR(book.id)}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
