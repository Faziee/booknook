"use client";

import { useState } from "react";
import { useTBR } from "../context/TBRContext";
import Link from "next/link";
import BookCard from "../components/BookCard";
import ReadModal from "../components/ReadModal"; // You'll need to create this

export default function TBRPage() {
  const { tbr, deleteFromTBR, markAsRead } = useTBR();
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkAsReadClick = (bookId) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const handleSubmitRating = (rating, comment) => {
    markAsRead(selectedBookId, rating, comment);
    setIsModalOpen(false);
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
              <Link 
  href={`/books/${book.id}`} 
  className="flex-shrink-0 group hover:scale-105 transition-transform duration-300"
>
  <BookCard book={book} />
</Link>

              {/* Button Group */}
              <div className="flex flex-col gap-3">
                {/* Updated Mark as Read Button */}
                <button
                  onClick={() => handleMarkAsReadClick(book.id)}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition"
                >
                  Mark as Read
                </button>

                {/* Remove Button */}
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

      {/* Rating Modal */}
      <ReadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}