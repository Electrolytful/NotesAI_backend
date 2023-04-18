const { Router } = require("express");
const usersController = require("../controllers/usersController.js");
const auth = require("../middleware/auth.js");

const router = Router();

router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);
router.get("/logout", auth, usersController.logoutUser);
router.get("/current", auth, usersController.displayCurrentUser);
router.delete("/delete", auth, usersController.destroyUser);
router.get("/:id", usersController.displayUser);

module.exports = router;
