import React from 'react';
import PropTypes from 'prop-types';
import './Score.css';

const Score = ({score}) => (
  <footer className='Score'>
    Score: {score}
  </footer>
)

Score.propTypes = {
  score: PropTypes.string,
}

export default Score;
