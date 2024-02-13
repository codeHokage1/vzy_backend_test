const router = require("express").Router();

router
	.post("/", (req, res) => {
		res.send("How far? Pay money");
	})

module.exports = router