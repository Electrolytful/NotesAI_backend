const db = require("../database/db_connect.js");

class Note {
    constructor(note) {
        this.notes_id = note.notes_id;
        this.title = note.title;
        this.content = note.content;
        this.summary = note.summary;
        this.user_id = note.user_id;
    }

    static async getAllUserNotes(userid) {
        const result = await db.query("SELECT * FROM notes WHERE user_id = $1;", [userid]);

        if (result.rows.length > 0) {
            return result.rows.map(note => new Note(note));
        } else {
            return false;
        }
    }

    static async getUserNoteById(id) {
        const result = await db.query("SELECT * FROM notes WHERE notes_id = $1;", [id]);

        if(result.rows.length != 1) {
            return false;
        } else {
            return new Note(result.rows[0]);
        }
    }

    static async create(newNote) {
        const { title, content, summary, user_id } = newNote;

        const result = await db.query(
          "INSERT INTO notes (title, content, summary, user_id) VALUES ($1, $2, $3, $4) RETURNING *;",
          [title, content, summary, user_id]
        );
        return new Note(result.rows[0]);
    }

    async destroy() {
        const result = await db.query(
          "DELETE FROM notes WHERE notes_id = $1 RETURNING *;",
          [this.notes_id]
        );
        return new Note(result.rows[0]);
    }

}

module.exports = Note;
