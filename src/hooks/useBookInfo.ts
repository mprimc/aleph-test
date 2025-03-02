import { useState, useCallback } from "react";

const API_URL =
  "https://openlibrary.org/api/books?bibkeys=ISBN:9783442236862&jscmd=details&format=json";

export const useBookInfo = () => {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBook = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(API_URL);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch book data. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const bookKey = "ISBN:9783442236862";
      if (!data[bookKey]) {
        throw new Error("Book not found in API response");
      }
  
      const bookDetails = data[bookKey].details;
  
      const bookInfo = {
        title: bookDetails.title,
        authors: bookDetails.authors?.map((author: any) => author.name).join(", ") || "Unknown Author",
        publishDate: bookDetails.publish_date || "Unknown Date",
        physicalFormat: bookDetails.physical_format || "Unknown Format",
        coverImage: `https://covers.openlibrary.org/b/ISBN/9783442236862-L.jpg`,
      };
  
      setBook(bookInfo);
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { book, loading, error, fetchBook };
};
