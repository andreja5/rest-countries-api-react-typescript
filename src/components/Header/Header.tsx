import React, { FC, useEffect, useState } from 'react';
import themes from '../../utils/themes.json';
import { parseTheme } from '../../utils/styleMethods';
import './Header.scss';
import SwitchMode from './SwitchMode/SwitchMode';

interface HeaderProps {
  label: string;
}

const Header: FC<HeaderProps> = ({ label }): JSX.Element => {
  const { darkTheme, lightTheme } = themes;
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      parseTheme(darkTheme);
    } else {
      parseTheme(lightTheme);
    }
  }, [darkMode]);

  return (
    <header className="header">
      <div className='header-container flex flex-jc-sb'>
        <h1>{label}</h1>
        <SwitchMode
            classBlock="switch-mode"
            icon={`${darkMode ? "fas" : "far"} fa-moon`}
            onToggle={() => setDarkMode(!darkMode)}
            label="Dark Mode"
        />
      </div>
  </header>
  )
}

export default Header;