<script lang="ts">
    import store from '../../stores/players';
    import UserMinus from '../Icons/UserMinus.svelte';
    import UserPlus from '../Icons/UserPlus.svelte';
    import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';
    import Button from './Button.svelte';
    import type { ButtonProps } from './types';

    interface UserButton extends ButtonProps {
        icon: typeof UserMinus | typeof UserPlus;
        label: string;
        onclick: () => void;
    }
    type UserButtons = Record<string, Partial<UserButton>>;

    let playerIndex: number = 0;

    const userButtons: UserButtons = {
        add: {
            icon: UserPlus,
            label: 'Add player',
            variant: 'success',
            onclick: () => {
                playerIndex = playerIndex + 1;
                store.addPlayer(playerIndex);
            },
        },
        remove: {
            icon: UserMinus,
            label: 'Remove player',
            variant: 'danger',
            onclick: () => {
                if (playerIndex === 0) return;

                store.removePlayer(playerIndex);
                playerIndex = playerIndex - 1;
            },
        },
    };
</script>

<div class="btn-group">
    {#each Object.keys(userButtons) as button}
        <Button
            variant={userButtons[button].variant}
            on:click={userButtons[button].onclick}
        >
            <svelte:component this={userButtons[button].icon} />
            <VisuallyHidden>{userButtons[button].label}</VisuallyHidden>
        </Button>
    {/each}
</div>

<style>
    .btn-group {
        display: flex;
    }
</style>
