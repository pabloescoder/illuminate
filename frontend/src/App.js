import React, { useState } from "react";
import MoodSelector from "./components/home/MoodSelector";
import Homepage from "./components/home/Homepage";
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

  const handleLogoClick = () => {
    setDisplayMoodScreen(true);
  };

  return (
    <div className="App">
      {displayMoodScreen && <MoodSelector handleClick={handleMoodSelection} />}
      {!displayMoodScreen && (
        <Homepage isHappy={isHappy} handleLogoClick={handleLogoClick} />
      )}
    </div>
  );
};

export default App;
