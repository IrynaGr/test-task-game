import React from "react";

const Board = props => {
  const { renderScore, renderBoard, rowWidth, isStarted, isFinished } = props;

  if (!isStarted && !isFinished) {
    return (
      <div className="board-component">
        <div className="welcome-message">To start the game you need to select a mode and enter your name</div>
      </div>
    );
  }
  return (
    <div className="board-component">
      <div className="game-score">{renderScore()}</div>
      {isStarted && !isFinished ? (
        <div className="board" style={rowWidth}>
          {renderBoard()}
        </div>
      ) : null}
    </div>
  );
};

export default Board;
