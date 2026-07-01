import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        globalSetup: './test/global-setup.ts',
        environment: 'edge-runtime',
        reporters: [['junit', { outputFile: 'test-results.xml' }], 'verbose'],
    },
});
