import React from "react";
import "./BookCard.css";
import { Book } from "../types/bookTypes";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="book-item-container">
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
