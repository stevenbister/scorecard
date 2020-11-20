import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable'
import { stringToArray, arrayValuesToNumbers, sumArray } from '../../utils/arrayManipulators'
import Score from '../Score/Score';
import ClearScore from '../ClearScore/ClearScore';
import './Player.css'

const Player = ({player}) => {
  const [ score, setScore ] = useState('0');
  // Use helps us access dom events and other elements
  // https://reactjs.org/docs/refs-and-the-dom.html
  const text = useRef('');

  const handleChange = evt => {
    text.current = evt.target.value;

    const scoreArr = stringToArray(text.current);
    const totalScore = sumArray(arrayValuesToNumbers(scoreArr));

    setScore(totalScore || '0')
  };

  // Reset score
  const setScoreToZero = () => {
    if ( score > 0 ) {
      setScore('0');
      text.current = '';
    }
  }

  return (
    <article className='Player'>
      <h2 className='Player__title' contentEditable='true' suppressContentEditableWarning={true}>
        Player: {!!player ? player : 1}
      </h2>

      <ContentEditable
        html={text.current}
        tagName='section'
        onChange={handleChange}
        className='Player__textbox'
      />

      <Score score={score} />
      <ClearScore onClick={setScoreToZero} />
    </article>
  )
}

export default Player;
