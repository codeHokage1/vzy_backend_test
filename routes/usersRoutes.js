const router = require("express").Router();
const userController = require("../controllers/userController");
const {isLoggedin} = require("../middlewares/auth")


router
	.use(isLoggedin)
	.get("/", userController.getUserDetails)
	.patch("/", userController.updateUserDetails)
   .delete("/", userController.deleteUser);

module.exports = router