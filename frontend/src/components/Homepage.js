import React from "react";
import "./Homepage.css";

const Homepage = ({ isHappy }) => {
  return (
    <main>
      {isHappy && <div>{"Happy! :D"}</div>}
      {!isHappy && <div>{"Unhappy! :("}</div>}
    </main>
  );
};

export default Homepage;
