const joi = require("joi");

exports.checkNewUserDetails = async (req, res, next) => {
	const schema = joi.object({
		first_name: joi.string().required(),
		last_name: joi.string().required(),
		email: joi.string().email().required(),
		password: joi
			.string()
			.min(6)
			.regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)
			.message("Pasword must contain at least one alphabet and at least one number.")
			.required()
	});

	try {
		const value = await schema.validateAsync(req.body);
	} catch (error) {
		return res.status(422).json({ message: error.details[0].message, data: null });
	}
	next();
};

exports.checkLoginDetails = async (req, res, next) => {
	const schema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().required()
	});

	try {
		const value = await schema.validateAsync(req.body);
	} catch (error) {
		return res.status(422).json({ message: error.details[0].message, data: null });
	}
	next();
};
