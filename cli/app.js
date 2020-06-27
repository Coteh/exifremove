#!/usr/bin/env node

const fs = require("fs");
const exifRemove = require("exifremove");
const argv = require("yargs")
    .usage("exifremove [image0] ... [imageN]")
    .count("verbose")
    .alias("v", "verbose")
    .boolean("keep-marker")
    .alias("km", "keep-marker")
    .alias("h", "help")
    .describe({
        "verbose": "Print extra messages",
        "keep-marker": "Keeps the APP1 marker in the JPEG"
    })
    .argv;

var imageArr = argv._;

if (imageArr.length === 0) {
    console.error("No images supplied");
    process.exit(1);
}

imageArr.forEach((elem) => {
    var lowercaseName = elem.toLowerCase();
    if (!lowercaseName.endsWith(".jpg") && !lowercaseName.endsWith(".jpeg")) {
        console.error("'" + elem + "' is not a JPEG.");
        process.exit(1);
    }
});

var images = imageArr.map((elem) => {
                try {
                    var destFileName = elem.split(".");
                    destFileName.splice(destFileName.length - 1, 0, "modified");
                    return {
                        buffer: fs.readFileSync(elem),
                        srcFileName: elem,
                        destFileName: destFileName.join(".")
                    };
                } catch (e) {
                    if (e.code === "ENOENT") {
                        console.log("Error opening '" + elem + "'. Image file does not exist.");
                    } else {
                        console.log("Unknown error opening '" + elem + "'. Error code: " + e.code);
                    }
                    process.exit(1);
                }
            });

images.forEach((imageFileInfo) => {
    var imageFile = imageFileInfo.buffer;

    if (argv.verbose) {
        console.log("Processing '" + imageFileInfo.srcFileName + "'");
        if (argv.verbose > 1)
            console.log(imageFile);
        console.log("Image file length: " + imageFile.length);
    }

    var result = exifRemove.remove(imageFileInfo.buffer, {
        keepMarker: argv.keepMarker,
        verbose: argv.verbose
    });

    if (argv.verbose)
        console.log("Writing EXIF-stripped image file to '" + imageFileInfo.destFileName + "'...");

    fs.writeFile(imageFileInfo.destFileName, result, (err) => {
        if (err) {
            console.error("Error writing file");
            return;
        }
        console.log("File written successfully.");
    })
});
