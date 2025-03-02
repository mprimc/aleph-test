import { renderHook } from "@testing-library/react";
import { useBooks } from "../hooks/useBooks";
import { Book } from "../types/bookTypes";
import { vi } from "vitest";
import { act } from "react";

vi.mock("lodash/debounce", () => ({
  default: (fn: any) => fn,
}));

describe("useBooks Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("initially returns empty books array, no error, and not loading", () => {
    const { result } = renderHook(() => useBooks());

    expect(result.current.books).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("fetches books successfully", async () => {
    const mockBooks: Book[] = [
      {
        key: "book1",
        title: "1984",
        cover_i: 789,
        author_name: ["George Orwell"],
        first_publish_year: 1949,
        number_of_pages_median: 328,
        physical_format: "Hardcover",
        weight: "500g",
      },
    ];

    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        docs: mockBooks,
      }),
    } as Response);

    const { result } = renderHook(() => useBooks());

    act(() => {
      result.current.setQuery("1984");
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(fetchSpy).toHaveBeenCalledWith("https://openlibrary.org/search.json?title=1984");
    expect(result.current.loading).toBe(false);
    expect(result.current.books).toEqual(mockBooks);
    expect(result.current.error).toBeNull();
  });

  it("sets an error if the fetch request fails", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
    } as Response);

    const { result } = renderHook(() => useBooks());

    act(() => {
      result.current.setQuery("Unknown Book");
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(fetchSpy).toHaveBeenCalledWith("https://openlibrary.org/search.json?title=Unknown Book");
    expect(result.current.loading).toBe(false);
    expect(result.current.books).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch books");
  });

  it("does not fetch when query is less than 3 characters", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");

    const { result } = renderHook(() => useBooks());

    act(() => {
      result.current.setQuery("Hi");
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.current.books).toEqual([]);
  });

  it("debounces fetch calls to prevent excessive API requests", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        docs: [],
      }),
    } as Response);

    const { result } = renderHook(() => useBooks());

    act(() => {
      result.current.setQuery("Harry Potter");
      result.current.setQuery("The Hobbit");
      result.current.setQuery("1984");
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
