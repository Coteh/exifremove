const { remove } = require('../../src/exifremove.js');
const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2];
if (!inputPath) {
    console.error('Usage: node examples/node/index.js <image.jpg>');
    process.exit(1);
}

const input = fs.readFileSync(inputPath);
const output = remove(input);
const outputPath = inputPath.replace(/(\.[^.]+)$/, '.modified$1');
fs.writeFileSync(outputPath, output);
console.log(`Written to ${outputPath}`);
