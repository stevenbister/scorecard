<script>
    import UserButtons from '../Buttons/UserButtons.svelte';
</script>

<header>
    <h1>Scorecard</h1>

    <UserButtons />
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--container-padding);
        border-bottom: var(--border-size-1) solid var(--accent-color);
    }

    h1 {
        font-size: var(--font-size-fluid-3);
    }
</style>
