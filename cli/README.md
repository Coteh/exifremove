# exifremove-cli

## Installation

### Normal Installation

`npm install exifremove-cli`

### Development Installation

Run `npm install` to install CLI dependencies.

`cd` into root directory of this repository (containing dependency `exifremove`), run

`npm link`

to link it to your global `node_modules`.

`cd` back into `exifremove-cli` directory, run

`npm link exifremove`

to overwrite `exifremove` dependency with a symlink to your local installation.

## Usage

```
exifremove [image0] ... [imageN]

Options:
--version            Show version number                             [boolean]
-v, --verbose        Print extra messages                              [count]
--km, --keep-marker  Keeps the APP1 marker in the JPEG               [boolean]
-h, --help           Show help                                       [boolean]
```
