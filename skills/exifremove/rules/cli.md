# exifremove CLI

The CLI processes one or more JPEG files and writes the EXIF-stripped results to new files alongside the originals. It accepts only `.jpg` and `.jpeg` files (case-insensitive).

## Installation

```bash
npm install -g exifremove-cli
```

## Usage

```
exifremove [image0] ... [imageN]
```

## Flags

| Flag | Short | Type | Description |
|------|-------|------|-------------|
| `--verbose` | `-v` | count | Print processing details. Pass twice (`-vv`) for raw buffer output. |
| `--keep-marker` | `--km` | boolean | Keep the APP1 marker in place with a zeroed size, rather than removing the entire segment. |
| `--version` | | boolean | Print the installed version. |
| `--help` | `-h` | boolean | Show help. |

## Output Naming

For each input file, a new file is written with `modified` inserted before the extension:

```
photo.jpg         →  photo.modified.jpg
portrait.jpeg     →  portrait.modified.jpeg
shots/img001.jpg  →  shots/img001.modified.jpg
```

The original file is not modified.

## Examples

**Single file:**
```bash
exifremove photo.jpg
# File written successfully.
```

**Multiple files:**
```bash
exifremove img001.jpg img002.jpg img003.jpg
```

**Verbose output — see what the processor is doing:**
```bash
exifremove -v photo.jpg
# Processing 'photo.jpg'
# Image file length: 349028
# APP1 start
# offset in hex: 12f4
# offset in decimal: 4852
# Writing EXIF-stripped image file to 'photo.modified.jpg'...
# File written successfully.
```

**Keep the APP1 marker (zero out EXIF size instead of removing the segment):**
```bash
exifremove --km photo.jpg
```

## Error Behavior

| Condition | Output | Exit code |
|-----------|--------|-----------|
| No files supplied | `No images supplied` → stderr | 1 |
| File is not `.jpg` / `.jpeg` | `'file.png' is not a JPEG.` → stderr | 1 |
| File does not exist | `Error opening 'file.jpg'. Image file does not exist.` → stdout | 1 |
| Unknown file open error | `Unknown error opening 'file.jpg'. Error code: <code>` → stdout | 1 |
