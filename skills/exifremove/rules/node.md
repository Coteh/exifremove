# exifremove Node Module

The Node module exposes two functions that operate on `Buffer` or `Uint8Array` objects. It has zero runtime dependencies.

## Installation

```bash
npm install exifremove
```

TypeScript types are included at `src/exifremove.d.ts` — no `@types/` package is needed.

## Import

```js
// CommonJS
const { remove, removeMultiple } = require('exifremove');
```

```ts
// TypeScript
import { remove, removeMultiple, RemoveOptions } from 'exifremove';
```

## API

### `remove(imageBuffer, options?)`

Strips EXIF data from a single JPEG image buffer.

```ts
function remove(
    imageBuffer: Uint8Array | Buffer,
    options?: RemoveOptions,
): Buffer | undefined;
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `imageBuffer` | `Uint8Array \| Buffer` | Raw bytes of the JPEG image |
| `options` | `RemoveOptions` | Optional. See [Options](#options). |

**Returns:** A new `Buffer` with the EXIF data removed, or `undefined` if `imageBuffer` is `undefined`, `null`, or fewer than 2 bytes.

**Throws:** `Error('Not a JPEG')` if the buffer does not start with the JPEG SOI marker (`0xFFD8`).

---

### `removeMultiple(imageBuffers, options?)`

Strips EXIF data from an array of JPEG image buffers.

```ts
function removeMultiple(
    imageBuffers: Array<Uint8Array | Buffer>,
    options?: RemoveOptions,
): Array<Buffer | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `imageBuffers` | `Array<Uint8Array \| Buffer>` | Array of raw image buffers |
| `options` | `RemoveOptions` | Optional. See [Options](#options). |

**Returns:** An array of `Buffer | undefined` values, one per input, in the same order.

---

### Options

```ts
interface RemoveOptions {
    verbose?: boolean;
    keepMarker?: boolean;
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `verbose` | `boolean` | `false` | Log APP1 offset details to `console.log` during processing. |
| `keepMarker` | `boolean` | `false` | Instead of removing the APP1 segment entirely, keep the marker bytes and set the segment size to `0x0002` (effectively empty). Useful when downstream tools expect the APP1 marker to be present. |

## Examples

**Read a file, strip EXIF, write result:**
```js
const { remove } = require('exifremove');
const fs = require('fs');

const input = fs.readFileSync('photo.jpg');
const output = remove(input);
fs.writeFileSync('photo.modified.jpg', output);
```

**Handle non-JPEG input gracefully:**
```js
const { remove } = require('exifremove');

function tryRemove(buffer) {
    try {
        return remove(buffer);
    } catch (err) {
        if (err.message === 'Not a JPEG') {
            console.error('Skipping: not a JPEG file');
            return null;
        }
        throw err;
    }
}
```

**Process multiple files:**
```js
const { removeMultiple } = require('exifremove');
const fs = require('fs');

const paths = ['img001.jpg', 'img002.jpg', 'img003.jpg'];
const buffers = paths.map((p) => fs.readFileSync(p));
const results = removeMultiple(buffers);

results.forEach((result, i) => {
    if (result) {
        const dest = paths[i].replace('.jpg', '.modified.jpg');
        fs.writeFileSync(dest, result);
    }
});
```

**Keep the APP1 marker (zero out EXIF instead of removing the segment):**
```js
const { remove } = require('exifremove');
const fs = require('fs');

const input = fs.readFileSync('photo.jpg');
const output = remove(input, { keepMarker: true });
fs.writeFileSync('photo.modified.jpg', output);
```

**TypeScript — typed options:**
```ts
import { remove, RemoveOptions } from 'exifremove';
import { readFileSync, writeFileSync } from 'fs';

const options: RemoveOptions = { keepMarker: true, verbose: false };
const input = readFileSync('photo.jpg');
const output = remove(input, options);
if (output) {
    writeFileSync('photo.modified.jpg', output);
}
```

## Behavior Notes

- `remove()` does not re-encode the image. It splices raw bytes, so there is no quality loss.
- Only APP1 segments are removed. Other JPEG markers (JFIF APP0, ICC profiles, etc.) are left untouched unless they also appear in APP1.
- Scanning stops at the SOS marker (`0xFFDA`), which marks the start of actual image data. No EXIF segments appear after that point in a well-formed JPEG.
- Images that have no EXIF data pass through unchanged.
