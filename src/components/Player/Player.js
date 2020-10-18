import React, {useState, useRef} from 'react';
import ContentEditable from 'react-contenteditable'
import Score from '../Score/Score';
import './Player.css'

const Player = ({player}) => {
  const [ score, setScore ] = useState('0');
  // Use helps us access dom events and other elements
  // https://reactjs.org/docs/refs-and-the-dom.html
  const text = useRef('');

  const handleChange = evt => {
    text.current = evt.target.value;

    setScore(text.current)
  };

  return (
    <article className='Player'>
      <h2 className='Player__title' contentEditable='true'>Player: {!!player ? player : 1}</h2>
      <ContentEditable
        html={text.current}
        tagName='section'
        onChange={handleChange}
        className='Player__textbox'
      />
      <Score score={score} />
    </article>
  )
}

export default Player;
