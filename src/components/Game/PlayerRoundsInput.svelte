<script lang="ts">
    import store from '../../stores/players';
    import {
        arrayToString,
        arrayValuesToNumbers,
        stringToArray,
    } from '../../utils';
    import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';
    export let playerId: number | undefined = undefined;
    export let rounds: number[] = [];

    let value = arrayToString(rounds, '\n');

    function handleInput() {
        if (playerId === undefined || playerId === null) {
            throw new Error('playerId must be defined');
        }

        const valueToArray = stringToArray(value, '\n');
        const rounds = arrayValuesToNumbers(valueToArray);

        store.updatePlayerRounds(playerId, rounds);
    }
</script>

<VisuallyHidden>
    <label for={`player-${playerId}-rounds`}>Add score for {playerId}</label>
</VisuallyHidden>
<textarea
    name={`player-${playerId}-rounds`}
    id={`player-${playerId}-rounds`}
    bind:value
    on:input={handleInput}
/>
