<script lang="ts">
    import store from '../../stores/players';
    import {
        arrayToString,
        arrayValuesToNumbers,
        debounce,
        stringToArray,
    } from '../../utils';
    import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';

    export let playerId: number | undefined = undefined;
    export let scores: number[] = [];

    let value = arrayToString(scores, '\n');
    $: scores.length === 0 && (value = '');

    function handleInput(
        e: Event & { target: EventTarget & HTMLTextAreaElement }
    ) {
        if (playerId === undefined || playerId === null) {
            throw new Error('playerId must be defined');
        }

        value = e.target?.value;

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
    {value}
    on:input={debounce((e) => handleInput(e), 200)}
/>

<style>
    textarea {
        background-color: var(--color-input-bg);
        width: 100%;
        height: 100%;
        font-size: var(--fs-primary);
        font-weight: var(--fw-primary);
        padding-inline: var(--container-padding);
        font-variant-numeric: tabular-nums;
        resize: none;
    }
</style>
