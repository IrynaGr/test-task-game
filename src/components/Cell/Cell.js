import React from "react";

const Cell = props => {
  const { id, isMarked, handleClick, isHit, isMissed } = props;
  let className = () => {
    if (isMarked) {
      return "board-row-cell_marked";
    } else if (isHit) {
      return "board-row-cell_hit";
    } else if (isMissed) {
      return "board-row-cell_missed";
    } else {
      return "board-row-cell";
    }
  };

  return (
    <div
      className={className()}
      key={id}
      id={id}
      onClick={e => handleClick(e)}
    ></div>
  );
};

export default Cell;