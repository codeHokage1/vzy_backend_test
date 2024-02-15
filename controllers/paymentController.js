const axios = require("axios");
require("dotenv").config();

const User = require("../models/User");
const stripe = require("stripe")(
	process.env.STRIPE_SECRET_KEY
);

exports.webhookFunc2 = (request, response) => {
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

	// Handle the event
	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntent = event.data.object;
			console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
			// Then define and call a method to handle the successful payment intent.
			// handlePaymentIntentSucceeded(paymentIntent);
			break;
		case "payment_method.attached":
			const paymentMethod = event.data.object;
			// Then define and call a method to handle the successful attachment of a PaymentMethod.
			// handlePaymentMethodAttached(paymentMethod);
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
		const { amount, currency, email } = req.body;

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: currency || "usd",
			receipt_email: email,
			metadata: { integration_check: "accept_a_payment" }
		});

		const confirmPayment = await stripe.paymentIntents.confirm(paymentIntent.id, {
			payment_method: "pm_card_visa",
			return_url: process.env.PAYMENT_SUCCESS_URL
		});

		res.json({
			message: "Payment created and successful!",
			data: confirmPayment
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
}
