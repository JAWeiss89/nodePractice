const fs = require("fs");
const argv = process.argv;
const myFile = argv[2]

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

cat(myFile);