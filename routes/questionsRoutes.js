// imports
const { Router } = require("express");
const auth = require("../middleware/auth.js");
const {
    getAllQuestions,
    createQuestion,
    getQuestionById,
    destroyQuestion,
} = require("../controllers/questionsController.js");


// initialising router
const router = Router();


// questions routes
router.get("/", auth, getAllQuestions);
router.post("/new", auth, createQuestion);
router.get("/:id", auth, getQuestionById);
router.delete("/:id", auth, destroyQuestion);


module.exports = router;
