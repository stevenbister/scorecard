import { writable } from 'svelte/store';

// Get the value out of storage on load.
const stored = localStorage.getItem('players') ?? '[]';

interface Player {
    id: number;
    name: string;
    scores: number[];
    totalScore: number;
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
        { id, name: '', totalScore: 0, scores: [] },
    ]);
}

function removePlayer(id: number) {
    playerStore.update((players) =>
        players.filter((player) => player.id !== id)
    );
}

function updatePlayerName(id: number, name: string) {
    playerStore.update((players) =>
        players.map((player) =>
            player.id === id ? { ...player, name } : player
        )
    );
}

function updatePlayerScores(id: number, scores: number[]) {
    playerStore.update((players) =>
        players.map((player) =>
            player.id === id ? { ...player, scores } : player
        )
    );
}

function updateTotalScore(id: number, totalScore: number) {
    playerStore.update((players) =>
        players.map((player) =>
            player.id === id ? { ...player, totalScore } : player
        )
    );
}

function getPlayers() {
    return playerStore;
}

const store = {
    addPlayer,
    removePlayer,
    updatePlayerName,
    updatePlayerScores,
    updateTotalScore,
    getPlayers,
};

export default store;
