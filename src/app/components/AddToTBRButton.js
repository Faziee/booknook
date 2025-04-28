"use client"; // This makes it a Client Component

import { useTBR } from "../context/TBRContext"; 

export default function AddToTBRButton({ book }) {
  const { addToTBR } = useTBR(); // Now we can safely use this inside a Client Component

  const handleAddToTBR = () => {
    addToTBR(book);
    alert("Book added to your TBR list!");
  };

  return (
    <div className="mt-10">
      <button onClick={handleAddToTBR} className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700">
        📚 Add to TBR
      </button>
    </div>
  );
}
