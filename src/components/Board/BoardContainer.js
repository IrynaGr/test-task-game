import React from "react";
import Board from "./Board";
import Cell from "../Cell/";
import postService from "../../utils/dataPostService";

import "./Board.css";

class BoardContainer extends React.PureComponent {
  state = {
    fieldArr: [],
    wasSelected: {},
    notSelected: [],
    computerScore: 0,
    userScore: 0,
    lastWinner: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isStarted !== this.props.isStarted) {
      this.createBoard();
    }
    if (prevProps.isFinished !== this.props.isFinished && !this.props.isFinished) {
      this.startNewGame();
    }
    if (
      prevState.lastWinner !== this.state.lastWinner &&
      this.state.lastWinner.length > 0
    ) {
      this.sendWinnerData(this.state.lastWinner);
    }
  }

  startNewGame = () => {
    this.setState({
      wasSelected: {},
      computerScore: 0,
      userScore: 0,
      lastWinner: "",
    });
    return true;
  };

  createBoard = () => {
    const { field } = this.props.gameSettings;
    const fieldArr = [];
    const notSelected = [];

    for (let i = 0; i < field; i++) {
      fieldArr.push([]);
      for (let j = 0; j < field; j++) {
        fieldArr[i][j] = {
          row: i,
          column: j,
          isClicked: false,
          isMarked: false,
          isMissed: false,
          isHit: false,
        };
        notSelected.push({ row: i, column: j });
      }
    }

    this.setState(
      {
        fieldArr,
        notSelected,
      },
      () => {
        this.makeTurn();
      }
    );

    return fieldArr;
  };

  renderBoard = () => {
    const field = this.state.fieldArr;
    return field.map(fieldrow => {
      return fieldrow.map(fieldcell => {
        const { row, column } = fieldcell;
        return (
          <div key={row + column}>
            <Cell
              handleClick={() => {
                this.handleClick(row, column);
              }}
              fieldcell={fieldcell}
            />
          </div>
        );
      });
    });
  };

  checkCell = (row, column) => {
    const field = this.state.fieldArr;
    let { computerScore, userScore } = this.state;
    if (field[row][column].isClicked === field[row][column].isMarked) {
      field[row][column].isMissed = false;
      field[row][column].isHit = true;
      field[row][column].isMarked = false;
      ++userScore;
    } else if (
      field[row][column].isMarked === true &&
      field[row][column].isClicked === false
    ) {
      field[row][column].isMissed = false;
      field[row][column].isMarked = false;
      field[row][column].isMissed = true;
      ++computerScore;
    }

    this.setState(
      {
        fieldArr: field,
        computerScore,
        userScore,
      },
      () => {
        this.checkGameStatus();
      }
    );
  };

  checkGameStatus = () => {
    let { onGameStatusGhange, isStarted, isFinished } = this.props;
    const { computerScore, userScore } = this.state;
    const fieldLength =
      this.props.gameSettings.field * this.props.gameSettings.field;

    if (computerScore >= fieldLength / 2 || userScore >= fieldLength / 2) {
      isFinished = true;
      isStarted = false;
      onGameStatusGhange({ isStarted, isFinished });
    }
    this.makeTurn();
  };

  handleClick = (row, column) => {
    const field = this.state.fieldArr;
    field[row][column].isClicked = true;

    this.setState({
      fieldArr: field,
    });
  };

  makeTurn = () => {
    if (this.props.isFinished) {
      return;
    }
    const { row, column } = this.generateRandomId();
    const { delay } = this.props.gameSettings;
    const field = this.state.fieldArr;
    field[row][column].isMarked = true;

    this.setState(
      {
        fieldArr: field,
      },

      () => {
        setTimeout(() => {
          this.checkCell(row, column);
        }, delay);
      }
    );
  };

  calculateRowWidth = field => {
    const rowWidth = 2 * field + 2;
    return { width: rowWidth + "em" };
  };

  generateRandomId = () => {
    const notSelected = this.state.notSelected;
    const randomNumber =
      Math.floor(Math.random() * (notSelected.length - 0)) + 0;
    const randomId = notSelected.splice(randomNumber, 1);
    const { row, column } = randomId[0];

    this.setState({
      wasSelected: { row, column },
    });
    return { row, column };
  };

  renderScore = () => {
    const userName = this.props.userName;
    const { isFinished } = this.props;
    const { computerScore, userScore } = this.state;
    let winner;
    if (isFinished) {
      winner = this.checkWinner(userName);
      return (
        <div>
          <div className="winner-message">{winner} is winner</div>
          <div id="annimation">
            <div className="balloon">{winner}</div>
            <div className="balloon">{winner}</div>
            <div className="balloon">{winner}</div>
          </div>
       </div>

      ); 
    }
    return `${userName}: ${userScore} / Computer: ${computerScore}`;
  };

  checkWinner = userName => {
    const winner =
      this.state.userScore > this.state.computerScore ? userName : "Computer";
    this.setState({ lastWinner: winner });
    return winner;
  };

  sendWinnerData = async winner => {
    const { updateLeader } = this.props;
    const date = new Date();
    const parsedDate = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
    const requestBody = { winner: winner, date: parsedDate };
    const request = {
      endpoint: "winners",
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const leader = await postService(request);
    updateLeader();
    return leader;
  };

  render() {
    const { isStarted, isFinished } = this.props;
    const { field } = this.props.gameSettings;
    const rowWidth = this.calculateRowWidth(field);

    return (
      <Board
        renderScore={this.renderScore}
        renderBoard={this.renderBoard}
        rowWidth={rowWidth}
        isStarted={isStarted}
        isFinished={isFinished}
      />
    );
  }
}

export default BoardContainer;