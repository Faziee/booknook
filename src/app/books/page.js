// pages/books/page.js
"use client";

import Image from 'next/image';
import React, { useState, useEffect } from "react";
import BookList from "../components/BookList"; // Import the BookList component

const BooksPage = () => {
  const [books, setBooks] = useState([]); // Holds the list of books
  const [selectedBook, setSelectedBook] = useState(null); // Holds the selected book for details

  // Fetch books from the API
  const fetchBooks = async () => {
    try {
      const response = await fetch("your-book-api-url");
      const data = await response.json();
      setBooks(data.items || []); // Assuming the books are in data.items
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(); // Fetch books when the component mounts
  }, []);

  // Handle book click to show details
  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book
  };

  return (
    <div>
      <h1>Books</h1>
      {/* Pass books and the handleBookClick function to BookList */}
      <BookList books={books} onBookClick={handleBookClick} />

      {/* Show selected book details */}
      {selectedBook && (
        <div className="book-details mt-8">
          <h2>{selectedBook.volumeInfo.title}</h2>
          <p>{selectedBook.volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
          <p>{selectedBook.volumeInfo.description || "No description available"}</p>
          <Image
            src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
            alt={selectedBook.volumeInfo.title}
            className="w-64 h-96 object-cover"
          />
          <p>{selectedBook.volumeInfo.pageCount} pages</p>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
