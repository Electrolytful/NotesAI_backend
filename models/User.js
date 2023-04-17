const db = require("../database/db_connect.js");

class User {
  constructor(user) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  }

  // function to find user by id, if none exist return false, else return the user object
  static async getUserById(id) {
    const result = await db.query("SELECT * FROM users WHERE user_id = $1;", [
      id,
    ]);

    if (result.rows.length != 1) {
      return false;
    }
    return new User(result.rows[0]);
  }

  // function to find user by email, if none exist return false, else return the user object
  static async getUserByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);

    if (result.rows.length != 1) {
      return false;
    }
    return new User(result.rows[0]);
  }

  // function to create a new User, takes the form inputs and inserts values into the database, returning the result as the object of the created user
  static async create(newUser) {
    const { username, email, hashedPassword } = newUser;

    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;",
      [username, email, hashedPassword]
    );
    return new User(result.rows[0]);
  }

  async destroy() {
    const result = await db.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *;",
      [this.user_id]
    );
    return new User(result.rows[0]);
  }
}

module.exports = User;
