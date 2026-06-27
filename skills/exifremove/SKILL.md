---
name: exifremove
version: 1.0.1
description: Remove EXIF metadata from JPEG images. Use when working with JPEG files that contain metadata to be stripped, processing images for privacy, or automating EXIF removal in Node.js scripts or pipelines. Triggers include "exifremove", "remove exif", "strip exif", "strip metadata", "jpeg metadata", "image metadata removal".
metadata:
  short-description: Strip EXIF metadata from JPEG images
  compatibility: claude-code
---

# exifremove

`exifremove` strips EXIF metadata from JPEG images by operating directly on the raw bytes of the file. It locates and removes APP1 segments (the standard carrier for EXIF data) without re-encoding the image, so there is no quality loss.

Two usage modes are available:

| Mode | Package | When to use |
|------|---------|-------------|
| **CLI** | `exifremove-cli` | One-off file processing, shell scripts |
| **Node module** | `exifremove` | Programmatic use inside a Node.js application |

## Installation

**CLI (global):**
```bash
npm install -g exifremove-cli
```

**Node module:**
```bash
npm install exifremove
```

## Quick Examples

**CLI — strip a single file:**
```bash
exifremove photo.jpg
# writes photo.modified.jpg
```

**Node module — strip from a buffer:**
```js
const { remove } = require('exifremove');
const fs = require('fs');

const input = fs.readFileSync('photo.jpg');
const output = remove(input);
fs.writeFileSync('photo.modified.jpg', output);
```

## References

- [cli](rules/cli.md) — CLI flags, output naming, and examples
- [node](rules/node.md) — Node module API, options, and TypeScript types
