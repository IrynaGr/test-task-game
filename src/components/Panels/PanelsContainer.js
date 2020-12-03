import React from "react";
import Panels from "./Panels";
import fetchService from "../../utils/dataFetchService";

import "./Panels.css";

class PanelsContainer extends React.Component {
  state = {
    gameModes: {},
    isLoading: true,
  };

  async componentDidMount() {
    const endpoint = "game-settings";
    const gameModes = await fetchService(endpoint);
    this.setState({ gameModes, isLoading: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentGameMode !== this.props.currentGameMode) {
      const { getSettings } = this.props;
      const { gameModes } = this.state;

      getSettings(gameModes);
    }
    return;
  }

  renderGameModes = () => {
    const { gameModes } = this.state;
    const gameModesArray = Object.keys(gameModes);
    return gameModesArray.map((el, index) => (
      <option value={el} key={index + 1}>
        {el}
      </option>
    ));
  };

  render() {
    const { isLoading } = this.state;
    const {
      onInputChange,
      currentGameMode,
      userName,
      onGameStatusGhange,
      isStarted,
      isFinished,
    } = this.props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Panels
        renderGameModes={this.renderGameModes}
        onInputChange={onInputChange}
        currentGameMode={currentGameMode}
        userName={userName}
        onGameStatusGhange={onGameStatusGhange}
        isStarted={isStarted}
        isFinished={isFinished}
      />
    );
  }
}

export default PanelsContainer;
