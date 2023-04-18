const { Router } = require("express");
const notesController = require("../controllers/notesController.js");

const router = Router();

router.get("/", notesController.getAllNotes);
router.post("/new", notesController.createNote);
router.get("/:id", notesController.getNoteById);
router.delete("/:id", notesController.destroyNote);
// router.patch("/:id", notesController.updateNote);

module.exports = router;
