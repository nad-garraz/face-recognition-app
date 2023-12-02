import React from "react";
import "./Rank.css";

const Rank = ({name, entries}) => {
  return (
    <div>
      <div className='white rank-text'>{`${name}, your current entry count is...`}</div>
      <div className='white rank-entries'>{`#${entries}`}</div>
    </div>
  );
};

export default Rank;
