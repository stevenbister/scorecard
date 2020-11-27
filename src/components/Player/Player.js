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
  const playerName = useRef('');

  const localstorageItems = {
    playerCurrentText: `player${player}CurrentText`,
    playerScore: `player${player}Score`,
    playerName: `player${player}Name`
  }

  // Update round scores
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

  // Only allow numbers
  const handleKeyDown = evt => {
    const key = evt.keyCode;

    if (
      isNaN(String.fromCharCode(evt.which))
        && key !== 8 // backspace
        && key !== 190 // decimal
        && key !== 37 // left arrow
        && key !== 38 // up arrow
        && key !== 39 // right arrow
        && key !== 40 // down arrow
      ) {
      evt.preventDefault()
    };
  }

  // Update player name
  const changePlayerName = evt => {
    playerName.current = evt.target.value;

    localStorage.setItem(localstorageItems.playerName, playerName.current);
  }

  const formatPlayerName = () => {
    let formattedPlayerName;

    // We want to get the current value or the stored of the name
    // However if it is left blank we want it to fall back to Player
    if (playerName.current) {
      formattedPlayerName = playerName.current;
      // Because we're using an editable div we need to check for breaks as blanks
    } else if (storedName && storedName !== '<br>') {
      formattedPlayerName = storedName;
    } else {
      formattedPlayerName = `Player: ${player}`;
    }

    return formattedPlayerName;
  }

  // Reset score
  const setScoreToZero = () => {
    if ( score > 0 ) {
      setScore(0);
      text.current = '';

      localStorage.removeItem(localstorageItems.playerCurrentText);
      localStorage.removeItem(localstorageItems.playerScore);
    }
  }

  // Get items in localstorage
  const storedCurrentText = localStorage.getItem(localstorageItems.playerCurrentText);
  const storedTotalScore = localStorage.getItem(localstorageItems.playerScore);
  const storedName = localStorage.getItem(localstorageItems.playerName);

  // If items in localstorage exist then display them and set state
  useEffect(() => {

    if (storedCurrentText) {
      text.current = storedCurrentText
    }

    if (storedTotalScore) {
      setScore(Number(storedTotalScore));
    }

  }, [storedCurrentText, storedTotalScore])

  return (
    <article className='Player'>
      <ContentEditable
        html={formatPlayerName()}
        tagName='h2'
        onChange={changePlayerName}
        className='Player__title'
      />

      <ContentEditable
        html={text.current}
        tagName='section'
        className='Player__textbox'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <footer className='Player__footer'>
        <Score score={score} />
        <ClearScore onClick={setScoreToZero} />
      </footer>
    </article>
  )
}

export default Player;
