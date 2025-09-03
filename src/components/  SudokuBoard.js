import React from 'react';
import Tile from './Tile';
const SudokuBoard = ({ puzzle, currentInput, onInputChange, selectedCell, setSelectedCell, sudokuType  }) => {
const isHighlighted = (r, c) => {
  // if (sudokuType === "samurai") return false;
  if (selectedCell.row === null || selectedCell.col === null) return false;
   const inRow = r === selectedCell.row;
   const inCol = c === selectedCell.col;
   const inBox =
    Math.floor(r / 3) === Math.floor(selectedCell.row / 3) &&
    Math.floor(c / 3) === Math.floor(selectedCell.col / 3);

  let inHyperBox = false;
  

  if (sudokuType === "hyper") {
    const hyperBoxes = [
      { rowStart: 1, colStart: 1 },
      { rowStart: 1, colStart: 5 },
      { rowStart: 5, colStart: 1 },
      { rowStart: 5, colStart: 5 },
    ];

    for (let box of hyperBoxes) {
      const { rowStart, colStart } = box;
      const isSelectedInHyperBox =
        selectedCell.row >= rowStart &&
        selectedCell.row < rowStart + 3 &&
        selectedCell.col >= colStart &&
        selectedCell.col < colStart + 3;

      const currentCellInHyperBox =
        r >= rowStart && r < rowStart + 3 &&
        c >= colStart && c < colStart + 3;

      if (isSelectedInHyperBox && currentCellInHyperBox) {
        inHyperBox = true;
        break;
      }
    }
  }
  

  return inRow || inCol || inBox || inHyperBox;
};


  return (
    <div className="container">
      <div id="box">
        {currentInput.map((row, r) =>
          row.map((val, c) => ( 
            <Tile
  key={`${r}-${c}`}
  value={val}
  isFixed={sudokuType !== "samurai" && puzzle[r][c] !== 0}
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
