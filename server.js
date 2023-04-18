// imports
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const usersRoute = require("./routes/usersRoutes.js");
const notesRoute = require("./routes/notesRoutes.js");

// global variables
const oneDay = 1000 * 60 * 60 * 24;

// defining the port
const port = process.env.PORT || 4000;

// initialising server
const app = express();

// applying middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: oneDay },
  })
);

// running the server on the specified port
app.listen(port, () => {
  console.log(`NotesAI server running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the NotesAI api!");
});

// users route
app.use("/users", usersRoute);

// notes route
app.use("/notes", notesRoute);
