import { expectType } from "tsd";
import { remove, removeMultiple, RemoveOptions } from "../src/exifremove";

// remove with Buffer input
const buf = Buffer.from([0xff, 0xd8]);
const result = remove(buf);
expectType<Buffer | undefined>(result);

// remove with Uint8Array input
const uint8 = new Uint8Array([0xff, 0xd8]);
const result2 = remove(uint8);
expectType<Buffer | undefined>(result2);

// remove with options
const options: RemoveOptions = { verbose: true, keepMarker: false };
const result3 = remove(buf, options);
expectType<Buffer | undefined>(result3);

// remove with no options
const result4 = remove(buf);
expectType<Buffer | undefined>(result4);

// removeMultiple
const results = removeMultiple([buf, uint8]);
expectType<Array<Buffer | undefined>>(results);

// removeMultiple with options
const results2 = removeMultiple([buf], { verbose: true });
expectType<Array<Buffer | undefined>>(results2);
