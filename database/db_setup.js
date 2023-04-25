// file to setup and load the database with values
// imports
require("dotenv").config();
const fs = require("fs");
const db = require("./db_connect.js");


// read the setup sql file and query the database to create tables
const sql = fs.readFileSync("./database/setup.sql").toString();

db.query(sql)
  .then((data) => {
    db.end();
    console.log("Setup complete.");
  })
  .catch((error) => console.log(error));
