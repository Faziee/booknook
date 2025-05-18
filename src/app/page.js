"use client";
import { useState, useEffect, useCallback } from "react";
import { searchBooks } from "./services/booksApi";
import Link from "next/link";

import BookCard from "./components/BookCard";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [randomBook, setRandomBook] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [randomLoading, setRandomLoading] = useState(false);

  const genres = [
    "Fiction",
    "Mystery",
    "Fantasy",
    "Romance",
    "Science Fiction",
    "Biography",
    "History",
    "Thriller",
  ];

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleGenreChange = (e) => setSelectedGenre(e.target.value);

  const handleRandomGenreToggle = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Fetch books for search
  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchBooks({
        query: searchQuery,
        genre: selectedGenre,
        minPages: 0,
        maxPages: 5000,
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY,
      });
      setBooks(results);
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre]);

  // Fetch random book
  const getRandomBook = async () => {
    setRandomLoading(true);
    setError(null);
    try {
      const results = await searchBooks({
        query: "",
        genre: selectedGenres.join("|"),
        minPages: 0,
        maxPages: 5000,
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY,
      });

      if (results.length > 0) {
        const randomIndex = Math.floor(Math.random() * results.length);
        setRandomBook(results[randomIndex]);
      } else {
        setError("No books found for selected genres");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setRandomLoading(false);
    }
  };

  // Load books when search criteria changes
  useEffect(() => {
    if (searchQuery || selectedGenre) {
      const timer = setTimeout(() => {
        loadBooks();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadBooks, searchQuery, selectedGenre]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white-400 mb-3 leading-tight">
          Fazie&apos;s BookNook <span className="text-3xl">ᡣ𐭩</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Find your next great read with personalized recommendations
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Random Book Section */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Get a Random Book Recommendation
          </h2>

          {/* Genre Selection */}
          <div className="mb-6">
            <p className="text-gray-700 mb-3 font-medium">Pick Genres:</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleRandomGenreToggle(genre)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedGenres.includes(genre)
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Randomize Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={getRandomBook}
              disabled={selectedGenres.length === 0 || randomLoading}
              className="px-6 py-2 bg-rose-400 text-white rounded-lg font-bold hover:bg-rose-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {randomLoading ? "Finding Your Book..." : "Randomize!"}
            </button>

            {selectedGenres.length > 0 && (
              <p className="text-sm text-gray-600">
                Selected: {selectedGenres.join(", ")}
              </p>
            )}
          </div>

          {/* Random Book Display */}
          {randomBook && (
            <div className="mt-6 text-center">
              <BookCard book={randomBook} />
              <Link
                href={`/books/${randomBook.id}`}
                className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-purple-700 mt-4 transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          )}
        </section>

        {/* Search Section */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Search for Books
          </h2>

          <div className="space-y-4">
            {/* Search Input */}
            <div>
              <input
                type="text"
                placeholder="Search by title or author"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
              />
            </div>

            {/* Genre Selector and Search Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                onChange={handleGenreChange}
                value={selectedGenre}
                className="flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
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
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search Books"}
              </button>
            </div>
          </div>
        </section>

        {/* Search Results */}
        {books.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Search Results ({books.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
