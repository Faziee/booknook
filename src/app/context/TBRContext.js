"use client";
// context/TBRContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

// Create the TBR Context
const TBRContext = createContext();

// TBRProvider component that manages TBR list state and localStorage
export const TBRProvider = ({ children }) => {
  const [tbr, setTBR] = useState([]);

  // Load from localStorage only on the client side
  useEffect(() => {
    const savedTBR = JSON.parse(localStorage.getItem("tbrList")) || [];
    setTBR(savedTBR);
  }, []);

  const addToTBR = (book) => {
    setTBR((prevTBR) => {
      const updatedTBR = [...prevTBR, book];
      localStorage.setItem("tbrList", JSON.stringify(updatedTBR));
      return updatedTBR;
    });
  };

  // Delete a book from the TBR list
  const deleteFromTBR = (bookId) => {
    setTBR((prevTBR) => {
      const updatedTBR = prevTBR.filter((book) => book.id !== bookId);
      localStorage.setItem("tbrList", JSON.stringify(updatedTBR));
      return updatedTBR;
    });
  };

  return (
    <TBRContext.Provider value={{ tbr, addToTBR, deleteFromTBR }}>
      {children}
    </TBRContext.Provider>
  );
};

// Custom hook to use the TBR context
export const useTBR = () => {
  return useContext(TBRContext);
};
