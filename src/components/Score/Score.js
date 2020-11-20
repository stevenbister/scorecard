import React from 'react';
import PropTypes from 'prop-types';
import './Score.css';

const Score = ({score}) => (
  <p className='Score'>
    Score: {score}
  </p>
)

Score.propTypes = {
  score: PropTypes.string,
}

export default Score;
