const axios = require("axios");
require("dotenv").config();

const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Configure stripe with secret key

exports.webhookFunc = async (request, response) => {
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
	let event = request.body;
	if (endpointSecret) {
		// Get the signature sent by Stripe
		const signature = request.headers["stripe-signature"];
		try {
			event = stripe.webhooks.constructEvent(
				request.body.toString("utf-8"),
				signature,
				endpointSecret
			);
		} catch (err) {
			console.log(`⚠️  Webhook signature verification failed.`, err.message);
			return response.sendStatus(400);
		}
	}

	// Handle and verify the event
	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntent = event.data.object;
			console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

			const userEmail = paymentIntent.receipt_email;
			const foundUser = await User.findOne({ email: userEmail });
			foundUser.subscription = "paid";
			await foundUser.save();

			console.log("User subscription updated to paid!");
			break;
		case "payment_method.attached":
			const paymentMethod = event.data.object;
			console.log(`PaymentMethod was attached to a Customer!`);
			break;
		default:
			// Unexpected event type
			console.log(`Unhandled event type ${event.type}.`);
	}

	// Return a 200 response to acknowledge receipt of the event
	response.send();
};

exports.pay = async (req, res) => {
	try {
		const user = req.user;
		if (user.subscription === "paid") {
			return res.status(400).json({
				message: "You already have a paid subscription!",
				data: null
			});
		}

		const { amount, currency } = req.body;

		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: currency || "usd",
			receipt_email: user.email,
			metadata: { integration_check: "accept_a_payment" }
		});

		// Confirm the payment
		const confirmPayment = await stripe.paymentIntents.confirm(paymentIntent.id, {
			payment_method: "pm_card_visa",
			return_url: process.env.PAYMENT_SUCCESS_URL
		});

		res.json({
			message: "Payment created and successful!",
			data: {
				amount: confirmPayment.amount,
				payerEmail: confirmPayment.receipt_email,
				confirmationMethod: confirmPayment.confirmation_method,
				paymentMethod: confirmPayment.payment_method_types,
				status: confirmPayment.status
			}
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: error.message
		});
	}
};

exports.success = (req, res) => {
	res.status(200).json({
		message: "Payment successful",
		data: null
	});
};
