<script lang="ts">
    import Header from "../Header/Header.svelte";
</script>

<Header />
<main>
    <slot />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100dvh;
    }
</style>