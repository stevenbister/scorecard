import React, { useState, useEffect } from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';

import Player from './components/Player/Player';
import ColorSwitcher from './components/ColorSwitcher/ColorSwitcher';
import './App.css';

const App = () => {
  // Start the app with a default of one player
  const [playerIds, setPlayerIds] = useState([0]);

  // This let's us add multiple players to the app
  const addPlayer = () => {
    const id = playerIds.length;

    setPlayerIds([...playerIds, id,]);

    localStorage.setItem('players', [...playerIds, id,]);
  }

  // Aaaaaand this removes the last one added
  const removePlayer = () => {
    if ( playerIds.length > 1 ) {
      playerIds.pop();

      setPlayerIds([...playerIds,])

      localStorage.setItem('players', [...playerIds,]);
    }
  }

  // Load players from localstorage
  useEffect(() => {
    const storedPlayers = localStorage.getItem('players');
    console.log(storedPlayers);

  })

  return (
    <div className='App'>
      <header className='App__header'>
        <h1>Scorecard</h1>

        <div className='App__button--container'>
          <ColorSwitcher />

          <button className='App__button App__button--primary' onClick={addPlayer} aria-label='Add player'><AiOutlineUserAdd /></button>
          <button className='App__button App__button--secondary' onClick={removePlayer} aria-label='Remove player'><AiOutlineUserDelete /></button>
        </div>
      </header>

      <main className='App__main'>
        { playerIds.map( player => <Player player={player + 1} key={`Player ${player + 1}`} /> ) }
      </main>
    </div>
  );
}

export default App;
