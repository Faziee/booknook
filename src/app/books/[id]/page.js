import { notFound } from "next/navigation";
import BookDetails from "../../components/BookDetails";

async function getBook(id) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    const contentType = res.headers.get("content-type");

    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      console.error("Invalid response:", res.status, res.statusText);
      return null;
    }
    const data = await res.json();

    if (!data || !data.volumeInfo) {
      console.error("Invalid book data:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}

export default async function BookPage({ params }) {
  if (!params) {
    return notFound();
  }

  const { id } = await params;
  if (!id) {
    return notFound();
  }

  const book = await getBook(id);
  if (!book) {
    return notFound();
  }

  return <BookDetails book={book} />;
}
