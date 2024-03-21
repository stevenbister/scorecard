<script lang="ts">
    import store from '../../stores/players';
    import {
        arrayToString,
        arrayValuesToNumbers,
        stringToArray,
    } from '../../utils';
    import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';
    export let playerId: number | undefined = undefined;
    export let scores: number[] = [];

    let value = arrayToString(scores, '\n');

    function handleInput() {
        if (playerId === undefined || playerId === null) {
            throw new Error('playerId must be defined');
        }

        const valueToArray = stringToArray(value, '\n');
        const scores = arrayValuesToNumbers(valueToArray);

        store.updatePlayerScores(playerId, scores);
    }
</script>

<VisuallyHidden>
    <label for={`player-${playerId}-scores`}>Add score for {playerId}</label>
</VisuallyHidden>
<textarea
    name={`player-${playerId}-scores`}
    id={`player-${playerId}-scores`}
    bind:value
    on:input={handleInput}
/>
