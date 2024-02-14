const express = require("express");
const app = express();
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/usersRoutes");
const paymentRouter = require("./routes/paymentsRoutes");
const connectDB = require("./configs/DBConfig");

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/api/v1", (req, res) => {
	res.send("Hello World!");
});

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/user", userRouter);

app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/payments", paymentRouter);

app.get("*", (req, res) => {
	res.status(404).send("Route not found!");
});

connectDB();

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
