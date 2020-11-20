import React from 'react';
import PropTypes from 'prop-types';
import {AiOutlineClose} from 'react-icons/ai'

const ClearScore = ({onClick}) => (
  <button className="App__button" aria-label="Clear score" title="Clear score" onClick={onClick}>
    <AiOutlineClose />
  </button>
)

ClearScore.propTypes = {
  onClick: PropTypes.func,
}

export default ClearScore;
