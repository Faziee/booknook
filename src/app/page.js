"use client";

import Image from 'next/image';
import React, { useState, useEffect } from "react";
import {fetchBooks} from "./books/page"; // Import the bookspage?
import Link from "next/link"; // Import Link for navigation

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageRange, setPageRange] = useState({ min: 100, max: 500 });
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");

  const genres = [
    "Fiction", "Non-Fiction", "Mystery", "Fantasy", "Romance", "Science Fiction", "Biography", "History", "Thriller"
  ];

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handlePageRangeChange = (event) => {
    const { name, value } = event.target;
    setPageRange((prevRange) => ({
      ...prevRange,
      [name]: value,
    }));
  };

  const handleGenreChange = (e) => setSelectedGenre(e.target.value);

  const fetchBooks = async () => {
    setLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      console.error("API key is missing.");
      setLoading(false);
      return;
    }

    try {
      const query = `${searchQuery} ${selectedGenre ? `subject:${selectedGenre}` : ""}`.trim();
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=${apiKey}`
      );
      const data = await response.json();

      if (data.items) {
        const filteredBooks = data.items.filter((book) => {
          const pageCount = book.volumeInfo.pageCount || 0;
          return pageCount >= pageRange.min && pageCount <= pageRange.max;
        });
        setBooks(filteredBooks);
      } else {
        console.error("No items found.");
        setBooks([]);
        alert("No books found.");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Error fetching books.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery || selectedGenre) {
      fetchBooks();
    }
  }, [searchQuery, pageRange, selectedGenre]);

  return (
    <div className="container p-8 space-y-8">
      {/* Title and Subtitle Section */}
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-purple-600">Fazie&apos;s BookNook &lt;3</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Feeling Bored? In a reading slump? Get some book inspo and recs on what to read next...
        </p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center">
        <Image
          src="/images/image3.jpeg"
          alt="Cozy Book"
          className="w-1/2 rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Search Section */}
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
              onClick={fetchBooks}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Books List Section */}
      {loading && <p className="text-center text-lg text-gray-500">Loading...</p>}
      <div className="book-list-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {books.map((book) => (
          <div key={book.id} className="book-card cursor-pointer bg-white p-4 rounded-lg shadow-md">
            <Link href={`/books/${book.id}`}>
              <Image
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="book-thumbnail mb-4 rounded-md"
              />
              <h3 className="book-title text-lg font-semibold text-gray-700">{book.volumeInfo.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
