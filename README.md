# exifremove

[![CircleCI](https://circleci.com/gh/Coteh/exifremove.svg?style=shield)](https://circleci.com/gh/Coteh/exifremove)

Dependency-free Node.js module that simply removes all EXIF metadata from a single image or a set of images.

## Installation

```sh
npm install exifremove
```

or, if you would like to use the CLI:

```sh
npm install -g exifremove-cli
```

## Usage

### Module

Example of module usage:

```js
const fs = require('fs');
const exifremove = require('exifremove');

const image1 = fs.readFileSync('image1.jpg');
const image2 = fs.readFileSync('image2.jpg');

// Remove just one image's Exif
let image = exifremove.remove(image1);
console.log(image); // <Buffer ff d8 ...>

// Remove multiple images' Exif
let images = exifremove.removeMultiple([image1, image2]);
console.log(images);
/*
[
  <Buffer ff d8 ...>,
  <Buffer ff d8 ...>
]
*/
```

### CLI

Check out the [Readme for the CLI module](cli/README.md) for CLI usage information.
