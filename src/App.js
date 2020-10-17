import React, {useState} from 'react';
import Player from './components/Player';

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
    <div className="App">
      <button onClick={addPlayer}>Add player</button>
      <button onClick={removePlayer}>Remove player</button>

      { players.map( player => player ) }
    </div>
  );
}

export default App;
