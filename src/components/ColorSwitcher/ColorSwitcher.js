import React, { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'

const ColorSwitcher = () => {
  const [ color, setColor ] = useState('light');

  const toggleColorState = () => color === 'light' ? setColor('dark') : setColor('light');

  return (
    <button aria-label="Light mode" onClick={ toggleColorState }>
      { color === 'light' ? <FiSun /> : <FiMoon /> }
    </button>
  );
}

export default ColorSwitcher;
