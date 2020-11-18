import React from 'react';
import PropTypes from 'prop-types';
import { FiSun, FiMoon } from 'react-icons/fi'

const ColorSwitcher = ({ color, handleClick }) => (
  <button aria-label="Light mode" onClick={ handleClick }>
    { color === 'light' ? <FiSun /> : <FiMoon /> }
  </button>
)

ColorSwitcher.propTypes = {
  color: PropTypes.string,
  handleClick: PropTypes.func,
}

export default ColorSwitcher;
