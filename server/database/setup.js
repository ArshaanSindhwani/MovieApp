// Loads variables from .env
require("dotenv").config();

// Imports Node file system module
const fs = require("fs");

// Imports database connection
const db = require("./connect");

// Reads SQL file and converts it into a string
const sql = fs.readFileSync("./database/setup.sql").toString();

// Runs SQL against database
db.query(sql)
    .then(() => {
        // Closes database connection
        db.end();
        console.log("Setup complete");
    })
    .catch(error => {
        console.log(error);
    });