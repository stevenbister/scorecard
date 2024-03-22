<script lang="ts">
    import store from '../../stores/players';
    import Button from '../Buttons/Button.svelte';
    import Close from '../Icons/Close.svelte';
    import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';

    export let playerId: number | undefined = undefined;

    function handleClick() {
        if (playerId === undefined || playerId === null) {
            throw new Error('playerId must be defined');
        }

        store.updatePlayerScores(playerId, []);
    }
</script>

<Button variant="danger" on:click={() => handleClick()}>
    <VisuallyHidden>Clear score</VisuallyHidden>
    <Close />
</Button>
