import { describe, it, beforeAll, expect, inject } from 'vitest';
import * as exifremove from '../src/exifremove.js';

/**
 * Check for presence of APP1 metadata headers up until the start of stream (SOS) of image,
 * which is the end of the metadata.
 */
function checkForAPP1Header(buffer, additionalChecks) {
    for (let i = 0; i < buffer.length; i++) {
        let bytePortion = buffer[i].toString(16) + buffer[i + 1].toString(16);

        if (bytePortion === 'ffda') {
            return false;
        }

        if (bytePortion === 'ffe1') {
            if (additionalChecks) {
                for (let j = 0; j < additionalChecks.length; j++) {
                    if (additionalChecks[j](buffer, i)) {
                        return true;
                    }
                }
            } else {
                return true;
            }
        }
    }

    return false;
}

function checkForExifHeader(buffer) {
    return checkForAPP1Header(buffer, [
        (buffer, i) => {
            return (
                buffer[i + 4].toString(16) + buffer[i + 5].toString(16) === '4578' &&
                buffer[i + 6].toString(16) + buffer[i + 7].toString(16) === '6966' &&
                buffer[i + 8].toString(16) + buffer[i + 9].toString(16) === '00'
            );
        },
    ]);
}

describe('exifremove', function () {
    let imageBuffer;
    let fixtures;

    beforeAll(() => {
        fixtures = inject('fixtures');
        imageBuffer = Buffer.from(fixtures.testJpg);
    });

    describe('remove', function () {
        it('should remove EXIF from a single image correctly', function () {
            const result = exifremove.remove(imageBuffer);
            expect(checkForExifHeader(result)).toBe(false);
        });
        it('should keep APP1 section if keepMarker is specified', function () {
            const result = exifremove.remove(imageBuffer, { keepMarker: true });
            expect(
                checkForAPP1Header(result, [
                    (buffer, i) =>
                        buffer[i + 2].toString(16) + buffer[i + 3].toString(16) === '02',
                ]),
            ).toBe(true);
        });
        it('should throw for non-JPEG formats', function () {
            const testBuffer = Buffer.from(fixtures.testNoPng);
            expect(() => exifremove.remove(testBuffer)).toThrow('Not a JPEG');
        });
        it('should return undefined if image buffer passed in is empty', function () {
            expect(exifremove.remove(Buffer.alloc(0))).toBeUndefined();
        });
        it('should return undefined if image buffer passed in is undefined', function () {
            expect(exifremove.remove(undefined)).toBeUndefined();
        });
        it('should return undefined if image buffer passed in is null', function () {
            expect(exifremove.remove(null)).toBeUndefined();
        });
        it('should not alter an image that did not have EXIF metadata originally', function () {
            const testBuffer = Buffer.from(fixtures.testNoExifJpg);
            const result = exifremove.remove(testBuffer);
            expect(result.equals(testBuffer)).toBe(true);
        });
    });

    describe('removeMultiple', function () {
        it('should remove EXIF from all images passed in', function () {
            const test2Buffer = Buffer.from(fixtures.test2Jpg);
            const result = exifremove.removeMultiple([imageBuffer, test2Buffer]);
            expect(result).toHaveLength(2);
            result.forEach((elem) => {
                expect(checkForExifHeader(elem)).toBe(false);
            });
        });
        it('should keep APP1 section for all images if keepMarker is specified', function () {
            const test2Buffer = Buffer.from(fixtures.test2Jpg);
            const result = exifremove.removeMultiple([imageBuffer, test2Buffer], {
                keepMarker: true,
            });
            expect(result).toHaveLength(2);
            result.forEach((elem) => {
                expect(
                    checkForAPP1Header(elem, [
                        (buffer, i) =>
                            buffer[i + 2].toString(16) + buffer[i + 3].toString(16) === '02',
                    ]),
                ).toBe(true);
            });
        });
        it('should return no elements if passing in an empty array', function () {
            expect(exifremove.removeMultiple([])).toHaveLength(0);
        });
    });
});
