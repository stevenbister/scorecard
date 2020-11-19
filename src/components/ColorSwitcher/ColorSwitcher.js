import React, { useState, useEffect } from 'react';
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

  // Set the dark state
  const [ isDark, setisDark ] = useState(systemPrefersDark);

  // Function to toggle the state of the colour
  const toggleColorState = () =>  isDark ? setisDark(false) : setisDark(true);

  // If the isDark state is true add a class to the html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('is-dark');
    } else {
      document.documentElement.classList.remove('is-dark');
    }
  }, [isDark]);

  return (
    <button className='App__button Switcher' aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'} onClick={ toggleColorState } >
      { isDark ? <FiMoon /> : <FiSun /> }
    </button>
  );
}

export default ColorSwitcher;
