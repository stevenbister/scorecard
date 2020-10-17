import React from 'react';
import { stringToArray, arrayValuesToNumbers, sumArray } from '../utils/arrayManipulators'

const Score = ({score}) => {
  const totalScore = sumArray(arrayValuesToNumbers(stringToArray(score)))
  return (
    <p>
      Score: { isNaN(totalScore) ? 0 : totalScore }
    </p>
  )
}



export default Score;
