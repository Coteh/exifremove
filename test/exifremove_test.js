const assert = require("assert");
const fs = require("fs");
const exifremove = require("../src/exifremove");

/**
 * Check for presence of APP1 metadata headers up until the start of stream (SOS) of image,
 * which is the end of the metadata.
 * @param {} buffer
 * @param {*} additionalChecks
 */
function checkForAPP1Header(buffer, additionalChecks) {
    for (let i = 0; i < buffer.length; i++) {
        // Gather the hex representation of the two bytes found at this point in string format
        bytePortion = buffer[i].toString(16) + buffer[i + 1].toString(16);

        // There should be no EXIF metadata after the SOS marker
        if (bytePortion === "ffda") {
            return false;
        }

        // If APP1 header is found, check for EXIF header, and return true if found
        if (bytePortion === "ffe1") {
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
                buffer[i + 4].toString(16) + buffer[i + 5].toString(16) === "4578" &&
                buffer[i + 6].toString(16) + buffer[i + 7].toString(16) === "6966" &&
                buffer[i + 8].toString(16) + buffer[i + 9].toString(16) === "00"
            );
        },
    ]);
}

describe("exifremove", function () {
    let imageBuffer;

    before(function () {
        imageBuffer = fs.readFileSync("test/img/test.jpg");
    });

    describe("remove", function () {
        it("should remove EXIF from a single image correctly", function () {
            var result = exifremove.remove(imageBuffer);

            // Check that Exif header is no longer present
            assert.equal(checkForExifHeader(result), false);
        });
        it("should keep APP1 section if keepMarker is specified", function () {
            var result = exifremove.remove(imageBuffer, {
                keepMarker: true,
            });

            // Check that APP1 header still exists AND 0002 was written for the APP1 size (indicating that it's just those two bytes)
            assert.equal(
                checkForAPP1Header(result, [
                    (buffer, i) => {
                        return buffer[i + 2].toString(16) + buffer[i + 3].toString(16) === "02";
                    },
                ]),
                true,
            );
        });
        it("should throw for non-JPEG formats", function () {
            var testBuffer = fs.readFileSync("test/img/test_no_png.png");
            try {
                exifremove.remove(testBuffer);
            } catch (e) {
                assert.strictEqual(e.message, "Not a JPEG");
                return;
            }
            assert.fail("This should not pass");
        });
        it("should return undefined if image buffer passed in is empty", function () {
            var result = exifremove.remove(Buffer.alloc(0));
            assert.strictEqual(result, undefined);
        });
        it("should return undefined if image buffer passed in is undefined", function () {
            var result = exifremove.remove(undefined);
            assert.strictEqual(result, undefined);
        });
        it("should return undefined if image buffer passed in is null", function () {
            var result = exifremove.remove(null);
            assert.strictEqual(result, undefined);
        });
        it("should not alter an image that did not have EXIF metadata originally", function () {
            var testBuffer = fs.readFileSync("test/img/test_no_exif.jpg");
            var result = exifremove.remove(testBuffer);
            assert(result.equals(result));
        });
    });

    describe("removeMultiple", function () {
        it("should remove EXIF from all images passed in", function () {
            var result = exifremove.removeMultiple([
                imageBuffer,
                fs.readFileSync("test/img/test2.jpg"),
            ]);
            assert.strictEqual(result.length, 2);
            result.forEach((elem) => {
                // Check that Exif header is no longer present
                assert.equal(checkForExifHeader(elem), false);
            });
        });
        it("should return no elements if passing in an empty array", function () {
            var result = exifremove.removeMultiple([]);
            assert.strictEqual(result.length, 0);
        });
    });
});
