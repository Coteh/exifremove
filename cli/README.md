# exifremove-cli

Command-line interface that utilizes [exifremove](https://github.com/Coteh/exifremove) to remove EXIF metdata from JPEG images.

## Installation

### Normal Installation

`npm install -g exifremove-cli`

### Development Installation

1. `cd` into project root. (containing the main `exifremove` module)
1. Run `npm link` to link it to global `node_modules`.
1. `cd` back into CLI folder, run `npm link exifremove` to link `exifremove` dependency to the linked version made in the previous step.
1. Run `npm install` to install the remaining CLI dependencies.

## Usage

```
exifremove [image0] ... [imageN]

Options:
--version            Show version number                             [boolean]
-v, --verbose        Print extra messages                              [count]
--km, --keep-marker  Keeps the APP1 marker in the JPEG               [boolean]
-h, --help           Show help                                       [boolean]
```
