import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BookInfo from "./BookInfo";
import * as bookInfoHook from "../hooks/useBookInfo";

vi.mock("../../hooks/useBookInfo");

describe("BookInfo Component", () => {
  let mockFetchBook: () => Promise<void>;

  beforeEach(() => {
    mockFetchBook = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(bookInfoHook, "useBookInfo").mockReturnValue({
      book: null,
      loading: false,
      error: null,
      fetchBook: mockFetchBook,
    });
  });

  it("renders the load button", () => {
    render(<BookInfo />);
    expect(screen.getByText("Load Book Info")).toBeInTheDocument();
  });

  it("shows loading state when fetching", () => {
    vi.spyOn(bookInfoHook, "useBookInfo").mockReturnValue({
      book: null,
      loading: true,
      error: null,
      fetchBook: vi.fn(),
    });

    render(<BookInfo />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message when fetch fails", () => {
    vi.spyOn(bookInfoHook, "useBookInfo").mockReturnValue({
      book: null,
      loading: false,
      error: "Failed to fetch book",
      fetchBook: vi.fn(),
    });

    render(<BookInfo />);
    expect(screen.getByText("Failed to fetch book")).toBeInTheDocument();
  });

  it("displays book details when fetched", () => {
    vi.spyOn(bookInfoHook, "useBookInfo").mockReturnValue({
      book: {
        coverImage: "https://covers.openlibrary.org/b/id/123456-L.jpg",
        title: "Mock Book",
        authors: "Mock Author",
        publishDate: "2023",
        physicalFormat: "Hardcover",
      },
      loading: false,
      error: null,
      fetchBook: vi.fn(),
    });

    render(<BookInfo />);
    expect(screen.getByText("Mock Book")).toBeInTheDocument();
    expect(screen.getByText("Mock Author")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("Hardcover")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /mock book/i })).toHaveAttribute(
      "src",
      "https://covers.openlibrary.org/b/id/123456-L.jpg"
    );
  });

  it("calls fetchBook when button is clicked", async () => {
    render(<BookInfo />);

    const button = screen.getByText("Load Book Info");
    fireEvent.click(button);

    await waitFor(() => expect(mockFetchBook).toHaveBeenCalled());
  });
});
