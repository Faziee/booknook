"use client";

import { useState, useEffect, useCallback } from "react";
import { searchBooks } from "../services/booksApi";
import Link from "next/link";
import Image from 'next/image';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageRange, setPageRange] = useState({ min: 100, max: 500 });
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [error, setError] = useState(null);

  const genres = [
    "Fiction", "Non-Fiction", "Mystery", "Fantasy", 
    "Romance", "Science Fiction", "Biography", "History", "Thriller"
  ];

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handlePageRangeChange = (event) => {
    const { name, value } = event.target;
    setPageRange(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleGenreChange = (e) => setSelectedGenre(e.target.value);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchBooks({
        query: searchQuery,
        genre: selectedGenre,
        minPages: pageRange.min,
        maxPages: pageRange.max,
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
      });
      setBooks(results);
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre, pageRange.min, pageRange.max]);

  useEffect(() => {
    if (searchQuery || selectedGenre) {
      const timer = setTimeout(() => {
        loadBooks();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadBooks, searchQuery, selectedGenre]);

  return (
    <div className="container p-8 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-purple-600">Fazie&apos;s BookNook &lt;3</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Feeling Bored? In a reading slump? Get some book inspo and recs on what to read next...
        </p>
      </div>

      <div className="flex justify-center">
        <Image
          src="/images/image3.jpeg"
          alt="Cozy Book"
          width={600}
          height={400}
          className="w-1/2 rounded-lg shadow-lg object-cover"
        />
      </div>

      <div className="search-section bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Search for Books</h2>
        <div className="search-form space-y-4">
          <input
            type="text"
            placeholder="Search books"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 border rounded-lg shadow-md focus:outline-none"
          />
          <div className="flex items-center space-x-4">
            <select
              onChange={handleGenreChange}
              value={selectedGenre}
              className="w-full p-3 border rounded-lg shadow-md"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <button
              onClick={loadBooks}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center text-lg text-gray-500">Loading...</p>}
      
      <div className="book-list-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {books.map((book) => (
          <div key={book.id} className="book-card cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link href={`/books/${book.id}`}>
              <div className="h-48 flex items-center justify-center mb-4">
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    width={120}
                    height={180}
                    className="object-contain h-full"
                  />
                ) : (
                  <div className="text-gray-400">No cover available</div>
                )}
              </div>
              <h3 className="book-title text-lg font-semibold text-gray-700 text-center">
                {book.volumeInfo.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;