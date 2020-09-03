const fs = require("fs");
const axios = require("axios");
const argv = process.argv;
const arg = argv[2]

// ======================================
// Function to console log retrieved data
// ======================================


function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log("Yikes! Error encountered")
            process.exit(1);
        } else {
            console.log(data);
        }
    })
}

async function webCat(url) {
    try {
        response = await axios.get(url);
        console.log(response.data);
    } catch(error) {
        console.log("Error fetching data from specified URL  :(");
        process.exit(1);
    }
}

// ==============================================
// Function to write new file with retrieved data
// ==============================================


function catWrite(fileToRead, fileToWrite) {
    fs.readFile(fileToRead, 'utf8', function(err, data) {
        if (err) {
            console.log("Yikes! Error encountered")
            process.exit(1);
        } else {
            fs.writeFile(fileToWrite, data, "utf8", function(err){
                if (err) {
                    console.log("Error writing data on new file.")
                }
            })
        }
    })
}

async function webCatWrite(url, fileToWrite) {
    try {
        let response = await axios.get(url);
        
        fs.writeFile(fileToWrite, response.data, "utf8", function(err) {
            if (err) {
                console.log("Error writing file with fetched data from specidied URL");
            }
        })

    } catch(error) {
        console.log("Error fetching data from specified URL  :(");
        process.exit(1);
    }
}

// ==============================================
// Execute appropriate function
// ==============================================


if (arg == "--out") {
    let outputFilename = argv[3];
    let readFrom = argv[4];

    if (readFrom.includes("http")) {
        webCatWrite(readFrom, outputFilename)
    } else {
        catWrite(readFrom, outputFilename);
    }
} else {
    if (arg.includes('http')) {
        webCat(arg);    
    } else {
        cat(arg);
    }
}





