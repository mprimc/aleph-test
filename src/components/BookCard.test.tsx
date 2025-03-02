import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BookCard from "./BookCard";
import { Book } from "../types/bookTypes";

describe("BookCard Component", () => {
  it("renders the book title", () => {
    const mockBook: Book = {
      key: "123",
      title: "Test Book",
      cover_i: 987654,
    };

    render(<BookCard book={mockBook} />);

    expect(screen.getByText("Test Book")).toBeInTheDocument();
  });

  it("renders book cover image when available", () => {
    const mockBook: Book = {
      key: "123",
      title: "Test Book with Cover",
      cover_i: 987654,
    };

    render(<BookCard book={mockBook} />);

    const img = screen.getByRole("img", { name: /test book with cover/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://covers.openlibrary.org/b/id/987654-L.jpg");
  });

  it("renders 'No Cover' when cover image is missing", () => {
    const mockBook: Book = {
      key: "456",
      title: "Book Without Cover",
    };

    render(<BookCard book={mockBook} />);

    expect(screen.getByText("No Cover")).toBeInTheDocument();
  });
});
