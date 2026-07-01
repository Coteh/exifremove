import { readFileSync } from 'node:fs';

export function setup({ provide }: { provide: (key: string, value: unknown) => void }) {
    provide('fixtures', {
        testJpg: Array.from(readFileSync('test/img/test.jpg')),
        test2Jpg: Array.from(readFileSync('test/img/test2.jpg')),
        testNoExifJpg: Array.from(readFileSync('test/img/test_no_exif.jpg')),
        testNoPng: Array.from(readFileSync('test/img/test_no_png.png')),
    });
}
