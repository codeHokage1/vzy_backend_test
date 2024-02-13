const router = require("express").Router();

router
	.get("/users/:id", (req, res) => {
		res.send("Yeah. Na him details be this");
	})
	.put("/users/:id", (req, res) => {
		res.send("Update the guy for here");
	})
   .delete("/users/:id", (req, res) => {
      res.send("Delete the guy for here");

   });

module.exports = router