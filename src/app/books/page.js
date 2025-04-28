"use client";

import { useState, useEffect } from "react";
import { searchBooks } from "../services/booksApi";
import BookList from "../../components/BookList";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const results = await searchBooks({
          query: '',
          minPages: 0,
          maxPages: 5000,
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
        });
        setBooks(results);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load books:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  if (loading) return <div className="p-8 text-center">Loading books...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>
      
      <BookList books={books} onBookClick={handleBookClick} />

      {selectedBook && (
        <div className="book-details mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold">{selectedBook.volumeInfo.title}</h2>
          <p className="text-gray-600 mt-2">
            {selectedBook.volumeInfo.authors?.join(", ") || "Unknown Author"}
          </p>
          
          <div className="mt-4 flex gap-8">
            {selectedBook.volumeInfo.imageLinks?.thumbnail && (
              <Image
                src={selectedBook.volumeInfo.imageLinks.thumbnail}
                alt={selectedBook.volumeInfo.title}
                width={200}
                height={300}
                className="rounded-lg shadow-md"
              />
            )}
            <div>
              <p className="text-gray-700 mb-4">
                {selectedBook.volumeInfo.description || "No description available"}
              </p>
              <p className="text-sm text-gray-500">
                {selectedBook.volumeInfo.pageCount || "Unknown"} pages
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;