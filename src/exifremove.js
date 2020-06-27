var remove = function(imageBuffer, options) {
    if (imageBuffer == undefined || imageBuffer.length < 2) {
        return undefined;
    }

    if (options == undefined) {
        options = {};
    }
    
    // Ensure it's a JPEG image before continuing
    var startPortion = imageBuffer[0].toString(16) + imageBuffer[1].toString(16);

    if (startPortion !== "ffd8") {
        throw new Error("Not a JPEG");
    }

    // Main portion which handles the logic for where to splice
    var offsetPairs = [];
    var lastRecordedByteIndex = 0;
    for (var i = 0; i + 1 < imageBuffer.length; i++) {
        // Gather the hex representation of the two bytes found at this point in string format
        bytePortion = imageBuffer[i].toString(16) + imageBuffer[i + 1].toString(16);

        // There should be no EXIF metadata after the SOS marker
        if (bytePortion === "ffda") {
            break;
        }

        // Check for markers
        switch (bytePortion) {
            // APP1 Marker (which is typically designated for EXIF)
            case "ffe1":
                // Grab offset size of the EXIF data which is found in following two bytes
                offsetSize = imageBuffer[i + 2] * 256 + imageBuffer[i + 3];

                if (options.verbose) {
                    console.log("APP1 start");
                    console.log("offset in hex: " + imageBuffer[i + 2].toString(16) + imageBuffer[i + 3].toString(16))
                    console.log("offset in decimal: " + offsetSize);
                }

                // By default, the first slice will start from last recorded index (typically 0)
                // and ends at the start of the APP1 section
                let offsetEnd = i;
                if (options.keepMarker) {
                    // Indicate that the size of the APP1 section is now just 2 bytes (these two)
                    imageBuffer[i + 2] = 0;
                    imageBuffer[i + 3] = 2;
                    // Offset end will now be at i + 4 to keep the marker and offset bytes
                    offsetEnd = i + 4
                }

                // Push the start and end offsets to the offset pairs,
                // to indicate that we want a slice of the data from these ends
                offsetPairs.push({
                    start: lastRecordedByteIndex,
                    end: offsetEnd
                });

                // Skip to the end of the APP1 segment
                lastRecordedByteIndex = i + offsetSize + 2;

                if (options.verbose)
                    console.log((imageBuffer[lastRecordedByteIndex] * 256 + imageBuffer[lastRecordedByteIndex + 1]).toString(16));

                i = lastRecordedByteIndex;
                if (options.verbose)
                    console.log("New i->" + i)

                break;
        }
    };

    // Write the last pair
    offsetPairs.push({
        start: lastRecordedByteIndex,
        end: imageBuffer.length
    });

    if (options.verbose)
        offsetPairs.forEach((pair) => {
            console.log(pair);
        });

    // This part here will slice the image buffer into pieces with the
    // size and offset of each piece defined by the offset pairs
    var imageSlices = offsetPairs.map((pair) => {
        return imageBuffer.slice(pair.start, pair.end);
    });

    return Buffer.concat(imageSlices);
};

module.exports.removeMultiple = function(imageBuffers, options) {
    if (options == undefined) {
        options = {};
    }

    return imageBuffers.map((imageBuffer) => remove(imageBuffer, options.verbose));
};

module.exports.remove = remove;
