import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                // Toggle this to true for testing in dev mode
                enabled: false,
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
            includeAssets: ['favicon.ico', 'Icon.png', 'Icon512.png'],
            manifest: {
                name: 'Scorecard',
                short_name: 'Scorecard',
                description: 'My Awesome Scorecard',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'favicon.ico',
                        sizes: '64x64 32x32 24x24 16x16',
                        type: 'image/x-icon',
                    },
                    {
                        src: 'Icon.png',
                        type: 'image/png',
                        sizes: '128x128',
                    },
                    {
                        src: 'Icon512.png',
                        type: 'image/png',
                        sizes: '512x512',
                    },
                ],
            },
        }),
    ],
});
