const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/usersRoutes");
const paymentRouter = require("./routes/paymentsRoutes");
const connectDB = require("./configs/DBConfig");

const User = require("./models/User");

// app.use(express.json({ limit: "10kb" }));
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/api/v1", (req, res) => {
	res.send(`
		<h1>Vzy Assessment by Sodiq Farhan - User Management & Subscription API!</h1>
		<p>Kindly go through the <a href="https://documenter.getpostman.com/view/23438041/2sA2r6XQ87" target="_blank">full API Doc</a>.</p>
	`);
});

app.use("/api/v1/payment", paymentRouter);

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/user", userRouter);

app.use("/api/v1/admin", adminRouter);

app.get("*", (req, res) => {
	res.status(404).send(`
		<h3>Sorry! Route not found</h3>
		<p>Kindly check the URL and try again or go through the <a href="https://documenter.getpostman.com/view/23438041/2sA2r6XQ87" target="_blank">full API Doc</a>.</p>
	`);
});

connectDB();

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
