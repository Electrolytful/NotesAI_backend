// imports
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const store = new session.MemoryStore();

// defining the port
const port = process.env.PORT || 4000;

// initialising server
const server = express();

// applying middleware
server.use(express.json())
server.use(cors());

// running the server on the specified port
server.listen(port, () => {
    console.log(`NotesAI server running on port: ${port}`);
});

server.get("/", (req, res) => {
    res.status(200).send("Welcome to the NotesAI api!");
})
