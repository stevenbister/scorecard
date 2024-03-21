<script lang="ts">
    import store from '../../stores/players';

    export let playerId: number | undefined = undefined;
    export let scores: number[] = [];

    function calculateTotalScore(scores: number[]): number {
        return scores.reduce((acc, score) => acc + score, 0);
    }

    $: totalScore = calculateTotalScore(scores) ?? 0;

    function updateTotal() {
        if (playerId === undefined || playerId === null) {
            throw new Error('playerId must be defined');
        }

        store.updateTotalScore(playerId, totalScore);
    }

    $: () => updateTotal();
</script>

<div>
    <p>Score: {totalScore}</p>
</div>

<style>
    div {
        font-size: var(--fs-primary);
        font-weight: var(--fw-primary);
        padding-inline: var(--container-padding);
    }

    p {
        font-variant-numeric: tabular-nums;
    }
</style>
