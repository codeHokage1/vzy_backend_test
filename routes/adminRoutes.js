const router = require("express").Router();
const {isLoggedin, isAdmin } = require("../middlewares/auth");
const adminControllers = require("../controllers/adminController");

router
	.use(isLoggedin, isAdmin)
	.get("/users", adminControllers.getAllUsers)
	.get("/users/:id", adminControllers.getUserById)
	.put("/users/:id", adminControllers.updateUser)
   .delete("/users/:id", adminControllers.deleteUser);

module.exports = router