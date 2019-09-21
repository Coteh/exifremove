# exifremove [![CircleCI](https://circleci.com/gh/Coteh/exifremove.svg?style=shield)](https://circleci.com/gh/Coteh/exifremove)

Dependency-free Node.js module that simply removes all EXIF metadata from a single image or a set of images.

## Installation

```sh
npm install exifremove
```

or, if you would like to use the CLI:

```sh
npm install -g exifremove
```

## Usage

```
exifremove [image0] ... [imageN]

Options:
--version            Show version number                             [boolean]
-v, --verbose        Print extra messages                              [count]
--km, --keep-marker  Keeps the APP1 marker in the JPEG               [boolean]
-h, --help           Show help                                       [boolean]
```
