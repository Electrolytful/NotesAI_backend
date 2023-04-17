// imports
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");


// defining the port
const port = process.env.PORT || 4000;

// initialising server
const app = express();

// applying middleware
app.use(express.json());
app.use(cors());

// running the server on the specified port
app.listen(port, () => {
    console.log(`NotesAI server running on port: ${port}`);
});

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the NotesAI api!");
});
