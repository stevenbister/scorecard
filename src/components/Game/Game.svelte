<script lang="ts">
    import store from '../../stores/players';
    import PlayerNameInput from './PlayerNameInput.svelte';
    import PlayerScoresInput from './PlayerScoresInput.svelte';
    import TotalScore from './TotalScore.svelte';
    const players = store.getPlayers();
</script>

<div class="grid">
    {#each $players as player}
        <div class="grid-col">
            <PlayerNameInput playerId={player.id} name={player.name} />
            <PlayerScoresInput playerId={player.id} scores={player.scores} />

            <TotalScore playerId={player.id} scores={player.scores} />
        </div>
    {/each}
</div>

<style>
    .grid {
        display: flex;
        overflow-x: scroll;
        height: 100%;
    }

    .grid-col {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-width: 50%;
        border-left: 1px solid var(--accent-color);
    }

    .grid-col:first-child {
        border-left: none;
    }
</style>
