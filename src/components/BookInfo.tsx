import React from "react";
import { useBookInfo } from "../hooks/useBookInfo";
import "./BookInfo.css";

const BookInfo: React.FC = () => {
  const { book, loading, error, fetchBook } = useBookInfo();

  return (
    <div className="book-info-container">
      <button className="load-button" onClick={fetchBook}>
        Load Book Info
      </button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {book && (
        <div className="book-details-container">
          <img className="book-details-cover" src={book.coverImage} alt={book.title} />
          <h2 className="book-details-title">{book.title}</h2>
          <p>
            <strong>Author(s):</strong> {book.authors}
          </p>
          <p>
            <strong>Published:</strong> {book.publishDate}
          </p>
          <p>
            <strong>Format:</strong> {book.physicalFormat}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
