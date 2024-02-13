const router = require("express").Router();

router
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