# exifremove — Vercel Edge Runtime

Use exifremove inside a Vercel Edge function. The function receives an image as a POST request body, strips its EXIF data, and returns the cleaned image.

## Installation

```bash
npm install exifremove
```

## Edge function pattern

```ts
import { remove } from 'exifremove';

export const config = { runtime: 'edge' };

export default async function handler(request: Request): Promise<Response> {
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
        return new Response((e as Error).message, { status: 400 });
    }
}
```

## Local development

With a Next.js or Vercel project, place the file under `pages/api/` or `app/api/` and run:

```bash
vercel dev
```

Then send a test request:
```bash
curl -X POST --data-binary @photo.jpg http://localhost:3000/api/exifremove > photo.modified.jpg
```

## Notes

- The Vercel Edge Runtime provides `Buffer` compatibility; no polyfill needed.
- `Buffer.from(ArrayBuffer)` converts the incoming request body to a format `remove()` accepts.
- `remove()` throws `Error('Not a JPEG')` for non-JPEG input — catch and return a 400 response.
- For testing in CI, see `vitest.config.edge.ts`, which uses Vitest's built-in `edge-runtime` environment backed by `@edge-runtime/vm`.
