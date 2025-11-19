import React, { useState } from "react";

function BlockchainExplorer() {
  const [hashInput, setHashInput] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = () => {
    // Since chains are in backend memory, here we just mock a check
    setResult(
      hashInput
        ? `Block ${hashInput.substring(0, 10)}... would be validated against blockchain.`
        : "Enter a block hash to validate"
    );
  };

  return (
    <div>
      <h2>Blockchain Explorer</h2>
      <input
        placeholder="Enter block hash"
        value={hashInput}
        onChange={(e) => setHashInput(e.target.value)}
      />
      <button onClick={handleCheck}>Validate</button>

      <p>{result}</p>
      <p>
        Note: Full validation requires backend integration and multi-level blockchain.
      </p>
    </div>
  );
}

export default BlockchainExplorer;
