const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find({});
		res.status(200).json({ message: "All users", data: allUsers });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getUserById = async (req, res) => {
	try {
		const foundUser = await User.findOne({ _id: req.params.id });
		if (!foundUser) {
			return res
				.status(404)
				.json({ message: `User with id ${req.params.id} not found`, data: null });
		}
		res.status(200).json({ message: "User found", data: foundUser });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const foundUser = await User.findOne({ _id: req.params.id });
		if (!foundUser) {
			return res
				.status(404)
				.json({ message: `User with id ${req.params.id} not found`, data: null });
		}

		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: "No details to update!" });
		}

		const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
			new: true
		});
		res.status(200).json({ message: "User updated", data: updatedUser });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const foundUser = await User.findOne({ _id: req.params.id });
		if (!foundUser) {
			return res
				.status(404)
				.json({ message: `User with id ${req.params.id} not found`, data: null });
		}

		await User.findOneAndDelete({ _id: req.params.id });
		res.status(200).json({ message: "User deleted", data: null });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
