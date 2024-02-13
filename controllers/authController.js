const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
	try {
		const user = req.body;
		if (user.email !== "farhan@admin.com") {
			user.role = "user";
		}

		const newUser = await User.create(user);

		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: "30d"
		});
		res.status(201).json({ message: "User created successfully", data: newUser });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.loginUser = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
