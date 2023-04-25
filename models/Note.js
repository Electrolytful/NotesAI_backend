// imports
const db = require("../database/db_connect.js");


// note class model, constructor takes the note object returned by database
class Note {
  constructor(note) {
    this.notes_id = note.notes_id;
    this.title = note.title;
    this.content = note.content;
    this.summary = note.summary;
    this.user_id = note.user_id;
  }

  // static function to select all notes for a specific user
  static async getAllUserNotes(userid) {
    const result = await db.query("SELECT * FROM notes WHERE user_id = $1;", [
      userid,
    ]);

    // if no notes are found for the user, return false, else return an array of Notes
    if (result.rows.length > 0) {
      return result.rows.map((note) => new Note(note));
    } else {
      return false;
    }
  }

  // static function to select a note with the specified id
  static async getUserNoteById(id) {
    const result = await db.query("SELECT * FROM notes WHERE notes_id = $1;", [
      id,
    ]);

    // if no note with the specified id is found, return false, else return the Note
    if (result.rows.length != 1) {
      return false;
    } else {
      return new Note(result.rows[0]);
    }
  }

  // static function to insert a new note into the database
  static async create(newNote) {
    // destructure the values passed from the controller
    const { title, content, summary, user_id } = newNote;

    // insert into the notes table and return the inserted Note
    const result = await db.query(
      "INSERT INTO notes (title, content, summary, user_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      [title, content, summary, user_id]
    );
    return new Note(result.rows[0]);
  }

  // function to delete a note from the database, called on a Note instance in the controller
  async destroy() {
    const result = await db.query(
      "DELETE FROM notes WHERE notes_id = $1 RETURNING *;",
      [this.notes_id]
    );
    return new Note(result.rows[0]);
  }

  // function to update a note from the database, called on a Note instance and takes the new note parameters
  async update(newNote) {
    // destructure the values passed from the controller
    const { title, content } = newNote;

    const result = await db.query(
      "UPDATE notes SET title = $1, content = $2 WHERE notes_id = $3 RETURNING *;",
      [title, content, this.notes_id]
    );

    return new Note(result.rows[0]);
  }
}


module.exports = Note;
