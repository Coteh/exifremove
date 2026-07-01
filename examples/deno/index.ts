import { remove } from 'npm:exifremove';

const inputPath = Deno.args[0];
if (!inputPath) {
    console.error('Usage: deno run --allow-read --allow-write examples/deno/index.ts <image.jpg>');
    Deno.exit(1);
}

const input = await Deno.readFile(inputPath);
const output = remove(Buffer.from(input));
const outputPath = inputPath.replace(/(\.[^.]+)$/, '.modified$1');
await Deno.writeFile(outputPath, output);
console.log(`Written to ${outputPath}`);
