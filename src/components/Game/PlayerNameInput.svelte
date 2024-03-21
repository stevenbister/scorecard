<script lang="ts">
    import store from '../../stores/players';
    import { debounce } from '../../utils';
    import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';

    export let playerId: number | undefined = undefined;
    export let name: string | undefined = undefined;

    function handleInput() {
        if (playerId === undefined || playerId === null) {
            throw new Error('playerId must be defined');
        }

        if (name === undefined) {
            name = '';
        }

        store.updatePlayerName(playerId, name);
    }
</script>

<VisuallyHidden>
    <label for={`player-${playerId}-name`}>Add name for player {playerId}</label
    >
</VisuallyHidden>
<input
    type="text"
    name={`player-${playerId}-name`}
    id={`player-${playerId}-name`}
    bind:value={name}
    on:input={debounce(() => handleInput(), 200)}
/>

<style>
    input {
        background-color: var(--color-input-bg);
        width: 100%;
        font-size: var(--fs-primary);
        font-weight: var(--fw-primary);
        padding-inline: var(--container-padding);
    }
</style>
