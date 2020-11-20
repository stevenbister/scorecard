import React, {useState, useRef, useEffect} from 'react';
import ContentEditable from 'react-contenteditable'
import { stringToArray, arrayValuesToNumbers, sumArray } from '../../utils/arrayManipulators'
import Score from '../Score/Score';
import ClearScore from '../ClearScore/ClearScore';
import './Player.css'

const Player = ({player}) => {
  const [ score, setScore ] = useState(0);
  // Use helps us access dom events and other elements
  // https://reactjs.org/docs/refs-and-the-dom.html
  const text = useRef('');

  const localstorageItems = {
    playerCurrentText: `player${player}CurrentText`,
    playerScore: `player${player}Score`,
  }

  const handleChange = evt => {
    text.current = evt.target.value;

    const scoreArr = stringToArray(text.current);
    const totalScore = sumArray(arrayValuesToNumbers(scoreArr));

    setScore(totalScore || 0);

    // Save the text content to localstorage
    localStorage.setItem(localstorageItems.playerCurrentText, text.current);

    // Save the total score to the localstorage
    localStorage.setItem(localstorageItems.playerScore, totalScore);
  };

  // Get items in localstorage
  const storedCurrentText = localStorage.getItem(localstorageItems.playerCurrentText);
  const storedTotalScore = localStorage.getItem(localstorageItems.playerScore);

  // If items in localstorage exist then display them and set state
  useEffect(() => {

    if (storedCurrentText) {
      text.current = storedCurrentText
    }

    if (storedTotalScore) {
      setScore(Number(storedTotalScore));
    }

  }, [storedCurrentText, storedTotalScore])

  // Reset score
  const setScoreToZero = () => {
    if ( score > 0 ) {
      setScore(0);
      text.current = '';

      localStorage.removeItem(localstorageItems.playerCurrentText);
      localStorage.removeItem(localstorageItems.playerScore);
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

      <footer className='Player__footer'>
        <Score score={score} />
        <ClearScore onClick={setScoreToZero} />
      </footer>
    </article>
  )
}

export default Player;
