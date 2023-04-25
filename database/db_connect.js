// imports
const { Pool } = require("pg");

// create a new pool with the connection string to the database in the .env file
const db = new Pool({
  connectionString: process.env.DB_URL,
});


module.exports = db;
