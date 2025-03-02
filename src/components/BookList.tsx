import React, { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import BookCard from "./BookCard";
import "./BookList.css";
import { Book } from "../types/bookTypes";

const BookList: React.FC = () => {
  const { books, loading, error, setQuery } = useBooks();
  const [hoveredBook, setHoveredBook] = useState<Book | null>(null);
  const [hoveredBookPosition, setHoveredBookPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = (book: Book, event: React.MouseEvent) => {
    clearTimeout(hoverTimeout);

    const bookElement = event.currentTarget as HTMLElement;
    const bookRect = bookElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const overlayWidth = 250;
    const margin = 10;

    let leftPosition = bookRect.left + bookRect.width / 2 - overlayWidth / 2;
    let topPosition = bookRect.bottom;

    if (leftPosition + overlayWidth > viewportWidth - margin) {
      leftPosition = viewportWidth - overlayWidth - margin;
    }

    if (leftPosition < margin) {
      leftPosition = margin;
    }

    setHoveredBookPosition({ top: topPosition, left: leftPosition });
    setHoveredBook(book);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setHoveredBook(null);
      setHoveredBookPosition(null);
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
              <div
                key={book.key}
                className="book-card-wrapper"
                onMouseEnter={(e) => handleMouseEnter(book, e)}
                onMouseLeave={handleMouseLeave}
              >
                <BookCard book={book} />
                {hoveredBook && hoveredBook.key === book.key && hoveredBookPosition && (
                  <div
                    className="book-preview-overlay"
                    style={{
                      top: hoveredBookPosition.top,
                      left: hoveredBookPosition.left,
                    }}
                    onMouseEnter={() => clearTimeout(hoverTimeout)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="preview-content">
                      {hoveredBook.cover_i && (
                        <img
                          src={`https://covers.openlibrary.org/b/id/${hoveredBook.cover_i}-L.jpg`}
                          alt={hoveredBook.title}
                          className="preview-image"
                        />
                      )}
                      <h3 className="preview-title">{hoveredBook.title}</h3>
                      <p className="preview-text">
                        By: {hoveredBook.author_name?.join(", ") || "Unknown"}
                      </p>
                      <p className="preview-text">
                        Published: {hoveredBook.first_publish_year || "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          : !loading && <p className="no-results">No books found</p>}
      </div>
    </div>
  );
};

export default BookList;
