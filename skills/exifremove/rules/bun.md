# exifremove — Bun

Bun is fully compatible with Node.js APIs, so exifremove works identically to Node. Install and import patterns follow npm conventions.

## Installation

```bash
bun add exifremove
```

## Import

```ts
// ESM (recommended in Bun)
import { remove, removeMultiple } from 'exifremove';

// CommonJS also works
const { remove, removeMultiple } = require('exifremove');
```

## Examples

**Strip EXIF from a file:**
```ts
import { remove } from 'exifremove';
import { readFileSync, writeFileSync } from 'fs';

const input = readFileSync('photo.jpg');
const output = remove(input);
writeFileSync('photo.modified.jpg', output);
```

**Process multiple files:**
```ts
import { removeMultiple } from 'exifremove';
import { readFileSync, writeFileSync } from 'fs';

const paths = ['img001.jpg', 'img002.jpg'];
const results = removeMultiple(paths.map((p) => readFileSync(p)));

results.forEach((result, i) => {
    if (result === undefined) return;
    writeFileSync(paths[i].replace('.jpg', '.modified.jpg'), result);
});
```

**Run the local example:**
```bash
bun run examples/bun/index.ts photo.jpg
```

## Notes

- `Buffer` is fully available in Bun; no polyfill needed.
- Bun's `fs` module is compatible with Node's — all existing Node.js code using `fs.readFileSync` / `fs.writeFileSync` works unchanged.
