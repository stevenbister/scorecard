<script lang="ts">
    import store from '../../stores/players';
    import UserMinus from '../Icons/UserMinus.svelte';
    import UserPlus from '../Icons/UserPlus.svelte';
    import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';

    let playerIndex: number = 0;

    interface UserButton extends HTMLButtonElement {
        icon: typeof UserMinus | typeof UserPlus;
        label: string;
    }

    type UserButtons = Record<string, Partial<UserButton>>;

    const userButtons: UserButtons = {
        add: {
            icon: UserPlus,
            label: 'Add player',
            className: 'btn--add',
            onclick: () => {
                playerIndex = playerIndex + 1;
                store.addPlayer(playerIndex);
            },
        },
        remove: {
            icon: UserMinus,
            label: 'Remove player',
            className: 'btn--remove',
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
        <button
            class={`btn ${userButtons[button].className}`}
            on:click={userButtons[button].onclick}
        >
            <svelte:component this={userButtons[button].icon} />
            <VisuallyHidden>{userButtons[button].label}</VisuallyHidden>
        </button>
    {/each}
</div>

<style>
    .btn-group {
        display: flex;
    }

    .btn {
        background-color: transparent;
    }

    .btn.btn--add {
        color: var(--green-9);
    }

    .btn.btn--remove {
        color: var(--red-8);
    }

    @media (prefers-color-scheme: dark) {
        .btn.btn--add {
            color: var(--green-3);
        }
        .btn.btn--remove {
            color: var(--red-3);
        }
    }
</style>
