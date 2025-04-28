import Image from 'next/image';

const BookList = ({ books, onBookClick }) => {
  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.id}
            className="book-card cursor-pointer mb-4"
            onClick={() => onBookClick(book)}
          >
            <Image
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={book.volumeInfo?.title || 'Book cover'}
              width={128}  // required
              height={192} // required
              className="w-32 h-48 object-cover"
            />
            <h3 className="text-lg text-black mt-2">{book.volumeInfo?.title}</h3>
          </div>
        ))
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
};

export default BookList;