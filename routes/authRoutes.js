const router = require("express").Router();
const authController = require("../controllers/authController");
const { checkNewUserDetails, checkLoginDetails } = require("../middlewares/validateRequest");

router
	.post("/login", checkLoginDetails, authController.loginUser)
	.post("/register", checkNewUserDetails, authController.registerUser);

module.exports = router;
