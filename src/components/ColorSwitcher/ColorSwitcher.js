import React from 'react';
import PropTypes from 'prop-types';
import { FiSun, FiMoon } from 'react-icons/fi'
import './ColorSwitcher.css'

const ColorSwitcher = ({ color, handleClick }) => (
  // TODO: handle aria label
  <button className='App__button Switcher' aria-label="Light mode" onClick={ handleClick }>
    { color === 'light' ? <FiSun /> : <FiMoon /> }
  </button>
)

ColorSwitcher.propTypes = {
  color: PropTypes.string,
  handleClick: PropTypes.func,
}

export default ColorSwitcher;
