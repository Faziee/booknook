"use client";

import { useState } from "react";

export default function ReadModal({ isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit(rating, comment);
    setRating(5);
    setComment("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Finished Reading?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Rating Section */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              How would you rate this book?
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl transition-colors ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  } hover:scale-110`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {rating} star{rating !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Comment Section*/}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Any thoughts or notes for future you?
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-gray-800 bg-white"
              rows="4"
              placeholder="What stood out? Would you recommend it?"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition"
            >
              Mark as Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
