// tbr/page.js
"use client";

import Image from 'next/image';
import { useTBR } from "../context/TBRContext";
import Link from "next/link";  // Import Link from Next.js

export default function TBRPage() {
  const { tbr, deleteFromTBR } = useTBR();  // Get TBR list and delete function from context

  return (
    <div className="p-8">
      <h1>Your TBR List</h1>
      {tbr.length === 0 ? (
        <p>No books in TBR.</p>
      ) : (
        tbr.map((book) => (
          <div key={`${book.id}-${book.volumeInfo.title}`} className="mb-6">
            <Link href={`/books/${book.id}`} passHref>
              {/* Book Item Container */}
              <div className="cursor-pointer">
                {/* Book Image */}
                {book.volumeInfo.imageLinks && (
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    width={128} // equivalent to w-32
                    height={192} // equivalent to h-48
                    className="w-32 h-48 object-cover rounded-md"
                  />
                )}
                {/* Book Title */}
                <h3 className="mt-2 text-lg font-semibold">{book.volumeInfo.title}</h3>
                {/* Book Author */}
                <p className="text-gray-500">{book.volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
              </div>
            </Link>

            {/* Delete Button */}
            <button
              onClick={() => deleteFromTBR(book.id)}  // Delete the book when clicked
              className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            >
              Delete from TBR
            </button>
          </div>
        ))
      )}
    </div>
  );
}
