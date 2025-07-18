import React from 'react';

const Tile = ({ value, isFixed, onChange, errorDisabled }) => {
  // console.log("value",value);
  // console.log("errorDisabled",errorDisabled);
  return (
    <div className="tile">
      {isFixed ? (
        <span>{value}</span>
      ) : (
        <input
          type="text"
          maxLength="1"
          className="input"
          value={value === 0 ? '' : value}
          onChange={onChange}
          // disabled={errorDisabled}
        />
      )}
    </div>
  );
};

export default Tile;
