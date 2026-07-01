import { defineConfig } from 'vitest/config';
import { cloudflareTest } from '@cloudflare/vitest-pool-workers';

export default defineConfig({
    plugins: [cloudflareTest({ wrangler: { configPath: './test/wrangler.toml' } })],
    test: {
        globalSetup: './test/global-setup.ts',
        reporters: [['junit', { outputFile: 'test-results.xml' }], 'verbose'],
    },
});
