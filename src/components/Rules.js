import React from 'react';

const Rules = ({ onClose, sudokuType }) => {
  const standardRules = [
    'The puzzle is played on a 9x9 grid, divided into 3x3 subgrids.',
    'Each row must contain numbers 1 to 9 without repetition.',
    'Each column must contain numbers 1 to 9 without repetition.',
    'Each 3x3 subgrid must contain numbers 1 to 9 without repetition.',
    'A valid puzzle has only one unique solution.',
  ];

  const hyperRules = [
    ...standardRules,
    'In Hyper Sudoku, there are four additional shaded 3x3 regions (in the center of each corner).',
    'These hyper regions must also contain numbers 1 to 9 without repetition.',
    'This adds extra constraint and complexity to the puzzle.',
  ];

  const samuraiRules = [
    'Samurai Sudoku consists of 5 overlapping standard Sudoku grids.',
    'The layout is like a cross, with overlapping regions in the corners of the center grid.',
    'Each of the five grids must follow all the standard Sudoku rules.',
    'The overlapping regions are shared between two grids, and numbers must match in both.',
    'Solving one grid can help solve the overlapping parts in others.',
  ];

  const getRulesList = () => {
    switch (sudokuType) {
      case 'hyper':
        return hyperRules;
      case 'samurai':
        return samuraiRules;
      default:
        return standardRules;
    }
  };

  return (
    <div className="rules">
      <button
        onClick={onClose}
        style={{
          float: 'right',
          background: 'transparent',
          border: 'none',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        ✖
      </button>
      <h3 style={{ marginTop: 0 }}>{sudokuType.charAt(0).toUpperCase() + sudokuType.slice(1)} Sudoku Rules</h3>
      <ul>
        {getRulesList().map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default Rules;
