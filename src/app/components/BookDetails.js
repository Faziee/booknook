import Image from "next/image";
import AddToTBRButton from "./AddToTBRButton";

export default function BookDetails({ book }) {
  const {
    title,
    authors,
    publishedDate,
    description,
    imageLinks,
    pageCount,
    categories,
    language,
    publisher,
    industryIdentifiers = [],
    infoLink,
  } = book.volumeInfo;

  const isbn =
    industryIdentifiers.find((id) => id.type === "ISBN_13")?.identifier ||
    industryIdentifiers.find((id) => id.type === "ISBN_10")?.identifier ||
    "N/A";

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-3 gap-8">
      {/* Left Section: Book Cover, Title, Author */}
      <div className="col-span-1 flex flex-col items-center text-center">
        <Image
          src={imageLinks?.thumbnail || "/placeholder.jpg"}
          alt={title}
          width={200}
          height={300}
          className="mb-4 rounded-lg shadow-lg"
        />
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
      </div>

      {/* Right Section: Book Details */}
      <div className="col-span-2 flex flex-col justify-start mt-3">
        <h2 className="text-lg text-gray-600 font-semibold mb-4">
          Author: {authors?.join(", ") || "Unknown Author"}
        </h2>
        <p className="text-base text-gray-500 mb-2">
          Genre: {categories?.join(", ") || "N/A"}
        </p>
        <p className="text-base text-gray-500 mb-2">
          Released: {publishedDate || "Unknown Date"}
        </p>
        <p className="text-base text-gray-500 mb-2">
          Pages: {pageCount || "N/A"}
        </p>
        <p className="text-base text-gray-500 mb-2">
          Language: {language?.toUpperCase() || "N/A"}
        </p>
        <p className="text-base text-gray-500 mb-2">
          Publisher: {publisher || "N/A"}
        </p>
        <p className="text-base text-gray-500 font-semibold">ISBN: {isbn}</p>

        {/* Add to TBR Button */}
        <AddToTBRButton book={book} />
      </div>

      {/* Bottom Section: Description */}
      <div className="col-span-3 mt-4 prose max-w-none text-sm">
        <h3 className="text-lg font-bold mb-2">Description</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: description || "<p>No description available.</p>",
          }}
        />
      </div>

      {/* More Info on Google Button */}
      {infoLink && (
        <a
          href={infoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          View More Book Details
        </a>
      )}
    </div>
  );
}
