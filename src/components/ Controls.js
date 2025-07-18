import React from 'react';

const Controls = ({ onSolve, onReset, onClear, error ,handleUndo}) => {
  return (
    <div>
      <button id="solve" onClick={onSolve} disabled={error >= 3}>Solve</button>
      <button  id="reset" onClick={onReset}>New Game</button>
      <button  id="clear" onClick={onClear} disabled={error >= 3}>Clear</button>
      <button id ="reset"  onClick={handleUndo} >Undo</button>
    </div>
  );
};

export default Controls;
