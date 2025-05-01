"use client";
import { useState, useEffect, useCallback } from "react";
import { searchBooks } from "./services/booksApi";
import Link from "next/link";
import Image from 'next/image';

const HomePage = () => {
  // State for search functionality
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for random book functionality
  const [randomBook, setRandomBook] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [randomLoading, setRandomLoading] = useState(false);

  const genres = [
    "Fiction", "Mystery", "Fantasy", 
    "Romance", "Science Fiction", "Biography", "History", "Thriller"
  ];

  // Search handlers
  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleGenreChange = (e) => setSelectedGenre(e.target.value);

  // Random book handlers
  const handleRandomGenreToggle = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
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
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
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
        query: '',
        genre: selectedGenres.join('|'),
        minPages: 0,
        maxPages: 5000,
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
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
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">
          Fazie's BookNook <span className="text-3xl">ᡣ𐭩</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Find your next great read with personalized recommendations
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Random Book Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Get a Random Book Recommendation
          </h2>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-3 font-medium">Select genres:</p>
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => handleRandomGenreToggle(genre)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedGenres.includes(genre)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={getRandomBook}
              disabled={selectedGenres.length === 0 || randomLoading}
              className="px-6 py-2 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {randomLoading ? "Finding Your Book..." : "Randomize!"}
            </button>

            {selectedGenres.length > 0 && (
              <p className="text-sm text-gray-600">
                Selected: {selectedGenres.join(", ")}
              </p>
            )}
          </div>

          {randomBook && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex flex-col md:flex-row gap-4">
                {randomBook.volumeInfo.imageLinks?.thumbnail && (
                  <div className="flex-shrink-0">
                    <Image
                      src={randomBook.volumeInfo.imageLinks.thumbnail}
                      alt={randomBook.volumeInfo.title}
                      width={120}
                      height={180}
                      className="rounded-lg shadow-sm"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-purple-800 mb-1">
                    {randomBook.volumeInfo.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {randomBook.volumeInfo.authors?.join(", ") || "Unknown Author"}
                  </p>
                  {randomBook.volumeInfo.description && (
                    <p className="text-gray-700 text-sm line-clamp-3 mb-3">
                      {randomBook.volumeInfo.description}
                    </p>
                  )}
                  <Link 
                    href={`/books/${randomBook.id}`}
                    className="inline-block px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Search Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Search for Books
          </h2>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Search by title or author"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                onChange={handleGenreChange}
                value={selectedGenre}
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search Books"}
              </button>
            </div>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Search Results */}
        {books.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Search Results ({books.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div 
                  key={book.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/books/${book.id}`} className="block h-full">
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                      {book.volumeInfo.imageLinks?.thumbnail ? (
                        <Image
                          src={book.volumeInfo.imageLinks.thumbnail}
                          alt={book.volumeInfo.title}
                          width={120}
                          height={180}
                          className="object-contain h-full"
                        />
                      ) : (
                        <span className="text-gray-400">No cover available</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 line-clamp-2">
                        {book.volumeInfo.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;