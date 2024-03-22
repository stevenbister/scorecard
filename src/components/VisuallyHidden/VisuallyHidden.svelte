<span class="sr-only">
    <slot/>
</span>

<style>
    .sr-only:not(:focus):not(:active) {
        position: absolute;
        overflow: hidden;
        width: 1px;
        height: 1px;
        clip: rect(0 0 0 0);
        clip-path: inset(100%);
        white-space: nowrap;
    }
</style>