/// <reference types="vitest/config" />

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react(), tailwindcss()],

    define: {
        __PROJECT_ROOT__: JSON.stringify(dirname),
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        },
    },

    server: {
        proxy: {
            '/api': {
                target: 'https://juniorsbootcamp.ru',
                changeOrigin: true,
                secure: false,
            },
        },
    },

    test: {
        reporters: ['default', 'html'],
        outputFile: { html: '.storybook/screenshots/report/index.html' },

        projects: [
            {
                extends: true,

                test: {
                    name: 'unit',
                    environment: 'jsdom',
                    setupFiles: ['./tests/setup.ts'],
                    include: ['src/**/*.test.{ts,tsx}'],
                },
            },

            {
                extends: true,

                plugins: [
                    storybookTest({
                        configDir: path.join(dirname, '.storybook'),
                    }),
                ],

                test: {
                    name: 'storybook',

                    setupFiles: ['.storybook/vitest.setup.ts'],

                    globalSetup: ['.storybook/clean-attachments.ts'],

                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright({}),

                        instances: [
                            {
                                browser: 'chromium',
                            },
                        ],

                        expect: {
                            toMatchScreenshot: {
                                resolveScreenshotPath: ({ testFileName, arg, browserName, ext }) => {
                                    const screenshotPath = `.storybook/screenshots/references/${testFileName}/${arg}-${browserName}-${process.platform}${ext}`
                                    console.log('REF:', screenshotPath)
                                    return screenshotPath
                                },
                                resolveDiffPath: ({ testFileName, arg, browserName, ext }) => {
                                    const diffPath = `.storybook/screenshots/.diffs/${testFileName}/${arg}-${browserName}-${process.platform}${ext}`
                                    console.log('DIF:', diffPath)
                                    return diffPath
                                },
                            },
                        },
                    },
                },
            },
        ],
    },
})
