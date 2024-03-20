import type { HTMLButtonAttributes } from 'svelte/elements';

export interface ButtonProps extends HTMLButtonAttributes {
    variant?: 'primary' | 'success' | 'danger';
}
