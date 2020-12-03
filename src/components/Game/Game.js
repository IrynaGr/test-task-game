import React from "react";
import Panels from "../Panels";
import Board from "../Board";

const Game = props => {
  const {
    onInputChange,
    currentGameMode,
    userName,
    getSettings,
    gameSettings,
    onGameStatusGhange,
    isStarted,
    isFinished,
    isNew,
    updateLeader,
  } = props;

  return (
    <div className="game">
      <Panels
        onInputChange={onInputChange}
        currentGameMode={currentGameMode}
        getSettings={getSettings}
        userName={userName}
        onGameStatusGhange={onGameStatusGhange}
        isStarted={isStarted}
        isFinished={isFinished}
      />
      <Board
        gameSettings={gameSettings}
        userName={userName}
        onGameStatusGhange={onGameStatusGhange}
        isStarted={isStarted}
        isFinished={isFinished}
        isNew={isNew}
        updateLeader={updateLeader}
      />
    </div>
  );
};

export default Game;
