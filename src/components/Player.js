import React, {useState, useRef} from 'react';
import ContentEditable from 'react-contenteditable'
import Score from './Score';

const Player = () => {
  const [ score, setScore ] = useState('0');
  // Use helps us access dom events and other elements
  // https://reactjs.org/docs/refs-and-the-dom.html
  const text = useRef('');

  const handleChange = evt => {
    text.current = evt.target.value;

    setScore(text.current)
  };

  return (
    <>
      <ContentEditable html={text.current} onChange={handleChange} />
      <Score score={score} />
    </>
  )
}


export default Player;
