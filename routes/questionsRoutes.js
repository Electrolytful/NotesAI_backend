const { Router } = require("express");
const questionsController = require("../controllers/questionsController.js");
const auth = require("../middleware/auth.js");

const router = Router();

router.get("/", auth, questionsController.getAllQuestions);
router.post("/new", auth, questionsController.createQuestion);
router.get("/:id", auth, questionsController.getQuestionById);
router.delete("/:id", auth, questionsController.destroyQuestion);

module.exports = router;
