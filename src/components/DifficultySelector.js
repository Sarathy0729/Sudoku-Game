import React from 'react';

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    </div>
  );
};

export default DifficultySelector;
