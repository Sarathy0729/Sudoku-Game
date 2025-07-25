import React, { useEffect, useState } from 'react';
import './App.css';
import SudokuBoard from './components/  SudokuBoard';
import Controls from './components/ Controls';
import DifficultySelector from './components/DifficultySelector';
import { GoGoal } from "react-icons/go";

const App = () => {
    let box = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
  const [solution, setSolution] = useState(box);
  console.log("solutions",solution);
  const [puzzle, setPuzzle] = useState(box);
  const [currentInput, setCurrentInput] = useState(box);
  // console.log("currentInput",currentInput);
  const [error, setError] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [history, setHistory] = useState([]);
   console.log("history-his",history);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  // console.log("timerActive",timerActive);
  const [paused, setPaused] = useState(false);
  // console.log("paused",paused);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [isUserSolving, setIsUserSolving] = useState(true);
  const [rules,setRules]=useState(false);
  // console.log("rules",rules);
  const [sudokuType, setSudokuType] = useState("standard");
  // console.log("sudokutype",sudokuType); 
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });





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
  const emptyCells = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (currentInput[r][c] === 0) {
        emptyCells.push({ r, c });
      }
    }
  }

  if (emptyCells.length === 0) return;
console.log("emptyCells",emptyCells);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  console.log("RandomIndex",randomIndex);

  const { r, c } = emptyCells[randomIndex];

  const updatedInput = currentInput.map(row => [...row]);
  updatedInput[r][c] = solution[r][c];

  setCurrentInput(updatedInput);
  setHintsLeft(prev => prev - 1);
};



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

  function isValid(board, row, col, num) {
    // console.log("num",num);
    // console.log("board_check",board);
    console.log("row_check",row);
    console.log("col_check",col);
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
  console.log("hello");
  if(sudokuType === "hyper"){
    console.log("its work properly");
 const hyperBoxes = [
    { rowStart: 1, colStart: 1 }, 
    { rowStart: 1, colStart: 5 }, 
    { rowStart: 5, colStart: 1 }, 
    { rowStart: 5, colStart: 5 }, 
  ];
    for (let box of hyperBoxes) {
      console.log("hyper-box",box);
    const { rowStart, colStart } = box;
    // console.log("rowStart",rowStart);
    // console.log("colStart",colStart);
    if (  row >= rowStart &&  row < rowStart + 3 &&    col >= colStart &&  col < colStart + 3 ) {
    
      
      for (let r = rowStart; r < rowStart + 3; r++) {
        for (let c = colStart; c < colStart + 3; c++) {
          //1 ; 1 < 4 ; 1++;
          //1 ; 1<4; 1++;

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
    // console.log("board",board);
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

  const handleInputChange = (e, row, col) => {
    if (error >= 3) return;
    setIsUserSolving(true);
    const val = parseInt(e.target.value);
    // console.log("valinput",val);
    //  console.log("row",row);
    //  console.log("col",col);
    if (!val || val < 1 || val > 9) return console.log("error makes clever");
     setHistory((premove) => [...premove, currentInput.map(r => [...r])]);

    const updatedInput = currentInput.map(r => [...r]); 
    console.log("updated",updatedInput);
  

   
    if (isValid(updatedInput, row, col, val)) {
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
  };
  const handleUndo = () => {
    if (history.length === 0 || error >= 3) return;

  const previous = history[history.length - 1];
  console.log("previous_data",previous)
  setCurrentInput(previous);

  setHistory((prev) => prev.slice(0, -1));


};

  const generateRandom9x9 = () => {
    let numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let i = 0; i < 9; i++) {
      box[Math.floor(i / 3) * 3 + Math.floor(i / 3)][(i % 3) * 3 + (i % 3)] = numbers[i];
       // i = 0 → box[0 * 3 + 0][0 * 3 + 0] = box[0][0] = [0];
       // i = 1 → box[0 * 3 + 0][1 * 3 + 1] = box[0][4] = [1];
       // i = 2 → box[0 * 3 + 0][2 * 3 + 2] = box[0][8] = [2];
       // i = 3 → box[1 * 3 + 1][0 * 3 + 0] = box[4][0]
       // i = 4 → box[1 * 3 + 1][1 * 3 + 1] = box[4][4]
       // i = 5 → box[1 * 3 + 1][2 * 3 + 2] = box[4][8]
       // i = 6 → box[2 * 3 + 2][0 * 3 + 0] = box[8][0]
      // i = 7 → box[2 * 3 + 2][1 * 3 + 1] = box[8][4]
      // i = 8 → box[2 * 3 + 2][2 * 3 + 2] = box[8][8]

      //  console.log("box--box",box);
    }
   

    solveSudoku(box);


    const puzzleCopy = box.map(row => [...row]);

    let empty = 40;
    if (difficulty === "easy")
      { 
        empty = Math.floor(Math.random() * 10) + 20;
        console.log("easy",empty);
          setSeconds(0);
      }
    else if(difficulty === "medium"){ 
      empty = Math.floor(Math.random() * 10) + 35;
        setSeconds(0);
      console.log("medium",empty)
    }
    else if (difficulty === "hard") {
      empty = Math.floor(Math.random() * 10) + 50;
        setSeconds(0);
      console.log("hard",Math.floor(Math.random() * 10) + 50)
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
    setCurrentInput(solution.map(row => [...row]));
  };

  const clearInputs = () => {
    if (error >= 3) return;
    const cleared = puzzle.map((row, r) =>
      row.map((val, c) => (val === 0 ? 0 : currentInput[r][c]))
    );
    setCurrentInput(cleared);
  };

  const resetGame = () => generateRandom9x9();
  
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
    generateRandom9x9();
  }, [difficulty,sudokuType]);

  useEffect(() => {
    if (error >= 3) {
      alert("GameOver You reached the maximum number of errors.");
      generateRandom9x9()
    }
  }, [error]);
  const handlerule = ()=>{
    console.log("rules----sudoku")
    setRules(!rules);
  }

  return (
  <div className="app">
    <h1>Sudoku </h1>
    {/* <span id="icon" onClick={handlerule}><GoGoal size={20} /></span> */}
   {rules ?(
    <div>
      <ul  className='rules'>
        <li> The puzzle is played on a 9x9 grid, which is further divided into nine 3x3 subgrids . </li>
        <li> The grid is filled with numbers from 1 to 9.</li>
        <li> Each row must contain the numbers 1 through 9, with no repetitions. </li>
        <li> Each column must contain the numbers 1 through 9, with no repetitions. </li>
        <li> Each of the nine 3x3 subgrids must contain the numbers 1 through 9, with no repetitions. </li>
        <li> A valid Sudoku puzzle has only one unique solution. </li>

      </ul>

    </div>) : ('')}
    <hr />
    {paused ? (
      <div className="pause-overlay">
        <div className="pause-message">
          <h2>Paused</h2>
          <button onClick={handleResume}>Resume</button>
        </div>
      </div>
    ) : (
      <>
      
        <h2 className='time'>
          Time Left: <span className='time_sec'>{Math.floor((300 - seconds) / 60)}:
          {String((300 - seconds) % 60).padStart(2, '0')}</span>
        </h2>
        <h2 className='errors'>Errors: <span id="error">{error}</span> / 3</h2>

        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
<div className="sudoku-type-select">
  <label htmlFor="sudokuType">Sudoku Type:</label>
  <select
    id="sudokuType"
    value={sudokuType}
    onChange={(e) => setSudokuType(e.target.value)}
  >
    <option value="standard">Sudoku</option>
    <option value="hyper">Hyper Sudoku</option>
    <option value="samurai">Samurai Sudoku</option>
  </select>
</div>

        <h2 className='hint'>Hints Left: <span className="hint_count">{hintsLeft}</span> / 3</h2>


        <SudokuBoard
          puzzle={puzzle}
          currentInput={currentInput}
          onInputChange={handleInputChange}
            selectedCell={selectedCell}
           setSelectedCell={setSelectedCell}
          
              />

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
