import React from 'react';
import PropTypes from 'prop-types';
import { stringToArray, arrayValuesToNumbers, sumArray } from '../../utils/arrayManipulators'
import './Score.css';

const Score = ({score}) => {
  const scoreArr = stringToArray(score);
  const totalScore = sumArray(arrayValuesToNumbers(scoreArr));

  return (
    <footer className='Score'>
      Score: { isNaN(totalScore) ? 0 : totalScore }
    </footer>
  )
}

Score.propTypes = {
  score: PropTypes.string,
}

export default Score;
