import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
    test: {
        globalSetup: './test/global-setup.ts',
        reporters: [['junit', { outputFile: 'test-results.xml' }], 'verbose'],
        poolOptions: {
            workers: {
                wrangler: { configPath: './test/wrangler.toml' },
            },
        },
    },
});
