const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isLoggedin = async (req, res, next) => {
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.split(" ")[0] === "Bearer" &&
			req.headers.authorization.split(" ")[1]
		) {
			const token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const foundUser = await User.findOne({ _id: decoded.userId });
			req.user = {
				_id: foundUser._id,
				email: foundUser.email,
				role: foundUser.role,
				subscription: foundUser.subscription
			};
			next();
		} else {
			return res.status(401).json({ message: "Kindly log in first, then try again.", data: null });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
