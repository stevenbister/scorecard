<script lang="ts">
    import store from '../../stores/players';
    import { debounce } from '../../utils';

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

<input
    type="text"
    bind:value={name}
    on:input={debounce(() => handleInput(), 200)}
/>

<style>
    input {
        width: 100%;
        font-size: var(--font-size-3);
        font-weight: var(--font-weight-7);
        padding-inline: var(--container-padding);
    }
</style>
