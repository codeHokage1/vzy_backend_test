const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/api/v1", (req, res) => {
	res.send("Hello World!");
});

app.get("*", (req, res) => {
   res.status(404).send("Page not found");
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
