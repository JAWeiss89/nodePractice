const fs = require("fs");
const axios = require("axios");
const argv = process.argv;
const address = argv[2]

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


// Run appropriate reading function based on if request is URL or local path

if (address.includes('http')) {
    webCat(address);    
} else {
    cat(address);
}
