// imports
const { Router } = require("express");
const auth = require("../middleware/auth.js");
const {
    getAllNotes,
    createNote,
    getNoteById,
    destroyNote,
    updateNote,
} = require("../controllers/notesController.js");


// initialising router
const router = Router();


// notes routes
router.get("/", auth, getAllNotes);
router.post("/new", auth, createNote);
router.get("/:id", auth, getNoteById);
router.delete("/:id", auth, destroyNote);
router.patch("/:id", updateNote);


module.exports = router;
