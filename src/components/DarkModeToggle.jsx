import React, { useState } from "react";
import Switch from "react-switch";

function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.style.backgroundColor = darkMode ? "#fff" : "#333";
        document.body.style.color = darkMode ? "#000" : "#fff";
    };

    return (
        <div>
            <label>
                <span>Dark Mode</span>
                <Switch onChange={toggleDarkMode} checked={darkMode} />
            </label>
        </div>
    );
}

export default DarkModeToggle;
