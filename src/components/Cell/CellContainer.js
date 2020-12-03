import React from "react";
import Cell from "./Cell";

class CellContainer extends React.PureComponent {
  state = {};

  render() {
    const {
      row,
      column,
      isMarked,
      isHit,
      isMissed,
    } = this.props.fieldcell;

    const { handleClick } = this.props;

    let id = row + column;

    return (
      <Cell
        id={id}
        isMarked={isMarked}
        handleClick={handleClick}
        isHit={isHit}
        isMissed={isMissed}
      />
    );
  }
}

export default CellContainer;