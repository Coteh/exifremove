# exifremove — Deno

Import exifremove in Deno using the `npm:` specifier. No separate install step is needed; Deno fetches the package on first run.

## Import

```ts
import { remove, removeMultiple } from 'npm:exifremove';
```

## Permissions required

| Permission | Reason |
|---|---|
| `--allow-read` | Reading input image files from disk |
| `--allow-write` | Writing output image files to disk |
| `--allow-net` | Only if fetching images over HTTP |

## Examples

**Strip EXIF from a file:**
```ts
import { remove } from 'npm:exifremove';

const input = await Deno.readFile('photo.jpg');
const output = remove(Buffer.from(input));
await Deno.writeFile('photo.modified.jpg', output);
```

**Process multiple files:**
```ts
import { removeMultiple } from 'npm:exifremove';

const paths = ['img001.jpg', 'img002.jpg'];
const buffers = await Promise.all(paths.map((p) => Deno.readFile(p)));
const results = removeMultiple(buffers.map((b) => Buffer.from(b)));

for (let i = 0; i < results.length; i++) {
    const dest = paths[i].replace('.jpg', '.modified.jpg');
    await Deno.writeFile(dest, results[i]);
}
```

**Run the local example:**
```bash
deno run --allow-read --allow-write examples/deno/index.ts photo.jpg
```

## Notes

- Deno uses Node.js compatibility for `Buffer`. `Buffer.from(Uint8Array)` works correctly.
- `remove()` returns a `Buffer`, which Deno accepts in `Deno.writeFile()`.
- The `npm:` specifier requires Deno 1.28+.
