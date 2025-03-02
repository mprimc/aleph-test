import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useBookInfo } from "./useBookInfo";
import { act } from "react";

const API_URL =
  "https://openlibrary.org/api/books?bibkeys=ISBN:9783442236862&jscmd=details&format=json";

describe("useBookInfo Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initially returns default state", () => {
    const { result } = renderHook(() => useBookInfo());

    expect(result.current.book).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("fetches book data successfully", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            "ISBN:9783442236862": {
              details: {
                title: "Test Book",
                authors: [{ name: "Test Author" }],
                publish_date: "2023",
                physical_format: "Hardcover",
              },
            },
          }),
      })
    ) as unknown as typeof fetch;

    const { result } = renderHook(() => useBookInfo());

    await act(async () => {
      await result.current.fetchBook();
    });

    expect(fetch).toHaveBeenCalledWith(API_URL);
    expect(result.current.book).toEqual({
      title: "Test Book",
      authors: "Test Author",
      publishDate: "2023",
      physicalFormat: "Hardcover",
      coverImage: "https://covers.openlibrary.org/b/ISBN/9783442236862-L.jpg",
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("handles API error response", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    ) as unknown as typeof fetch;

    const { result } = renderHook(() => useBookInfo());

    await act(async () => {
      await result.current.fetchBook();
    });

    expect(fetch).toHaveBeenCalledWith(API_URL);
    expect(result.current.book).toBeNull();
    expect(result.current.error).toBe("Failed to fetch book data. Status: 500");
    expect(result.current.loading).toBe(false);
  });

  it("handles missing book data in response", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as unknown as typeof fetch;

    const { result } = renderHook(() => useBookInfo());

    await act(async () => {
      await result.current.fetchBook();
    });

    expect(fetch).toHaveBeenCalledWith(API_URL);
    expect(result.current.book).toBeNull();
    expect(result.current.error).toBe("Book not found in API response");
    expect(result.current.loading).toBe(false);
  });
});
