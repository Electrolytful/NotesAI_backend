// imports
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

// function to display the user currently logged in
async function displayUser(req, res) {
  const user = await User.getUserById(req.params.id);

  if (user) {
    const { username, email } = user;
    const sendUser = {
      username: username,
      email: email,
    };
    res.status(200).json(sendUser);
  } else {
    res.status(404).json({ error: "No user with that id found!" });
  }
}

// function to register the user
async function registerUser(req, res) {
  // destructuring the request body to get user form data
  const { username, email, password } = req.body;

  const userExists = await User.getUserByEmail(email);

  if (userExists) {
    res.status(400).json({
      error: "User with that email already exists. Please choose another.",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      hashedPassword,
    };
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  }
}

// function to login the user
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // check if user with the specified email exists, if not send an error message
    const user = await User.getUserByEmail(email);

    if (!user) {
      res.status(404).json({ error: "No user registered with that email!" });
    }

    // compare the password given and the hashed password stored in the database, if they dont match send error else set the user to be authenticated with cookie
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      res.status().json({ error: "Incorrect password!" });
    } else {
      session = req.session;
      session.userid = user.user_id;
      res
        .status(200)
        .json({ message: `Successfully logged in user: ${user.username}` });
    }
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
}

// function to logout the user
async function logoutUser(req, res) {
  req.session.destroy();
  res.status(200).json({ message: "Successfully logged out!" });
}

// function to delete a user
async function destroyUser(req, res) {
  const user = await User.getUserById(req.params.id);

  if (user) {
    const deletedUser = await user.destroy();
    res.status(200).json(deletedUser);
  } else {
    res.status(400).json({ error: "No user exists with the given id!" });
  }
}

module.exports = {
  displayUser,
  registerUser,
  loginUser,
  logoutUser,
  destroyUser,
};
