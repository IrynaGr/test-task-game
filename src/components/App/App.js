import React from "react";
import Leader from "../Leader/";
import Game from "../Game";

import "./App.css";

class App extends React.PureComponent {
  state = { isWinnerPosted: false };

  updateLeader = () => {
    const { isWinnerPosted } = this.state;
    this.setState({ isWinnerPosted: !isWinnerPosted });
  };

  render() {
    const { isWinnerPosted } = this.state;
    return (
      <div className="app">
        <Game updateLeader={this.updateLeader} />
        <Leader isWinnerPosted={isWinnerPosted} />
      </div>
    );
  }
}

export default App;
