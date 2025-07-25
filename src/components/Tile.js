import React from 'react';

const Tile = ({ value, isFixed, onChange , highlighted, onFocus }) => {
  //  console.log("Tile-value",value);
  // console.log("isFixed-tile",isFixed)
  // console.log("onchange-tile",onchange);

  return (
    <div className={`tile ${highlighted ? 'highlight' : ''}`}>
  {isFixed ? (
    <span>{value}</span>
  ) : (
    <input
      type="text"
      maxLength="1"
      className="input"
      value={value === 0 ? '' : value}
      onChange={onChange}
      onFocus={onFocus}
    />
  )}
</div>

  );
};

export default Tile;
