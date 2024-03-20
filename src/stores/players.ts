import { writable } from 'svelte/store';

// Get the value out of storage on load.
const stored = localStorage.getItem('players') ?? '[]';

interface Player {
    id: number;
    name: string;
    score: number;
    rounds: number[];
}

// Set the stored value
const playerStore = writable<Player[]>(JSON.parse(stored));
// Anytime the store changes, update the local storage value
playerStore.subscribe((value) =>
    localStorage.setItem('players', JSON.stringify(value))
);

function addPlayer(id: number) {
    playerStore.update((players) => [
        ...players,
        { id, name: '', score: 0, rounds: [] },
    ]);
}

function removePlayer(id: number) {
    playerStore.update((players) =>
        players.filter((player) => player.id !== id)
    );
}

const store = {
    addPlayer,
    removePlayer,
};

export default store;
