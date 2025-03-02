import React, { useState } from "react";
import "./FizzBuzz.css"; // Import the CSS file

const FizzBuzz: React.FC = () => {
  const [output, setOutput] = useState<string[]>([]);

  const handleFizzBuzz = () => {
    const result: string[] = [];
    for (let i = 1; i <= 100; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        result.push("FizzBuzz");
      } else if (i % 3 === 0) {
        result.push("Fizz");
      } else if (i % 5 === 0) {
        result.push("Buzz");
      } else {
        result.push(i.toString());
      }
    }
    setOutput(result);
  };

  return (
    <div className="fizzbuzz-container">
      <button onClick={handleFizzBuzz} className="fizzbuzz-button">
        Run FizzBuzz
      </button>
      <div className="fizzbuzz-output">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default FizzBuzz;
