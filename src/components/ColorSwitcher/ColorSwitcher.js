import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'

const ColorSwitcher = ({ color, handleClick }) => (
  <button aria-label="Light mode" onClick={ handleClick }>
    { color === 'light' ? <FiSun /> : <FiMoon /> }
  </button>
)

export default ColorSwitcher;
