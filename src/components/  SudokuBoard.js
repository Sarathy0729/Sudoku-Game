import React from 'react';
import Tile from './Tile';

const SudokuBoard = ({ puzzle, currentInput, onInputChange, selectedCell, setSelectedCell }) => {
  //  console.log("puzzzle-1",puzzle);
  //  console.log("currentInput-1",currentInput);
  // console.log("oninputchnage-1",onInputChange);
  const isHighlighted = (r, c) => {
  if (selectedCell.row === null || selectedCell.col === null) return false;
  const inRow = r === selectedCell.row;
  const inCol = c === selectedCell.col;
  const inBox =
    Math.floor(r / 3) === Math.floor(selectedCell.row / 3) &&
    Math.floor(c / 3) === Math.floor(selectedCell.col / 3);

  return inRow || inCol || inBox;
};

  return (
    <div className="container">
      <div id="box">
        {currentInput.map((row, r) =>
          row.map((val, c) => ( 
            // console.log(`row${row}--r${r}--val${val}---c${c}`),
            
          <Tile
  key={`${r}-${c}`}
  value={val}
  isFixed={puzzle[r][c] !== 0}
  onChange={(e) => onInputChange(e, r, c)}
  onFocus={() => setSelectedCell({ row: r, col: c })}
  highlighted={isHighlighted(r, c)}
/>

          ))
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
