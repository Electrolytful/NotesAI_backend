// imports
const Question = require("../models/Question.js");


async function getAllQuestions(req, res) {
  const userid = req.session.userid;

  const questions = await Question.getAllUserQuestions(userid);

  if (questions) {
    res.status(200).json(questions);
  } else {
    res.status(200).json([]);
  }
}


async function getQuestionById(req, res) {
  const id = req.params.id;

  const question = await Question.getUserQuestionById(parseInt(id));

  if (question && question.user_id == req.session.userid) {
    res.status(200).json(question);
  } else {
    res.status(404).json({ error: "No question with that ID found!" });
  }
}


async function createQuestion(req, res) {
  const userid = req.session.userid;
  const { question, answer } = req.body;

  const newQuestion = {
    question: question,
    answer: answer,
    user_id: userid,
  };

  const createdQuestion = await Question.create(newQuestion);
  res.status(201).json(createdQuestion);
}


async function destroyQuestion(req, res) {
  const id = req.params.id;

  const question = await Question.getUserQuestionById(parseInt(id));

  if (question && question.user_id === req.session.userid) {
    const deletedQuestion = await question.destroy();
    res.status(200).json(deletedQuestion);
  } else {
    res.status(404).json({ error: "No question with that ID found!" });
  }
}


module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  destroyQuestion,
};
