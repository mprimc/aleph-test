import React, { useState } from "react";

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
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={handleFizzBuzz} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Run FizzBuzz
      </button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-line" }}>
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default FizzBuzz;
