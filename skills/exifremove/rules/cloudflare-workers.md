# exifremove — Cloudflare Workers

Use exifremove inside a Cloudflare Worker fetch handler. The Worker receives an image as a POST request body, strips its EXIF data, and returns the cleaned image.

## Requirements

Cloudflare Workers do not include Node.js APIs by default. Enable Node.js compatibility in `wrangler.toml`:

```toml
compatibility_flags = ["nodejs_compat"]
```

This makes `Buffer` and other Node built-ins available at runtime.

## Installation

```bash
npm install exifremove
```

## Worker pattern

```js
import { remove } from 'exifremove';

export default {
    async fetch(request) {
        if (request.method !== 'POST') {
            return new Response('Send a POST request with a JPEG image body', { status: 405 });
        }

        const imageData = await request.arrayBuffer();

        try {
            const result = remove(Buffer.from(imageData));
            return new Response(result, {
                headers: { 'Content-Type': 'image/jpeg' },
            });
        } catch (e) {
            return new Response(e.message, { status: 400 });
        }
    },
};
```

## wrangler.toml

```toml
name = "exifremove-worker"
main = "index.js"
compatibility_date = "2025-01-01"
compatibility_flags = ["nodejs_compat"]
```

## Local development

```bash
wrangler dev examples/cloudflare-workers/index.js
```

Send a test image:
```bash
curl -X POST --data-binary @photo.jpg http://localhost:8787 > photo.modified.jpg
```

## Deploy

```bash
wrangler deploy
```

## Notes

- `Buffer.from(ArrayBuffer)` converts the incoming request body to a format `remove()` accepts.
- The return value of `remove()` is a `Buffer`, which the `Response` constructor accepts directly.
- `remove()` throws `Error('Not a JPEG')` for non-JPEG input — catch and return a 400 response.
- For testing in CI, see `vitest.config.workers.ts` and `test/wrangler.toml`.
