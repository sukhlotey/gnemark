#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { gneMarkToHTML } = require("./gneMarkToHTML");

// Get the input `.gne` file from command-line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("❌ Error: No input file provided.");
    console.log("Usage: gne2html <input-file.gne>");
    process.exit(1);
}

const inputFile = args[0];
const inputFilePath = path.resolve(inputFile);

if (!fs.existsSync(inputFilePath)) {
    console.error(`❌ Error: File "${inputFile}" not found.`);
    process.exit(1);
}

// Read the `.gne` file
fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("❌ Error reading the file:", err);
        process.exit(1);
    }

    // Convert GneMark to HTML
    const htmlContent = gneMarkToHTML(data);

    // Define output file (same name, but `.html` extension)
    const outputFile = inputFile.replace(/\.gne$/, ".html");

    // Save the converted HTML
    fs.writeFile(outputFile, htmlContent, (err) => {
        if (err) {
            console.error("❌ Error writing HTML file:", err);
            process.exit(1);
        }
        console.log(`✅ Successfully converted "${inputFile}" to "${outputFile}"`);
    });
});
