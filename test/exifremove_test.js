const assert = require("assert");
const fs = require("fs");
const exifremove = require("../src/exifremove");

describe("exifremove", function() {
    let imageBuffer;
    let expectedIndices = [20, 21, 22, 23];
    let exifData = "ffe11dfe";
    
    before(function() {
        imageBuffer = fs.readFileSync("test/img/test.jpg");
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
            assert.fail("Not yet implemented");
        });
        it("should not accept anything besides JPEG", function() {
            assert.fail("Not yet implemented");
        });
        it("should fail if image buffer passed in is empty", function() {
            assert.fail("Not yet implemented");
        });
        it("should fail if image buffer passed in is undefined", function() {
            assert.fail("Not yet implemented");
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
