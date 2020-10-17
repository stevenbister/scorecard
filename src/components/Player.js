import React, {useState, useRef} from 'react';
import ContentEditable from 'react-contenteditable'
import Score from './Score';

const Player = ({player}) => {
  const [ score, setScore ] = useState('0');
  // Use helps us access dom events and other elements
  // https://reactjs.org/docs/refs-and-the-dom.html
  const text = useRef('');

  const handleChange = evt => {
    text.current = evt.target.value;

    setScore(text.current)
  };

  const style = {
    backgroundColor: '#eee',
  }

  return (
    <>
      <p contentEditable='true' >Player: {!!player ? player : 1}</p>
      <ContentEditable html={text.current} onChange={handleChange} style={style} />
      <Score score={score} />
    </>
  )
}

export default Player;
