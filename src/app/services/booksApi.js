"use client";

export const searchBooks = async ({ query, genre, minPages, maxPages, apiKey }) => {
    try {
      const genreFilter = genre ? `subject:${genre}` : '';
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query} ${genreFilter}&maxResults=10&key=${apiKey}`
      );
      const data = await response.json();
      
      return data.items?.filter(book => {
        const pages = book.volumeInfo?.pageCount || 0;
        return pages >= minPages && pages <= maxPages;
      }) || [];
    } catch (error) {
      console.error("API Error:", error);
      throw new Error("Failed to fetch books");
    }
  };
  
  export const getBookDetails = async (id) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      if (!response.ok) throw new Error("Book not found");
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };