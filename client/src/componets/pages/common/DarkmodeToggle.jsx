import React, { useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import useDarkMode from "use-dark-mode";

const DarkmodeToggle = () => {
  const darkMode = useDarkMode();
  const [isDarkMode, setIsDarkMode] = useState(() => darkMode.value);
  const handleSetIsDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      darkMode.disable();
    } else {
      darkMode.enable();
    }
  };
  return (
    <DarkModeToggle
      onChange={handleSetIsDarkMode}
      checked={isDarkMode}
      size={80}
    />
  );
};

export default DarkmodeToggle;
