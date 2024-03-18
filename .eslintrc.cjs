/* eslint-env node */
module.exports = {
    extends: [
        // add more generic rule sets here, such as:
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:svelte/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // ...
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte'], // This is a required setting in `@typescript-eslint/parser` v4.24.0.
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
        {
            extends: ['plugin:@typescript-eslint/disable-type-checked'],
            files: ['./**/*.cjs'],
        },
    ],
    rules: {
        // override/add rules settings here, such as:
        // 'svelte/rule-name': 'error'
    },
};
