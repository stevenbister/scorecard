import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FiSun, FiMoon } from 'react-icons/fi'
import './ColorSwitcher.css'

const ColorSwitcher = () => {

  // Check if the prefered colour scheme is dark and set the state accordingly
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)'
    },
    undefined,
    (prefersDark) => setisDark(prefersDark)
  );

  const [ isDark, setisDark ] = useState(systemPrefersDark);

  // Function to toggle the state of the colour
  const toggleColorState = () =>  isDark ? setisDark(false) : setisDark(true);

  return (
    <button className='App__button Switcher' aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'} onClick={ toggleColorState } >
      { isDark ? <FiMoon /> : <FiSun /> }
    </button>
  );
}

export default ColorSwitcher;
