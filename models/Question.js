// imports
const db = require("../database/db_connect.js");


// question class model, constructor takes the question object returned by database
class Question {
  constructor(question) {
    this.question_id = question.question_id;
    this.question = question.question;
    this.answer = question.answer;
    this.user_id = question.user_id;
  }

  // static function to select all questions for a specific user
  static async getAllUserQuestions(userid) {
    const result = await db.query(
      "SELECT * FROM questions WHERE user_id = $1;",
      [userid]
    );

    // if no questions are found for the user, return false, else return an array of Questions
    if (result.rows.length > 0) {
      return result.rows.map((q) => new Question(q));
    } else {
      return false;
    }
  }

  // static function to select a question with the specified id
  static async getUserQuestionById(id) {
    const result = await db.query(
      "SELECT * FROM questions WHERE question_id = $1;",
      [id]
    );

    // if no question with the specified id is found, return false, else return the Question
    if (result.rows.length != 1) {
      return false;
    } else {
      return new Question(result.rows[0]);
    }
  }

  // static function to insert a new question into the database
  static async create(newQuestion) {
    // destructure the values passed from the controller
    const { question, answer, user_id } = newQuestion;

    // insert into the questions table and return the inserted Question
    const result = await db.query(
      "INSERT INTO questions (question, answer, user_id) VALUES ($1, $2, $3) RETURNING *;",
      [question, answer, user_id]
    );
    return new Question(result.rows[0]);
  }

  // function to delete a question from the database, called on a Question instance in the controller
  async destroy() {
    const result = await db.query(
      "DELETE FROM questions WHERE question_id = $1 RETURNING *;",
      [this.question_id]
    );
    return new Question(result.rows[0]);
  }
}


module.exports = Question;
