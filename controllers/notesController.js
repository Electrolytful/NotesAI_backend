// imports
const Note = require("../models/Note.js");


async function getAllNotes(req, res) {
  const userid = req.session.userid;

  const notes = await Note.getAllUserNotes(userid);

  if (notes) {
    res.status(200).json(notes);
  } else {
    res.status(200).json([]);
  }
}


async function getNoteById(req, res) {
  const id = req.params.id;

  const note = await Note.getUserNoteById(parseInt(id));

  if (note && note.user_id == req.session.userid) {
    res.status(200).json(note);
  } else {
    res.status(404).json({ error: "No note with that ID found!" });
  }
}


async function createNote(req, res) {
  const userid = req.session.userid;
  const { title, content, summary } = req.body;

  const newNote = {
    title: title,
    content: content,
    summary: summary,
    user_id: userid,
  };

  const createdNote = await Note.create(newNote);
  res.status(201).json(createdNote);
}


async function destroyNote(req, res) {
  const id = req.params.id;

  const note = await Note.getUserNoteById(parseInt(id));

  if (note && note.user_id == req.session.userid) {
    const deletedNote = await note.destroy();
    res.status(200).json(deletedNote);
  } else {
    res.status(404).json({ error: "No note with that ID found!" });
  }
}


async function updateNote(req, res) {
  const id = req.params.id;

  const note = await Note.getUserNoteById(parseInt(id));

  if(note && note.user_id == req.session.userid) {
    const updatedNote = await note.update(req.body);
    res.status(200).json(updatedNote);
  } else {
    res.status(404).json({error: "No note with that ID found!"});
  }
}


module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  destroyNote,
  updateNote,
};
