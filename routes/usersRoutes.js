const { Router } = require("express");
const usersController = require("../controllers/usersController.js");

const router = Router();

router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);
router.get("/logout", usersController.logoutUser);
router.get("/:id", usersController.displayUser);
router.delete("/:id", usersController.destroyUser);

module.exports = router;
