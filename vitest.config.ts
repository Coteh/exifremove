import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        globalSetup: './test/global-setup.ts',
        reporters: [['junit', { outputFile: 'test-results.xml' }], 'verbose'],
        coverage: {
            provider: 'v8',
            reporter: ['lcov', 'text'],
        },
    },
});
