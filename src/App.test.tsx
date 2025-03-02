import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
  it("renders the App component with all child components", () => {
    render(<App />);

    // Check if FizzBuzz component is rendered
    expect(screen.getByRole("button", { name: /run fizzbuzz/i })).toBeInTheDocument();

    // Check if BookInfo component is rendered
    expect(screen.getByRole("button", { name: /load book info/i })).toBeInTheDocument();

    // Check if BookList component is rendered
    expect(screen.getByPlaceholderText(/search for a book/i)).toBeInTheDocument();
  });
});
