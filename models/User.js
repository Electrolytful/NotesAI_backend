// imports
const db = require("../database/db_connect.js");


// user class model, constructor takes the user object returned by database
class User {
  constructor(user) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  }

  // static function to select user by id
  static async getUserById(id) {
    const result = await db.query("SELECT * FROM users WHERE user_id = $1;", [
      id,
    ]);

    // if no user is found, return false, else return the User
    if (result.rows.length != 1) {
      return false;
    }
    return new User(result.rows[0]);
  }

  // static function to select user by email
  static async getUserByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);

    // if no user is found, return false, else return the User
    if (result.rows.length != 1) {
      return false;
    }
    return new User(result.rows[0]);
  }

  // static function to create a new user
  static async create(newUser) {
    // destructure the values passed from the controller
    const { username, email, hashedPassword } = newUser;

    // insert into the users table and return the inserted User
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;",
      [username, email, hashedPassword]
    );
    return new User(result.rows[0]);
  }

  // function to delete a user from the database, called on a User instance in the controller
  async destroy() {
    const result = await db.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *;",
      [this.user_id]
    );
    return new User(result.rows[0]);
  }
}


module.exports = User;
