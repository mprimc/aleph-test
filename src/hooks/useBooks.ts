import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

const API_URL = "https://openlibrary.org/search.json?title=";

interface Book {
  title: string;
  coverId?: number;
}

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const fetchBooks = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}${searchTerm}`);
        if (!response.ok) throw new Error("Failed to fetch books");

        const data = await response.json();
        const booksData: Book[] = data.docs.slice(0, 10).map((book: any) => ({
          title: book.title,
          coverId: book.cover_i,
        }));

        setBooks(booksData);
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (query.length > 2) fetchBooks(query);
  }, [query, fetchBooks]);

  return { books, loading, error, setQuery };
};
