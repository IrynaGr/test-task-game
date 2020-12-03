import React from "react";

const Panels = props => {
  const {
    renderGameModes,
    onInputChange,
    currentGameMode,
    userName,
    onGameStatusGhange,
    isStarted,
    isFinished,
  } = props;
  return (
    <div className="panels">
      <div className="panels-wrapper">
        <select
          name="currentGameMode"
          onChange={onInputChange}
          value={currentGameMode}
          className="panels-input panels-input_gameMode"
          disabled={isStarted}
        >
          <option value="" disabled hidden>
            Pick game mode
          </option>
          {renderGameModes()}
        </select>
        <span className="material-icons">
          keyboard_arrow_down
        </span>
      </div>
      <input
        name="userName"
        type="text"
        className="panels-input panels-input_nameInput"
        onChange={e => onInputChange(e)}
        value={userName}
        placeholder="Enter your name"
        disabled={isStarted}
      />
      {!isFinished ? (
        <button
          className="panels-input panels-input_playButton"
          name="playButton"
          type="button"
          disabled={isStarted || !currentGameMode || !userName}
          onClick={() =>
            onGameStatusGhange({
              isStarted: true,
              isFinished: false,
              isNewGame: false,
            })
          }
        >
          Play
        </button>
      ) : (
        <button
          className="panels-input panels-input_playButton"
          name="playButton"
          type="button"
          disabled={isStarted || !currentGameMode}
          onClick={() =>
            onGameStatusGhange({
              isStarted: true,
              isFinished: false,
              isNewGame: true,
            })
          }
        >
          Play again
        </button>
      )}
    </div>
  );
};

export default Panels;
