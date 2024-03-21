<script lang="ts">
    import Game from './components/Game/Game.svelte';
    import Layout from './components/Layout/Layout.svelte';

    const isDev = import.meta.env.MODE === 'development';
</script>

<Layout>
    <Game />

    {#if isDev}
        <button
            on:click={() => {
                localStorage.clear();
                location.reload();
            }}
            style="position: fixed; bottom: 50%; right: 0;padding: 1rem; background-color: var(--color-danger);
            color: white;">Reset</button
        >
    {/if}
</Layout>
