const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
	try {
		const user = req.user;
		const foundUser = await User.findOne({ _id: user._id });

		if (!foundUser) {
			return res
				.status(404)
				.json({ message: `User with email "${user.email}" not found.`, data: null });
		}

		res.status(200).json({
			message: "Your account details:",
			data: foundUser
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateUserDetails = async (req, res) => {
	try {
		const user = req.user;
		const foundUser = await User.findOne({ _id: user._id });
		// console.log(Object.keys(req.body).length > 0 ? "yes" : "no")

		if (!foundUser) {
			return res
				.status(404)
				.json({ message: `User with email "${user.email}" not found.`, data: null });
		}

		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: "No details to update!" });
		}

		if (req.body.subscription) {
			return res.status(403).json({
				message:
					"You can't update your subscription details here! Make payment with the right endpoint."
			});
		}

		if (req.body.role && req.user.role !== "admin") {
			return res.status(403).json({
				message: "You are not allowed to update your role! Kindly reach out to the admin"
			});
		}

		const updatedUser = await User.findOneAndUpdate({ _id: user._id }, req.body, { new: true });

		res.status(200).json({
			message: "Your details have been updated:",
			data: updatedUser
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const user = req.user;
		const foundUser = await User.findOne({ _id: user._id });

		if (!foundUser) {
			return res
				.status(404)
				.json({ message: `User with email "${user.email}" not found.`, data: null });
		}

		const updatedUser = await User.findOneAndDelete({ _id: user._id });

		res.status(200).json({
			message: "Your account have been deleted!",
			data: null
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
