import Image from 'next/image';
import Link from 'next/link';

export default function BookCard({ book }) {
  const volumeInfo = book.volumeInfo || book;
  const bookId = book.id || book.key;

  return (
    <div 
      key={bookId} 
      className="w-50 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/books/${bookId}`} className="block h-full">
        <div className="h-55 bg-gray-100 flex items-center justify-center p-4">
          {volumeInfo.imageLinks?.thumbnail ? (
            <Image
              src={volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')}
              alt={volumeInfo.title}
              width={120}
              height={180}
              className="object-contain h-full"
              unoptimized
            />
          ) : (
            <span className="text-gray-400">No cover available</span>
          )}
        </div>
        <div className="p-4">
          <h4 className="font-medium text-gray-900 line-clamp-2">
            {volumeInfo.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {volumeInfo.authors?.join(", ") || "Unknown Author"}
          </p>
        </div>
      </Link>
    </div>
  );
}