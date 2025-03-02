import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BookList from "./BookList";
import * as booksHook from "../hooks/useBooks";
import { Book } from "../types/bookTypes";

vi.mock("../../hooks/useBooks");

describe("BookList Component", () => {
  let mockSetQuery: React.Dispatch<React.SetStateAction<string>>;

  beforeEach(() => {
    mockSetQuery = vi.fn((value: string | ((prev: string) => string)) => {
      if (typeof value === "function") {
        return value("");
      }
      return value;
    });

    vi.spyOn(booksHook, "useBooks").mockReturnValue({
      books: [],
      loading: false,
      error: null,
      setQuery: mockSetQuery,
    });
  });

  it("renders search input", () => {
    render(<BookList />);
    const input = screen.getByPlaceholderText("Search for a book...");
    expect(input).toBeInTheDocument();
  });

  it("calls setQuery when typing in the search box", () => {
    render(<BookList />);
    const input = screen.getByPlaceholderText("Search for a book...");

    fireEvent.change(input, { target: { value: "Harry Potter" } });
    expect(mockSetQuery).toHaveBeenCalledWith("Harry Potter");
  });

  it("shows loading state when fetching books", () => {
    vi.spyOn(booksHook, "useBooks").mockReturnValue({
      books: [],
      loading: true,
      error: null,
      setQuery: mockSetQuery,
    });

    render(<BookList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message when fetching fails", () => {
    vi.spyOn(booksHook, "useBooks").mockReturnValue({
      books: [],
      loading: false,
      error: "Failed to fetch books",
      setQuery: mockSetQuery,
    });

    render(<BookList />);
    expect(screen.getByText("Failed to fetch books")).toBeInTheDocument();
  });

  it("renders book cards when books are available", () => {
    const mockBooks: Book[] = [
      {
        key: "book1",
        title: "The Great Gatsby",
        cover_i: 123,
        author_name: ["F. Scott Fitzgerald"],
        first_publish_year: 1925,
      },
      {
        key: "book2",
        title: "To Kill a Mockingbird",
        cover_i: 456,
        author_name: ["Harper Lee"],
        first_publish_year: 1960,
      },
    ];

    vi.spyOn(booksHook, "useBooks").mockReturnValue({
      books: mockBooks,
      loading: false,
      error: null,
      setQuery: mockSetQuery,
    });

    render(<BookList />);
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("To Kill a Mockingbird")).toBeInTheDocument();
  });

  it("displays book preview overlay on hover", async () => {
    const mockBooks: Book[] = [
      {
        key: "book1",
        title: "1984",
        cover_i: 789,
        author_name: ["George Orwell"],
        first_publish_year: 1949,
      },
    ];

    vi.spyOn(booksHook, "useBooks").mockReturnValue({
      books: mockBooks,
      loading: false,
      error: null,
      setQuery: vi.fn(),
    });

    render(<BookList />);
    const bookCard = screen.getByText("1984");

    fireEvent.mouseEnter(bookCard);

    await waitFor(() => {
      const overlay = screen.getByText("By: George Orwell").closest(".book-preview-overlay");
      expect(overlay).toBeInTheDocument();

      const overlayImage = overlay?.querySelector(".preview-image");
      expect(overlayImage).toBeInTheDocument();
      expect(overlayImage).toHaveAttribute("src", "https://covers.openlibrary.org/b/id/789-L.jpg");

      expect(screen.getByText(/By: George Orwell/i)).toBeInTheDocument();
      expect(screen.getByText(/Published: 1949/i)).toBeInTheDocument();
    });
  });
});
