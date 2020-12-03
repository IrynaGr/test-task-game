import React from "react";

const Leader = props => {
  const { renderList } = props;
  return (
    <div className="leader">
      <h1 className="leader-heading">Leader Board</h1>
      <ul className="leader-list">{renderList()}</ul>
    </div>
  );
};

export default Leader;
