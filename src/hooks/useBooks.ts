import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { Book, BookSearchApiResponse } from "../types/bookTypes";

const API_URL = "https://openlibrary.org/search.json?title=";

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

        const data: BookSearchApiResponse = await response.json();
        const booksData: Book[] = data.docs.map((book) => ({
          key: book.key,
          title: book.title,
          cover_i: book.cover_i,
          author_name: book.author_name,
          first_publish_year: book.first_publish_year,
          number_of_pages_median: book.number_of_pages_median,
          physical_format: book.physical_format,
          weight: book.weight,
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
