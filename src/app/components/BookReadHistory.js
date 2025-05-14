"use client";

import { useState } from "react";

export default function BookReadHistory({ readings }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t pt-3 mt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800"
      >
        {readings.length} {readings.length === 1 ? "reading" : "readings"}
        <svg
          className={`ml-1 w-4 h-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="space-y-3 mt-2">
          {readings.map((reading, index) => (
            <div
              key={reading.readId}
              className="pl-4 border-l-2 border-gray-200"
            >
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">
                  {"★".repeat(reading.rating)}
                  {"☆".repeat(5 - reading.rating)}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(reading.dateRead).toLocaleDateString()}
                </span>
              </div>
              {reading.comment && (
                <p className="text-sm text-gray-700 mt-1">
                  "{reading.comment}"
                </p>
              )}
              {index < readings.length - 1 && (
                <div className="h-px bg-gray-100 my-2"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
