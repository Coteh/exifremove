const assert = require("assert");

describe("exifremove", function() {
    describe("remove", function() {
        it("should remove EXIF from a single image correctly", function() {
            assert.fail("Not yet implemented");
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
