"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const TBRContext = createContext();

export function TBRProvider({ children }) {
  const [tbr, setTBR] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    const savedTBR = JSON.parse(localStorage.getItem("tbrList")) || [];
    const savedRead = JSON.parse(localStorage.getItem("readBooks")) || [];
    setTBR(savedTBR);
    setReadBooks(savedRead);
  }, []);

  useEffect(() => {
    localStorage.setItem("tbrList", JSON.stringify(tbr));
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }, [tbr, readBooks]);

  const addToTBR = (book) => {
    const alreadyExists = tbr.some((b) => b.id === book.id);
    if (alreadyExists) return; 
    setTBR((prev) => [...prev, book]);
  };

  const deleteFromTBR = (bookId) => {
    setTBR((prev) => prev.filter((book) => book.id !== bookId));
  };

  const markAsRead = (bookId, rating, comment = "") => {
    const bookToMark = tbr.find((book) => book.id === bookId);
    if (!bookToMark) return;

    setTBR((prev) => prev.filter((book) => book.id !== bookId));
    setReadBooks((prev) => [
      ...prev,
      {
        ...bookToMark,
        rating,
        comment,
        dateRead: new Date().toISOString(),
        readId: `${bookId}-${Date.now()}`,
      },
    ]);
  };

  return (
    <TBRContext.Provider
      value={{
        tbr,
        readBooks,
        addToTBR,
        deleteFromTBR,
        markAsRead,
      }}
    >
      {children}
    </TBRContext.Provider>
  );
}

export const useTBR = () => useContext(TBRContext);
