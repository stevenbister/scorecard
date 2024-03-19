<script lang="ts">
    import UserMinus from "../Icons/UserMinus.svelte";
    import UserPlus from "../Icons/UserPlus.svelte";
    import VisuallyHidden from "../VisuallyHidden/VisuallyHidden.svelte";

    type UserButton = {
        icon: typeof UserMinus | typeof UserPlus;
        label: string;
        class: string;
    }

    type UserButtons = Record<string, UserButton>;

    const userButtons: UserButtons = {
        add: {
            icon: UserPlus,
            label: "Add user",
            class: "btn--add"
        },
        remove: {
            icon: UserMinus,
            label: "Remove user",
            class: "btn--remove"
        }
    }
</script>

<div>
    {#each Object.keys(userButtons) as button}
        <button class={`btn ${userButtons[button].class}`}>
            <svelte:component this={userButtons[button].icon} />
            <VisuallyHidden>{userButtons[button].label}</VisuallyHidden>
        </button>
    {/each}
</div>

<style>
    div {
        display: flex;
    }

    .btn {
        background-color: transparent;
    }

    .btn.btn--add {
        color: var(--green-9)
    }

    .btn.btn--remove {
        color: var(--red-8)
    }

    @media (prefers-color-scheme: dark) {
        .btn.btn--add {
            color: var(--green-3)
        }
        .btn.btn--remove {
            color: var(--red-3)
        }
    }
</style>