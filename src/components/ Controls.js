import React from 'react';
import { FaUndo } from "react-icons/fa";

const Controls = ({ onSolve, onReset, onClear, handleUndo, handleHint, error, hintsLeft, paused, handlePause, handleResume }) => {
  return (
    <div>
      <button id="solve" onClick={onSolve} disabled={error >= 3}>Solve</button>
      <button id="reset" onClick={onReset}>New Game</button>
      <button id="clear" onClick={onClear} disabled={error >= 3}>Clear</button>
      <button id="undo" onClick={handleUndo}>Undo</button>
      <button id="hint" onClick={handleHint} disabled={hintsLeft <= 0 || error >= 3}>Hint</button>
      {paused ? (
        <button id="resume" onClick={handleResume}>Resume</button>
      ) : (
        <button  id="pause" onClick={handlePause}>Pause</button>
      )}
    </div>
  );
};


export default Controls;
