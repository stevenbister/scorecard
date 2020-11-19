import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';

import Player from './components/Player/Player';
import ColorSwitcher from './components/ColorSwitcher/ColorSwitcher';
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

  // Check if the prefered colour scheme is light or dark and set the state accordingly
  // TODO: move this back out into the component, can handle adding the class with something like useeffect
  const systemPrefersDark = useMediaQuery({
    query: '(prefers-color-scheme: dark)' },
    undefined,
    (prefersDark) => setisDark(prefersDark)
  );

  const [ isDark, setisDark ] = useState(systemPrefersDark);

  // Toggle the state of the colour
  const toggleColorState = () =>  isDark ? setisDark(false) : setisDark(true);

  return (
    <div className={`App ${ isDark ? 'App--dark' : '' }`}>
      <header className='App__header'>
        <h1>Scorecard</h1>

        <div className='App__button--container'>
          <ColorSwitcher color={isDark} handleClick={ toggleColorState } />

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
