"use client";

import Image from 'next/image';
import { useState, useEffect } from "react";

export default function TBRList() {
  const [tbr, setTBR] = useState([]); // TBR list state
  const [read, setRead] = useState([]); // Read list state

  // Load from local storage when the component mounts
  useEffect(() => {
    const savedTBR = JSON.parse(localStorage.getItem("tbr")) || [];
    const savedRead = JSON.parse(localStorage.getItem("read")) || [];
    setTBR(savedTBR);
    setRead(savedRead);
  }, []);

  // Save to local storage when the lists change
  useEffect(() => {
    localStorage.setItem("tbr", JSON.stringify(tbr));
    localStorage.setItem("read", JSON.stringify(read));
  }, [tbr, read]);

  // Move book to the Read Pile
  function markAsRead(book) {
    setTBR(tbr.filter((b) => b.key !== book.key)); // Remove from TBR
    setRead([...read, book]); // Add to Read
  }

  return (
    <div>
      {/* TBR Section */}
      <h2 className="text-2xl font-semibold">📖 TBR List</h2>
      {tbr.length === 0 ? (
        <p>No books in TBR.</p>
      ) : (
        tbr.map((book) => (
          <div key={`${book.key}-${book.cover_i}`} className="p-4 border rounded-lg shadow-md bg-gray-100">
            {book.cover_i && (
              <Image
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
                className="w-32 h-48 mb-4 rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm">By {book.author_name?.[0] || "Unknown"}</p>
            <button
              className="mt-2 px-4 py-2 bg-pink-500 text-white rounded"
              onClick={() => markAsRead(book)} // Moves to Read
            >
              ✔️ Mark as Read
            </button>
          </div>
        ))
      )}

      {/* Read Pile Section */}
      <h2 className="text-2xl font-semibold mt-6">✔️ Read Pile</h2>
      {read.length === 0 ? <p>No books finished yet.</p> : read.map((book) => (
        <div key={book.key} className="p-4 border rounded-lg shadow-md bg-green-100">
          {book.cover_i && (
            <Image
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={book.title}
              className="w-32 h-48 mb-4 rounded"
            />
          )}
          <h3>{book.title}</h3>
        </div>
      ))}
    </div>
  );
}
