import React, { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import Homepage from "./components/Homepage";
import "./App.css";

const App = () => {
  const [displayMoodScreen, setDisplayMoodScreen] = useState(true);
  const [isHappy, setIsHappy] = useState(true);

  const handleMoodSelection = (userIsHappy) => {
    setDisplayMoodScreen(false);
    if (userIsHappy) {
      setIsHappy(true);
      return;
    }
    setIsHappy(false);
  };

  return (
    <div className="App">
      {displayMoodScreen && <MoodSelector handleClick={handleMoodSelection} />}
      {!displayMoodScreen && <Homepage isHappy={isHappy} />}
    </div>
  );
};

export default App;
