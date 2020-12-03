import React from "react";
import Leader from "./Leader";
import fetchService from "../../utils/dataFetchService";

import "./Leader.css";

class LeaderContainer extends React.PureComponent {
  state = {
    Leader: [],
    isLoading: true,
  };

  async componentDidMount() {
    const endpoint = "winners";
    const Leader = await fetchService(endpoint);
    this.setState({ Leader, isLoading: false });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isWinnerPosted !== this.props.isWinnerPosted) {
      const endpoint = "winners";
      const Leader = await fetchService(endpoint);
      this.setState({ Leader, isLoading: false });
    }
  }

  renderList = () => {
    const { Leader } = this.state;
    const lastWinners = Leader.slice(-5);
    return lastWinners.map(element => {
      // eslint-disable-next-line
      const date = new Date(element.date. replace(';',''));
      const parsedDate = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
      return (
        <li className="leader-list-item" key={element.id}>
          <p>{element.winner}</p>
          <p>{parsedDate}</p>
        </li>
      );
    });
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Leader renderList={this.renderList} />;
  }
}

export default LeaderContainer;
