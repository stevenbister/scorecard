import React, {useState} from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai'

import Player from './components/Player/Player';
import './App.css';

const App = () => {
  const [ players, setPlayers ] = useState([<Player />]);

  // This let's us add multiple players to the app
  const addPlayer = () => {
    setPlayers([
      ...players,
      <Player />
    ])
  }

  // Aaaaaand this removes the latst one added
  const removePlayer = () => {
    if ( players.length > 1 ) {
      players.pop();

      setPlayers([
        ...players,
      ])
    }
  }

  return (
    <div className='App'>
      <header className='App__header'>
        <h1>Scorecard</h1>

        <div className='App__button--container'>
          <button className='App__button App__button--primary' onClick={addPlayer} aria-label='Add player'><AiOutlineUserAdd /></button>
          <button className='App__button App__button--secondary' onClick={removePlayer} aria-label='Remove player'><AiOutlineUserDelete /></button>
        </div>
      </header>

      <main className='App__main'>
        { players.map( (player, i) => <Player player={i + 1} key={`Player ${i + 1}`} /> ) }
      </main>
    </div>
  );
}

export default App;
