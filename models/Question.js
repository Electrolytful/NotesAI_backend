const db = require("../database/db_connect.js");

class Question {
  constructor(question) {
    this.question_id = question.question_id;
    this.question = question.question;
    this.answer = question.answer;
    this.user_id = question.user_id;
  }

  static async getAllUserQuestions(userid) {
    const result = await db.query(
      "SELECT * FROM questions WHERE user_id = $1;",
      [userid]
    );

    if (result.rows.length > 0) {
      return result.rows.map((q) => new Question(q));
    } else {
      return false;
    }
  }

  static async getUserQuestionById(id) {
    const result = await db.query(
      "SELECT * FROM questions WHERE question_id = $1;",
      [id]
    );

    if (result.rows.length != 1) {
      return false;
    } else {
      return new Question(result.rows[0]);
    }
  }

  static async create(newQuestion) {
    const { question, answer, user_id } = newQuestion;

    const result = await db.query(
      "INSERT INTO questions (question, answer, user_id) VALUES ($1, $2, $3) RETURNING *;",
      [question, answer, user_id]
    );
    return new Question(result.rows[0]);
  }

  async destroy() {
    const result = await db.query(
      "DELETE FROM questions WHERE question_id = $1 RETURNING *;",
      [this.question_id]
    );
    return new Question(result.rows[0]);
  }
}

module.exports = Question;
