require("dotenv").config();
const { beforeEach } = require("node:test");
const User = require("./User.js");
const { Pool } = require("pg");

describe("User Model", () => {
    let testDB;

    beforeAll(async () => {
        testDB = new Pool({
            connectionString: process.env.TEST_DB_URL,
            max: 1,
            idleTimeoutMillis: 0,
        });
    });

    beforeEach(async () => {
        await testDB.query("CREATE TABLE users( user_id uuid DEFAULT uuid_generate_v4 (), username VARCHAR(100) NOT NULL UNIQUE, email VARCHAR(155) NOT NULL UNIQUE, password VARCHAR(100) NOT NULL, PRIMARY KEY(user_id));");
    });

    afterEach(async () => {
        await testDB.query("DROP TABLE IF EXISTS users");
    })



});
