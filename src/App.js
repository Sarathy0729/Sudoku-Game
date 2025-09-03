import React, { useEffect, useState } from 'react';
import './App.css';
import SudokuBoard from './components/  SudokuBoard';
import Controls from './components/ Controls';
import DifficultySelector from './components/DifficultySelector';
import Rules from './components/Rules';
import { AiOutlineBulb } from "react-icons/ai";
import { IoTimeSharp } from "react-icons/io5";
import { BiMessageAltDetail } from "react-icons/bi";



const App = () => {
 let box = Array.from({ length: 9 }, () => Array(9).fill(0));
  const [solution, setSolution] = useState(box);
  const [puzzle, setPuzzle] = useState(box);
  const [currentInput, setCurrentInput] = useState(box);
  const [error, setError] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [history, setHistory] = useState([]);
console.log("history0012",history);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [isUserSolving, setIsUserSolving] = useState(true);
  const [rules,setRules]=useState(false);
  const [sudokuType, setSudokuType] = useState("standard");
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  console.log("selectedcell",selectedCell);
  const [samuraiGrids, setSamuraiGrids] = useState({
  gridTopLeft: Array(9).fill(0).map(() => Array(9).fill(0)),
  gridTopRight: Array(9).fill(0).map(() => Array(9).fill(0)),
  gridCenter: Array(9).fill(0).map(() => Array(9).fill(0)),
  gridBottomLeft: Array(9).fill(0).map(() => Array(9).fill(0)),
  gridBottomRight: Array(9).fill(0).map(() => Array(9).fill(0)),
});
console.log("samuraiGrid",samuraiGrids);

const generateSamuraiSudoku = () => {
  const createEmptyGrid = () => Array.from({ length: 9 }, () => Array(9).fill(0));

  let TL = createEmptyGrid();
  let TR = createEmptyGrid();
  let C  = createEmptyGrid();
  let BL = createEmptyGrid();
  let BR = createEmptyGrid();

  let center = createEmptyGrid();
  let nums = shuffleArray([1,2,3,4,5,6,7,8,9]);
  for (let i = 0; i < 9; i++) {
    center[Math.floor(i / 3) * 3 + Math.floor(i / 3)][(i % 3) * 3 + (i % 3)] = nums[i];
  }
  solveSudoku(center); 

  
  for (let r = 6; r < 9; r++) {
    for (let c = 6; c < 9; c++) {
      TL[r][c] = center[r - 6][c - 6];
    }
  }
  for (let r = 6; r < 9; r++) {
    for (let c = 0; c < 3; c++) {
      TR[r][c] = center[r - 6][c + 6];
    }
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 6; c < 9; c++) {
      BL[r][c] = center[r + 6][c - 6];
    }
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      BR[r][c] = center[r + 6][c + 6];
    }
  }


  solveSudoku(TL);
  solveSudoku(TR);
  solveSudoku(BL);
  solveSudoku(BR);


  const removeCells = (grid) => {
    console.log("grid__",grid);
    let empty  = 0;
    if (difficulty === "easy")
      { 
        empty = Math.floor(Math.random() * 10) + 20;
        
      }
    else if(difficulty === "medium"){ 
      empty = Math.floor(Math.random() * 10) + 35;
       
    }
    else if (difficulty === "hard") {
      empty = Math.floor(Math.random() * 10) + 50;
      
    }
    let puzzle = grid.map(row => [...row]);
    console.log("puzzle00123",puzzle);
    
   
    while (empty > 0) {
      let r = Math.floor(Math.random() * 9);
      let c = Math.floor(Math.random() * 9);
      if (puzzle[r][c] !== 0) {
        puzzle[r][c] = 0;
        empty--;
      }
    }
    return puzzle;
  };

  setSamuraiGrids({
    gridTopLeft: removeCells(TL),
    gridTopRight: removeCells(TR),
    gridCenter: removeCells(center),
    gridBottomLeft: removeCells(BL),
    gridBottomRight: removeCells(BR),
  });

  setSolution({ TL, TR, C: center, BL, BR });
  setSeconds(0);
};

  useEffect(() => {
  let interval = null;
  if (timerActive && !paused) {
    interval = setInterval(() => {
      setSeconds((sec) => {
        if (sec + 1 >= 300) { 
          clearInterval(interval);
          setTimerActive(false);
          alert("Time's up! Game Over.");
          generateRandom9x9(); 
          setSeconds(0);
          return 0;
        }
        return sec + 1;
      });
    }, 1000);
  }

  return () => clearInterval(interval);
}, [timerActive, paused]);

const handlePause = () => setPaused(true);
const handleResume = () => setPaused(false);

const handleHint = () => {
  if (hintsLeft <= 0 || error >= 3) return;
if (sudokuType === "samurai") {
    const gridKeys = ["gridTopLeft", "gridTopRight", "gridCenter", "gridBottomLeft", "gridBottomRight"];
    let emptyCells = [];
    gridKeys.forEach((key) => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (samuraiGrids[key][r][c] === 0) {
            emptyCells.push({ grid: key, r, c });
          }
        }
      }
    });

    if (emptyCells.length === 0) return; 
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { grid, r, c } = emptyCells[randomIndex];

    const updatedGrids = JSON.parse(JSON.stringify(samuraiGrids));

    const solutionGridMap = {
      gridTopLeft: solution.TL,
      gridTopRight: solution.TR,
      gridCenter: solution.C,
      gridBottomLeft: solution.BL,
      gridBottomRight: solution.BR,
    };

    updatedGrids[grid][r][c] = solutionGridMap[grid][r][c]; 

    setSamuraiGrids(updatedGrids);
    setHintsLeft((prev) => prev - 1);
  } 
  else {
    const emptyCells = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentInput[r][c] === 0) emptyCells.push({ r, c });
      }
    }

    if (emptyCells.length === 0) return;
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { r, c } = emptyCells[randomIndex];

    const updatedInput = currentInput.map((row) => [...row]);
    updatedInput[r][c] = solution[r][c]; 

    setCurrentInput(updatedInput);
    setHintsLeft((prev) => prev - 1);
    }
};




function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

  function isValid(board, row, col, num) {
    console.log("row",row);
    console.log("col",col);
  for (let x = 0; x < 9; x++) {
    if (
      board[row][x] === num ||
      board[x][col] === num ||
      board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
        3 * Math.floor(col / 3) + (x % 3)
      ] === num 
    ) {
      return false;
    }
  }
  if(sudokuType === "hyper"){
 const hyperBoxes = [
    { rowStart: 1, colStart: 1 }, 
    { rowStart: 1, colStart: 5 }, 
    { rowStart: 5, colStart: 1 }, 
    { rowStart: 5, colStart: 5 }, 
  ];
    for (let box of hyperBoxes) {
    const { rowStart, colStart } = box;
    if (  row >= rowStart &&  row < rowStart + 3 &&    col >= colStart &&  col < colStart + 3 ) {
    
      
      for (let r = rowStart; r < rowStart + 3; r++) {
        for (let c = colStart; c < colStart + 3; c++) {
  if (board[r][c] === num) {
            return false;
          }
        }
      }
    }
  }


  return true;

  }
 
  return true;
}

  function solveSudoku(board) {
   
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

 const handleInputChange = (e, row, col, gridKey ) => {
  if (error >= 3) return;
  setIsUserSolving(true);

  const val = parseInt(e.target.value);
  if (!val || val < 1 || val > 9) return;

  
  if (sudokuType !== "samurai") {
    setHistory((premove) => [...premove, currentInput.map(r => [...r])]);
  } else {
    
    setHistory((premove) => [...premove, JSON.parse(JSON.stringify(samuraiGrids))]);
  }

  if (sudokuType === "samurai") {
    console.log("samurai1230988")
    const updatedGrids = { ...samuraiGrids };
    console.log("hello888",updatedGrids);
    const currentGrid = updatedGrids[gridKey].map(r => [...r]);
    console.log("676788",currentGrid)

    if (isValid(currentGrid, row, col, val,)) {
      console.log("hellosamurai-66767")
      currentGrid[row][col] = val;
      if (gridKey === "gridTopLeft" && row >= 6 && col >= 6) {
        console.log("123");
        updatedGrids.gridCenter[row - 6][col - 6] = val;
      }
      if (gridKey === "gridTopRight" && row >= 6 && col < 3) {
        console.log("456")
        updatedGrids.gridCenter[row - 6][col + 6] = val;
      }
      if (gridKey === "gridBottomLeft" && row < 3 && col >= 6) {
        console.log("789")
        updatedGrids.gridCenter[row + 6][col - 6] = val;
      }
      if (gridKey === "gridBottomRight" && row < 3 && col < 3) {
        console.log("0987")
        updatedGrids.gridCenter[row + 6][col + 6] = val;
      }
      if (gridKey === "gridCenter") {
        console.log("centere2323")
        if (row < 3 && col < 3) updatedGrids.gridTopLeft[row + 6][col + 6] = val;
        if (row < 3 && col >= 6) updatedGrids.gridTopRight[row + 6][col - 6] = val;
        if (row >= 6 && col < 3) updatedGrids.gridBottomLeft[row - 6][col + 6] = val;
        if (row >= 6 && col >= 6) updatedGrids.gridBottomRight[row - 6][col - 6] = val;
      }

      e.target.classList.remove('invalid');
      e.target.classList.add('valid');
    } else {
      currentGrid[row][col] = val;
      setError(error => error + 1);
      e.target.classList.remove('valid');
      e.target.classList.add('invalid');
      }

    updatedGrids[gridKey] = currentGrid;
    setSamuraiGrids(updatedGrids);

  } else {
    
    const updatedInput = currentInput.map(r => [...r]);
    if (isValid(updatedInput, row, col, val, sudokuType, samuraiGrids)) {
      updatedInput[row][col] = val;
      e.target.classList.remove('invalid');
      e.target.classList.add('valid');
    } else {
      updatedInput[row][col] = val;
      setError(error => error + 1);
      e.target.classList.remove('valid');
      e.target.classList.add('invalid');
    }
    setCurrentInput(updatedInput);
   }
};

const handleUndo = () => {
  if (history.length === 0 || error >= 3) return;

  const previous = history[history.length - 1];

  if (sudokuType === "samurai") {
  
    setSamuraiGrids(previous);
  } else {
    
    setCurrentInput(previous);
  }

 
  setHistory((prev) => prev.slice(0, -1));
};


  const generateRandom9x9 = () => {
    
    let numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let i = 0; i < 9; i++) {
      box[Math.floor(i / 3) * 3 + Math.floor(i / 3)][(i % 3) * 3 + (i % 3)] = numbers[i];   
    }
    solveSudoku(box);
    const puzzleCopy = box.map(row => [...row]);
    let empty = 40;
    if (difficulty === "easy")
      { 
        empty = Math.floor(Math.random() * 10) + 20;
          setSeconds(0);
      }
    else if(difficulty === "medium"){ 
      empty = Math.floor(Math.random() * 10) + 35;
        setSeconds(0);
    }
    else if (difficulty === "hard") {
      empty = Math.floor(Math.random() * 10) + 50;
        setSeconds(0);
    }
    while (empty > 0) {
      let r = Math.floor(Math.random() * 9);
      let c = Math.floor(Math.random() * 9);
      if (puzzleCopy[r][c] !== 0) {
        puzzleCopy[r][c] = 0;
        empty--;
      }
    }
    setSolution(box);
    setPuzzle(puzzleCopy);
    setCurrentInput(puzzleCopy.map(row => [...row]));
    setError(0);
     setHistory([]);
       setHintsLeft(3);
  };

const solvePuzzle = () => {
  if (error >= 3) return;
  setIsUserSolving(false);

  if (sudokuType === "samurai") {
    setSamuraiGrids({
      gridTopLeft: solution.TL.map(row => [...row]),
      gridTopRight: solution.TR.map(row => [...row]),
      gridCenter: solution.C.map(row => [...row]),
      gridBottomLeft: solution.BL.map(row => [...row]),
      gridBottomRight: solution.BR.map(row => [...row]),
    });
  } else {
    setCurrentInput(solution.map(row => [...row]));
  }
};

  const clearInputs = () => {
    if (error >= 3) return;
    if(sudokuType === "samurai"){
     console.log("");

    }
    else{
    const cleared = puzzle.map((row, r) =>
      row.map((val, c) => (val === 0 ? 0 : currentInput[r][c]))
    );
    setCurrentInput(cleared);
  }
  };
 const resetGame = () => {
  setError(0);
  setHistory([]);
  setHintsLeft(3);
  setSeconds(0);
  if (sudokuType === "samurai") {
    generateSamuraiSudoku(); 
  } else {
    generateRandom9x9();
  }
};
    const isPuzzleSolved = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentInput[r][c] === 0 || currentInput[r][c] !== solution[r][c]) {
          return false;
        }
      }
    }
    return true;
  };
    useEffect(() => {
    if (isUserSolving && isPuzzleSolved()) {
      alert(" Congratulations! You solved the puzzle!");
      setTimerActive(false);
      // setPaused(true);
    }
  }, [currentInput]);

useEffect(() => {
  if (sudokuType === "samurai") {
    generateSamuraiSudoku();
  } else {
    generateRandom9x9();
  }
}, [difficulty, sudokuType]);


useEffect(() => {
  if (error >= 3) {
    alert("Game Over! You reached the maximum number of errors.");
    if (sudokuType === "samurai") {
      generateSamuraiSudoku();
    } else {
      generateRandom9x9();
    }
  }
}, [error]);

  const handlerule = ()=>{
    setRules(!rules);
  }

  return (
  <div className="app">
    <h1>Sudoku </h1>
   
    <hr />
     <span id="icon" onClick={handlerule}>Rules  <BiMessageAltDetail /></span>
{rules && <Rules onClose={handlerule} sudokuType={sudokuType} />}
    {paused ? (
      <div className="pause-overlay">
        <div className="pause-message">
          <h2>Paused</h2>
          <button onClick={handleResume}>Resume</button>
        </div>
      </div>
    ) : (
      <>
        <div className="top-info-bar">
  <div className="status-item">
    <IoTimeSharp className="icon" />
    <span className="status-label">Time Left:</span>
    <span className="status-value time_sec">
      {Math.floor((300 - seconds) / 60)}:{String((300 - seconds) % 60).padStart(2, '0')}
    </span>
  </div>

  <div className="status-item">
    <span className="status-label">Difficulty :</span>
    <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
  </div>

  <div className="status-item">
    <span className="status-label">Type:</span>
    <select
      value={sudokuType}
      onChange={(e) => setSudokuType(e.target.value)}
      className="sudoku-type-select"
    >
      <option value="standard">Sudoku</option>
      <option value="hyper">Hyper Sudoku</option>
      <option value="samurai">Samurai Sudoku</option>
    </select>
  </div>

  <div className="status-item">
    <AiOutlineBulb className="icon" />
    <span className="status-label">Hints:</span>
    <span className="status-value hint_count">{hintsLeft} / 3</span>
  </div>

  <div className="status-item">
    <span className="status-label">Errors:</span>
    <span id="error" className="status-value error-count">{error} / 3</span>
  </div>
</div>

        <h2 className='hint'></h2>
        
   { sudokuType === "samurai" ? (
  <div className="samurai-container">
    <div className="samurai-row">
      <SudokuBoard 
       gridKey="gridTopLeft"
        puzzle={samuraiGrids.gridTopLeft}
        currentInput={samuraiGrids.gridTopLeft}
        onInputChange={(e, r, c) => handleInputChange(e, r, c, "gridTopLeft")}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        sudokuType={sudokuType}
      />
      <SudokuBoard 
       gridKey="gridTopRight"
        puzzle={samuraiGrids.gridTopRight}
        currentInput={samuraiGrids.gridTopRight}
        onInputChange={(e, r, c) => handleInputChange(e, r, c, "gridTopRight")}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        sudokuType={sudokuType}
      />
    </div>
    <div className="samurai-center">
      <SudokuBoard 
       gridKey="gridTopCenter"
        puzzle={samuraiGrids.gridCenter}
        currentInput={samuraiGrids.gridCenter}
        onInputChange={(e, r, c) => handleInputChange(e, r, c, "gridCenter")}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        sudokuType={sudokuType}
      />
    </div>
    <div className="samurai-row">
      <SudokuBoard 
       gridKey="gridBottomLeft"
        puzzle={samuraiGrids.gridBottomLeft}
        currentInput={samuraiGrids.gridBottomLeft}
        onInputChange={(e, r, c) => handleInputChange(e, r, c, "gridBottomLeft")}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        sudokuType={sudokuType}
      />
      <SudokuBoard 
       gridKey="gridBottomRight"
        puzzle={samuraiGrids.gridBottomRight}
        currentInput={samuraiGrids.gridBottomRight}
        onInputChange={(e, r, c) => handleInputChange(e, r, c, "gridBottomRight")}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        sudokuType={sudokuType}
      />
    </div>
  </div>
) : ( 
  <SudokuBoard
    puzzle={puzzle}
    currentInput={currentInput}
    onInputChange={handleInputChange}
    selectedCell={selectedCell}
    setSelectedCell={setSelectedCell}
    sudokuType={sudokuType}
  />
    )}



       <Controls
  onSolve={solvePuzzle}
  onReset={resetGame}
  onClear={clearInputs}
  handleUndo={handleUndo}
  handleHint={handleHint}
  error={error}
  hintsLeft={hintsLeft}
  paused={paused}
  handlePause={handlePause}
  handleResume={handleResume}
/>

      </>
    )}
  </div>
);

};
export default App;
