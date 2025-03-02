import React from "react";
import { useBooks } from "../hooks/useBooks";
import BookCard from "./BookCard";
import "./BookList.css";

const BookList: React.FC = () => {
  const { books, loading, error, setQuery } = useBooks();

  return (
    <div className="book-list-container">
           <h1>Book Search</h1>
      <input
        type="text"
        className="search-box"
        placeholder="Search for a book..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book, index) => <BookCard key={index} {...book} />)
        ) : (
          !loading && <p className="no-results">No books found</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
