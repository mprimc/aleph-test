import React from "react";
import "./BookCard.css";

interface BookCardProps {
  title: string;
  coverId?: number;
}

const BookCard: React.FC<BookCardProps> = ({ title, coverId }) => {
  return (
    <div className="book-item-container">
      {coverId ? (
        <img
          className="book-item-cover"
          src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
          alt={title}
        />
      ) : (
        <div className="no-cover">No Cover</div>
      )}
      <p className="book-item-title">{title}</p>
    </div>
  );
};

export default React.memo(BookCard);
