<script lang="ts">
    import type { ButtonProps } from './types';

    interface $$Props extends ButtonProps {}

    export let variant: $$Props['variant'] = 'primary';

    let isPressed = false;
</script>

<button
    class="btn"
    class:success={variant === 'success'}
    class:danger={variant === 'danger'}
    class:isPressed
    on:pointerdown={() => (isPressed = true)}
    on:pointerdown
    on:pointerup={() => (isPressed = false)}
    on:pointerup
    on:click
    {...$$restProps}
>
    <slot />
</button>

<style>
    .btn {
        background-color: transparent;
        border-radius: var(--radius-round);
        padding: var(--size-fluid-1);
        transition: background-color 0.1s var(--ease-1);
    }

    .btn.isPressed {
        background-color: var(--gray-2);
    }

    @media (prefers-color-scheme: dark) {
        .btn.isPressed {
            background-color: var(--gray-8);
        }
    }

    .btn.success {
        color: var(--color-success);
    }

    .btn.danger {
        color: var(--color-danger);
    }
</style>
