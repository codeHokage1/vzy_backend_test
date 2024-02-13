const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, "Please enter a first name"]
	},
	last_name: {
		type: String,
		required: [true, "Please enter a last name"]
	},
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimum password length is 6 characters"]
	},
	subscription: {
		type: String,
		enum: ["basic", "paid"],
		default: "basic"
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user"
	}
});

// Hash password before saving to database
userSchema.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}

	try {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
		next();
	} catch (error) {
		return next(error);
	}
});

module.exports = mongoose.model("User", userSchema);
