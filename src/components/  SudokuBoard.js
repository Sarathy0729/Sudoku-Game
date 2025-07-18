import React from 'react';
import Tile from './Tile';

const SudokuBoard = ({ puzzle, currentInput, onInputChange, error }) => {
    // console.log("SudoKuBoard-currentInput",currentInput);
    // console.log("SudokuBoard-puzzle",puzzle);
    // console.log("SudokuBoard-oninputChange",onInputChange)
    // console.log("SudokuBoard-error",error)
  return (
    <div className="container">
      <div id="box">
        {currentInput.map((row, r) =>
          row.map((val, c) => (
            // console.log(`mapfunctions---${''}-----${r}-------${c}---${val}`),
            
            <Tile
              key={`${r}-${c}`}
              value={val}
              isFixed={puzzle[r][c] !== 0}
              onChange={(e) => onInputChange(e, r, c)}
              // errorDisabled={error >= 3}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
