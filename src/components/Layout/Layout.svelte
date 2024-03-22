<script lang="ts">
    import Header from '../Header/Header.svelte';
</script>

<Header />
<main>
    <slot />
</main>

<style>
    :global(#app) {
        height: 100dvh;
        display: flex;
        flex-direction: column;
    }

    main {
        align-self: stretch;
        height: 100%;
    }
</style>
