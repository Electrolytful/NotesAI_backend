require("dotenv").config();
const Note = require("../models/Note.js");
const db = require("../database/db_connect.js");
const { Pool } = require("pg");

describe("Note Model", () => {
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
      "CREATE TEMPORARY TABLE notes (LIKE notes INCLUDING ALL)"
    );
  });

  afterEach(async () => {
    await testDB.query("DROP TABLE IF EXISTS pg_temp.notes");
  });

  describe("getAllUserNotes function", () => {
    it("should exist", async () => {
      expect(Note.getAllUserNotes()).toBeDefined();
    });

    it("should return false if no notes for the specified user exist", async () => {
      const notes = await Note.getAllUserNotes(userid);

      expect(notes).toBe(false);
    });

    it("should return an array of all the notes the specified user has", async () => {
      const createdNote1 = await Note.create({
        title: "title1",
        content: "content1",
        summary: "summary1",
        user_id: userid,
      });
      const createdNote2 = await Note.create({
        title: "title2",
        content: "content2",
        summary: "summary2",
        user_id: userid,
      });
      const createdNote3 = await Note.create({
        title: "title3",
        content: "content3",
        summary: "summary3",
        user_id: userid,
      });

      const expectedResult = [createdNote1, createdNote2, createdNote3];

      const result = await Note.getAllUserNotes(userid);
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("getUserNoteById function", () => {
    it("should exist", async () => {
      expect(Note.getUserNoteById()).toBeDefined();
    });

    it("should return false if no note with the specified id exists", async () => {
      const note = await Note.getUserNoteById(1);

      expect(note).toBe(false);
    });

    it("should return the correct note with the specified id", async () => {
      const newNote = await Note.create({
        notes_id: 1,
        title: "title",
        content: "content",
        summary: "summary",
        user_id: userid,
      });

      const note = await Note.getUserNoteById(1);
      expect(note).toStrictEqual(newNote);
    });
  });

  describe("create function", () => {
    it("should exist", async () => {
      expect(
        Note.create({
          title: "title",
          content: "content",
          summary: "summary",
          user_id: userid,
        })
      ).toBeDefined();
    });

    it("should return the note that was created", async () => {
      const expected = new Note({
        notes_id: 1,
        title: "title",
        content: "content",
        summary: "summary",
        user_id: userid,
      });

      const createdNote = await Note.create({
        title: "title",
        content: "content",
        summary: "summary",
        user_id: userid,
      });

      expect(createdNote).toStrictEqual(expected);
    });
  });

  describe("destroy function", () => {
    it("should exist", async () => {
      const newNote = await Note.create({
        title: "title",
        content: "content",
        summary: "summary",
        user_id: userid,
      });

      expect(newNote.destroy()).toBeDefined();
    });

    it("should return the deleted note", async () => {
      const newNote = await Note.create({
        title: "title",
        content: "content",
        summary: "summary",
        user_id: userid,
      });

      const deletedNote = await newNote.destroy();

      expect(deletedNote).toStrictEqual(newNote);
    });
  });

  describe("update function", () => {
    it("should exist", async () => {
      const newNote = await Note.create({
        title: "title",
        content: "content",
        summary: "summary",
        user_id: userid,
      });

      expect(
        newNote.update({ title: "some title", content: "some content" })
      ).toBeDefined();
    });

    it("should return the correct updated note", async () => {
      const newNote = await Note.create({
        notes_id: 1,
        title: "title",
        content: "content",
        summary: "summary",
        user_id: userid,
      });

      const expectedNote = new Note({
        notes_id: 1,
        title: "updated title",
        content: "updated content",
        summary: "summary",
        user_id: userid,
      });

      const updatedNote = await newNote.update({
        title: "updated title",
        content: "updated content",
      });

      expect(updatedNote).toStrictEqual(expectedNote);
    });
  });
});
