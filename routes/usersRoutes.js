const router = require("express").Router();
const {isLoggedin} = require("../middlewares/auth")

router
	.use(isLoggedin)
	.get("/", (req, res) => {
		res.send("Yeah. Na your details be this");
	})
	.put("/", (req, res) => {
		res.send("Update user for here");
	})
   .delete("/", (req, res) => {
      res.send("Delete user for here");

   });

module.exports = router