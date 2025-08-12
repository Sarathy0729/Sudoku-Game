import React from 'react';

const Tile = ({ value, isFixed, onChange , highlighted, onFocus }) => {
 

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
