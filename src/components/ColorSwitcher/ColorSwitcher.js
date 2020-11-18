import React from 'react';
import PropTypes from 'prop-types';
import { FiSun, FiMoon } from 'react-icons/fi'
import './ColorSwitcher.css'

const ColorSwitcher = ({ color, handleClick }) => (
  <button className='App__button Switcher' aria-label={color === 'light' ? 'Activate dark mode' : 'Activate light mode'} onClick={ handleClick }>
    { color === 'light' ? <FiSun /> : <FiMoon /> }
  </button>
)

ColorSwitcher.propTypes = {
  color: PropTypes.string,
  handleClick: PropTypes.func,
}

export default ColorSwitcher;
