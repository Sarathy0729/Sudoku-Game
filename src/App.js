import React, { useEffect, useState } from 'react';
import './App.css';
import SudokuBoard from './components/  SudokuBoard';
import Controls from './components/ Controls';
import DifficultySelector from './components/DifficultySelector';
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
  console.log("puzzle",puzzle);
  const [currentInput, setCurrentInput] = useState(box);
  console.log("currentInput44444",currentInput);
  const [error, setError] = useState(0);
  console.log("error",error);
  const [difficulty, setDifficulty] = useState('easy');
  const [history, setHistory] = useState([]);
  const [seconds, setSeconds] = useState(0);
  console.log("second",seconds);
  const [timerActive, setTimerActive] = useState(true);
  const [paused, setPaused] = useState(false);




useEffect(() => {
  let interval = null;

  if (timerActive && !paused) {
    interval = setInterval(() => {
      setSeconds((sec) => sec + 1);
    }, 1000);
  } else {
    clearInterval(interval);
  }

  return () => clearInterval(interval);
}, [timerActive, paused]);



  function shuffleArray(array) {
    console.log("arr-length",array.length);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

  function isValid(board, row, col, num) {
  //  console.log("board22s2",board);
  // console.log("row",row);
  // console.log("col",col);
  // console.log("num",num);
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

  const handleInputChange = (e, row, col) => {
//  console.log("e",e.target.value);
    if (error >= 3) return;
    const val = parseInt(e.target.value);
    if (!val || val < 1 || val > 9) return;
     setHistory((prev) => [...prev, currentInput.map(r => [...r])]);

    const updatedInput = currentInput.map(r => [...r]); 
  

   
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
  // const handleUndo =()=>{
  //   console.log("remove one move");
  //     sethistory(currentInput.map(row=>[...row]) );  
    
  // }
  const handleUndo = () => {
    if (history.length === 0 || error >= 3) return;

  const previous = history[history.length - 1];
  setCurrentInput(previous);

  setHistory((prev) => prev.slice(0, -1));


};


  const generateRandom9x9 = () => {
    // console.log("11",box.map(row => [...row]));
    // console.log("22",box);
    // let newBoard = box.map(row => [...row]);
    // console.log("newBoard1",newBoard);
    let numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let i = 0; i < 9; i++) {
      box[Math.floor(i / 3) * 3 + Math.floor(i / 3)][(i % 3) * 3 + (i % 3)] = numbers[i];
            //  [       ( 0/3)   * 3  +          (  0/3 )]  [  (0 %3)   * 3  +  ( 0 % 3)]  = [0]
      //     [        0        +                 0 ]    [       0      +          0]  = 1 --[0,0]= 1         
     //   [        (1/3)   *3   +           ( 1/3 )]   [(1 % 3 )    * 3  +  ( 1 % 3)] =n[1]
    //          [     1       ][    1]= 2 ---[1,1]=2
     //   [          ]
     //   [        ( 2/3)   *3   +            (2/3) ]   [(2 % 3  )     *3  +  (2 % 3)] =n[2]
    //            
     //   [         (3/3)   *3    +            (3/3)]    [(3%3)      *3 +  ( 3 % 3)] = n[3]     ]
    }

    solveSudoku(box);


    const puzzleCopy = box.map(row => [...row]);

    let empty = 40;
    if (difficulty === "easy")
      { 
        empty = Math.floor(Math.random() * 10) + 20;
        console.log("easy",empty);
      }
    else if(difficulty === "medium"){ 
      empty = Math.floor(Math.random() * 10) + 35;
      console.log("medium",empty)
    }
    else if (difficulty === "hard") {
      empty = Math.floor(Math.random() * 10) + 50;
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
     setSeconds(0);
setTimerActive(true);

  };

  const solvePuzzle = () => {
    if (error >= 3) return;
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

  useEffect(() => {
    generateRandom9x9();
  }, [difficulty]);

  useEffect(() => {
    if (error >= 3) {
      alert("GameOver You reached the maximum number of errors.");
      generateRandom9x9()
    }
  }, [error]);

  return (
    <div className="app">
      <h1>Sudoku</h1>
      <hr />
      
      <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
      <h2>Errors: <span>{error}</span> / 3</h2>
      <h2>
  Time: {Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}
  :
  {(seconds % 60).toString().padStart(2, '0')}
</h2>

      <SudokuBoard puzzle={puzzle} currentInput={currentInput} onInputChange={handleInputChange} error={error} />
      <Controls
        onSolve={solvePuzzle}
        onReset={resetGame}
        onClear={clearInputs}
        handleUndo={handleUndo}
        error={error}
      />
      <button onClick={() => setPaused(prev => !prev)}>
  {paused ? 'Resume' : 'Pause'}
</button>

    </div>
  );
};

export default App;


