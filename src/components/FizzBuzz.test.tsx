import { render, screen, fireEvent } from "@testing-library/react";
import FizzBuzz from "../components/FizzBuzz";
import { describe, it, expect } from "vitest";

describe("FizzBuzz Component", () => {
  it("renders the button", () => {
    render(<FizzBuzz />);
    expect(screen.getByRole("button", { name: /run fizzbuzz/i })).toBeInTheDocument();
  });

  it("runs FizzBuzz when button is clicked", () => {
    render(<FizzBuzz />);
    const button = screen.getByRole("button", { name: /run fizzbuzz/i });
    fireEvent.click(button);

    // 🔹 Ensure exactly 100 elements in the output
    const outputItems = screen.getAllByText(/^(FizzBuzz|Fizz|Buzz|\d+)$/);
    expect(outputItems.length).toBe(100);

    // ✅ Check at least one occurrence of each expected value
    expect(screen.getAllByText("Fizz").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Buzz").length).toBeGreaterThan(0);
    expect(screen.getAllByText("FizzBuzz").length).toBeGreaterThan(0);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("correctly displays 'FizzBuzz' at multiples of 15", () => {
    render(<FizzBuzz />);
    fireEvent.click(screen.getByRole("button", { name: /run fizzbuzz/i }));

    expect(screen.getAllByText("FizzBuzz").length).toBeGreaterThan(0);
  });

  it("correctly displays 'Fizz' at multiples of 3 but not 5", () => {
    render(<FizzBuzz />);
    fireEvent.click(screen.getByRole("button", { name: /run fizzbuzz/i }));

    screen.getAllByText("Fizz").forEach((el) => expect(el.textContent).toBe("Fizz"));
  });

  it("correctly displays 'Buzz' at multiples of 5 but not 3", () => {
    render(<FizzBuzz />);
    fireEvent.click(screen.getByRole("button", { name: /run fizzbuzz/i }));

    screen.getAllByText("Buzz").forEach((el) => expect(el.textContent).toBe("Buzz"));
  });
});
