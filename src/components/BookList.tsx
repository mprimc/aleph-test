import React, { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import BookCard from "./BookCard";
import "./BookList.css";
import { Book } from "../types/bookTypes";

const BookList: React.FC = () => {
  const { books, loading, error, setQuery } = useBooks();
  const [hoveredBook, setHoveredBook] = useState<Book | null>(null);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = (book: Book) => {
    clearTimeout(hoverTimeout);
    setHoveredBook(book);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      // setHoveredBook(null);
    }, 300);
  };

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
        {books.length > 0
          ? books.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                onMouseEnter={() => handleMouseEnter(book)}
                onMouseLeave={handleMouseLeave}
              />
            ))
          : !loading && <p className="no-results">No books found</p>}
      </div>

      {hoveredBook && (
        <div
          className="book-item-overlay"
          onMouseEnter={() => clearTimeout(hoverTimeout)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overlay-content">
            <button className="close-button" onClick={() => setHoveredBook(null)}>
              ✖
            </button>
            {hoveredBook.cover_i && (
              <img
                src={`https://covers.openlibrary.org/b/id/${hoveredBook.cover_i}-L.jpg`}
                alt={hoveredBook.title}
                className="overlay-image"
              />
            )}
            <h2 className="overlay-title">{hoveredBook.title}</h2>
            <p className="overlay-text">By: {hoveredBook.author_name?.join(", ") || "Unknown"}</p>
            <p className="overlay-text">Published: {hoveredBook.first_publish_year || "N/A"}</p>
            <p className="overlay-text">Format: {hoveredBook.physical_format || "Unknown"}</p>
            <p className="overlay-text">Pages: {hoveredBook.number_of_pages_median || "N/A"}</p>
            <p className="overlay-text">Weight: {hoveredBook.weight || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
