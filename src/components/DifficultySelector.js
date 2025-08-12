import React from 'react';

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  return (
    <div className='difficulty'>
      <label>
        {/* Difficulty: */}
        <select className='diff_list'
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option  value="easy">Easy</option>
          <option  value="medium">Medium</option>
          <option   value="hard">Hard</option>
        </select>
      </label>
    </div>
  );
};

export default DifficultySelector;
