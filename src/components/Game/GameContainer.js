import React from "react";
import Game from "./Game";

import "./Game.css";

class GameContainer extends React.PureComponent {
  state = {
    currentGameMode: "",
    userName: "",
    gameSettings: {},
    isStarted: false,
    isFinished: false,
    isNewGame: false,
  };

  onInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getSettings = modes => {
    const modeName = this.state.currentGameMode;
    if (modeName) {
      this.setState({ gameSettings: modes[modeName] });
    }
    return;
  };

  onGameStatusGhange = status => {
    const { isStarted, isFinished } = status;
    let isNewGame = status.isNewGame ? status.isNewGame : false;
    if (isStarted && !isFinished) {
      this.setState({ isStarted: true, isFinished: false, isNewGame: true }, () =>
        console.log('The game is have just started')
      );
    } else if (isFinished && !isNewGame) {
      this.setState({ isStarted: false, isFinished: true });
    }
  };

  render() {
    const { updateLeader } = this.props;
    const {
      currentGameMode,
      userName,
      gameSettings,
      isStarted,
      isFinished,
      isNewGame,
    } = this.state;
    return (
      <Game
        onInputChange={this.onInputChange}
        currentGameMode={currentGameMode}
        getSettings={this.getSettings}
        gameSettings={gameSettings}
        userName={userName}
        onGameStatusGhange={this.onGameStatusGhange}
        isStarted={isStarted}
        isFinished={isFinished}
        isNew={isNewGame}
        updateLeader={updateLeader}
      />
    );
  }
}

export default GameContainer;
