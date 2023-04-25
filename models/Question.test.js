require("dotenv").config();
const Question = require("../models/Question.js");
const db = require("../database/db_connect.js");
const { Pool } = require("pg");

describe("Question Model", () => {
  let testDB;
  const userid = "0746df4e-2d1d-4f08-a30d-f321c5ddf19d";

  beforeAll(async () => {
    testDB = new Pool({
      connectionString: process.env.DB_URL,
      max: 1,
      idleTimeoutMillis: 0,
    });

    db.query = (text, values) => {
      return testDB.query(text, values);
    };
  });

  beforeEach(async () => {
    await testDB.query(
      "CREATE TEMPORARY TABLE questions (LIKE questions INCLUDING ALL)"
    );
  });

  afterEach(async () => {
    await testDB.query("DROP TABLE IF EXISTS pg_temp.questions");
  });

  describe("getAllUserQuestions function", () => {
    it("should exist", async () => {
      expect(Question.getAllUserQuestions()).toBeDefined();
    });

    it("should return false if no questions for the specified user exist", async () => {
      const questions = await Question.getAllUserQuestions(userid);

      expect(questions).toBe(false);
    });

    it("should return an array of all the questions the specified user has", async () => {
      const createdQuestion1 = await Question.create({
        question: "question1",
        answer: "answer1",
        user_id: userid,
      });
      const createdQuestion2 = await Question.create({
        question: "question2",
        answer: "answer2",
        user_id: userid,
      });
      const createdQuestion3 = await Question.create({
        question: "question3",
        answer: "answer3",
        user_id: userid,
      });

      const expectedResult = [
        createdQuestion1,
        createdQuestion2,
        createdQuestion3,
      ];

      const result = await Question.getAllUserQuestions(userid);
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("getUserQuestionById function", () => {
    it("should exist", async () => {
      expect(Question.getUserQuestionById()).toBeDefined();
    });

    it("should return false if no question with the specified id exists", async () => {
      const question = await Question.getUserQuestionById(1);

      expect(question).toBe(false);
    });

    it("should return the correct question with the specified id", async () => {
      const newQuestion = await Question.create({
        question_id: 1,
        question: "question",
        answer: "answer",
        user_id: userid,
      });

      const question = await Question.getUserQuestionById(1);
      expect(question).toStrictEqual(newQuestion);
    });
  });

  describe("create function", () => {
    it("should exist", async () => {
      expect(
        Question.create({
          question: "question",
          answer: "answer",
          user_id: userid,
        })
      ).toBeDefined();
    });

    it("should return the question that was created", async () => {
      const expected = new Question({
        question_id: 1,
        question: "question",
        answer: "answer",
        user_id: userid,
      });

      const createdQuestion = await Question.create({
        question: "question",
        answer: "answer",
        user_id: userid,
      });

      expect(createdQuestion).toStrictEqual(expected);
    });
  });

  describe("destroy function", () => {
    it("should exist", async () => {
      const newQuestion = await Question.create({
        question: "question",
        answer: "answer",
        user_id: userid,
      });

      expect(newQuestion.destroy()).toBeDefined();
    });

    it("should return the deleted question", async () => {
      const newQuestion = await Question.create({
        question: "question",
        answer: "answer",
        user_id: userid,
      });

      const deletedQuestion = await newQuestion.destroy();

      expect(deletedQuestion).toStrictEqual(newQuestion);
    });
  });
});
