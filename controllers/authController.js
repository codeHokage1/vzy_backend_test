const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
	try {
		const user = req.body;
		if (user.role && !user.email.endsWith("@vzy.com")) {
			user.role = "user";
		}

		const newUser = await User.create(user);

		const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: 60
		});

		res.status(201).json({
			message: "User created successfully!",
			data: {
				_id: newUser._id,
				email: newUser.email,
				role: newUser.role,
				subscription: newUser.subscription
			},
			token
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const foundUser = await User.findOne({ email });

		if (!foundUser) {
			return res.status(404).json({
				message: `User with email '${email}' not found in our database. Kindly check again or register`,
				data: null
			});
		}

		const isMatch = await bcrypt.compare(password, foundUser.password);
		if (!isMatch) {
			return res.status(401).json({
				message: "Incorrect Password! Kindly check and try again.",
				data: null
			});
		}

		const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, {
			expiresIn: 3600
		});

		return res.status(201).json({
			message: "User Signed in!",
			data: {
				_id: foundUser._id,
				email: foundUser.email,
				role: foundUser.role,
				subscription: foundUser.subscription
			},
			token
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
