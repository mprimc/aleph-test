import React from "react";
import "./BookCard.css";
import { Book } from "../types/bookTypes";

interface BookCardProps {
  book: Book;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="book-item-container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {book.cover_i ? (
        <img
          className="book-item-cover"
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={book.title}
        />
      ) : (
        <div className="no-cover">No Cover</div>
      )}
      <p className="book-item-title">{book.title}</p>
    </div>
  );
};

export default React.memo(BookCard);
