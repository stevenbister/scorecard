import React from 'react';
import { stringToArray, arrayValuesToNumbers, sumArray } from '../../utils/arrayManipulators'
import './Score.css';

const Score = ({score}) => {
  const totalScore = sumArray(arrayValuesToNumbers(stringToArray(score)))
  return (
    <footer className='Score'>
      Score: { isNaN(totalScore) ? 0 : totalScore }
    </footer>
  )
}

export default Score;
