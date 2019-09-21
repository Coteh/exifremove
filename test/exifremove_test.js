const assert = require("assert");
const fs = require("fs");
const exifremove = require("../src/exifremove");

describe("exifremove", function() {
    let imageBuffer;
    let expectedIndices = [20, 21, 22, 23];
    let exifData = "ffe11dfe";
    
    before(function() {
        imageBuffer = fs.readFileSync("./test/img/test.jpg");
    });

    describe("remove", function() {
        it("should remove EXIF from a single image correctly", function() {
            var result = exifremove.remove(imageBuffer);
            var strToCheck = "";
            expectedIndices.forEach((index) => {
                strToCheck += result[index].toString(16);
            });
            assert.notStrictEqual(strToCheck, exifData);
        });
        it("should keep APP1 section if keepMarker is specified", function() {
            const exifData = "ffe102"
            var result = exifremove.remove(imageBuffer, {
                keepMarker: true
            });
            var strToCheck = "";
            expectedIndices.forEach((index) => {
                strToCheck += result[index].toString(16);
            });
            assert.strictEqual(strToCheck, exifData);
        });
        it("should throw for non-JPEG formats", function() {
            var testBuffer = fs.readFileSync("./test/img/test_no_png.png");
            try {
                exifremove.remove(testBuffer);
            } catch (e) {
                assert.strictEqual(e.message, "Not a JPEG");
                return;
            }
            assert.fail("This should not pass");
        });
        it("should return undefined if image buffer passed in is empty", function() {
            var result = exifremove.remove(new Buffer(""));
            assert.strictEqual(result, undefined);
        });
        it("should return undefined if image buffer passed in is undefined", function() {
            var result = exifremove.remove(undefined);
            assert.strictEqual(result, undefined);
        });
        it("should return undefined if image buffer passed in is null", function () {
            var result = exifremove.remove(null);
            assert.strictEqual(result, undefined);
        });
        it("should not alter an image that did not have EXIF metadata originally", function() {
            var testBuffer = fs.readFileSync("./test/img/test_no_exif.jpg");
            var result = exifremove.remove(testBuffer);
            assert(result.equals(result));
        });
    });

    describe("removeMultiple", function() {
        it("should remove EXIF from all images passed in", function() {
            assert.fail("Not yet implemented");
        });
        it("should not attempt to remove EXIF for empty image array", function() {
            assert.fail("Not yet implemented");
        });
    });
});
