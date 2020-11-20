import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FiSun, FiMoon } from 'react-icons/fi'
import './ColorSwitcher.css'

const ColorSwitcher = () => {

  // Check if the prefered colour scheme is dark and set the state accordingly
  const systemPrefersDark = useMediaQuery({query: '(prefers-color-scheme: dark)'});

  const userPrefersDark = localStorage.getItem('userPrefersDark');

  const colorPreference = useEffect(() => {
    if (systemPrefersDark) {
      setisDark(true);
    } else if (userPrefersDark) {
      setisDark(true);
    } else {
      setisDark(false);
    }
  }, [userPrefersDark, systemPrefersDark]);

  // Set the dark state
  const [ isDark, setisDark ] = useState(colorPreference);

  // Function to toggle the state of the colour
  const toggleColorState = () =>  {
    if (isDark) {
      setisDark(false)
      localStorage.removeItem('userPrefersDark');
    } else {
      setisDark(true)
      localStorage.setItem('userPrefersDark', true);
    }
  };

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
