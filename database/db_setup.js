require('dotenv').config();

const fs = require('fs');
const db = require('./db_connect');

const sql = fs.readFileSync('./setup.sql').toString();

db.query(sql)
  .then((data) => {
    db.end();
    console.log("Setup complete.");
  })
  .catch((error) => console.log(error));
