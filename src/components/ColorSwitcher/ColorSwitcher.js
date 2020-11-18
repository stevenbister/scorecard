import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSun, FiMoon } from 'react-icons/fi'

const ColorSwitcher = () => {
  const [ color, setColor ] = useState('light');

  return (
    <button aria-label="Light mode" ><FiSun /></button>
  );
}

export default ColorSwitcher;
