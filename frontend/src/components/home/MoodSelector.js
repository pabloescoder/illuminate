import React from "react";
import happyImg from "../../images/happy.png";
import unhappyImg from "../../images/unhappy.png";
import "./MoodSelector.css";

const MoodSelector = ({ handleClick }) => {
  return (
    <main className="mood-selector-section">
      <div className="happy-side" onClick={() => handleClick(true)}>
        <img src={happyImg} alt="I am happy option" />
      </div>
      <div className="unhappy-side" onClick={() => handleClick(false)}>
        <img src={unhappyImg} alt="I am unhappy option" />
      </div>
    </main>
  );
};

export default MoodSelector;
