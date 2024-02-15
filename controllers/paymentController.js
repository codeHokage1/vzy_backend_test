const User = require("../models/User");
const stripe = require("stripe")(
	"sk_test_51OjhvIGU7lzTBwYHYl12Lx0DzvpXYhIQUHVDJgLl4PxyUr63rBvpXUGNvzb7WKVrRyNipzoxXaG70RwevoDR77DV00KowN8uB7"
);

exports.subscribeUser = async (req, res) => {
	const event = req.body;

	// Verify the event from Stripe
	try {
		const stripeEvent = stripe.webhooks.constructEvent(
			req.rawBody, // Raw request body
			req.headers["stripe-signature"], // Stripe signature from header
			"whsec_bbc3177a21381cb2bf46a31244de7e96b34a209d3414c07f853cd46b243d3ac2" // Your webhook secret
		);

		// Handle successful payment events
		if (stripeEvent.type === "payment_intent.succeeded") {
			const paymentIntent = stripeEvent.data.object;
			const userEmail = paymentIntent.charges.data[0].billing_details.email;

			// Update user status to "paid" in the database
			// await User.findOneAndUpdate({ email: userEmail }, { status: "paid" });

			console.log(`User with email ${userEmail} has been updated to paid.`);
		}

		res.sendStatus(200); // Respond to Stripe with 200 OK
	} catch (error) {
		console.error("Error handling webhook event:", error);
		res.sendStatus(400); // Respond with 400 Bad Request in case of an error
	}
};

exports.tryWebHooks = async (request, response) => {
	// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
	// Replace this endpoint secret with your endpoint's unique secret
	// If you are testing with the CLI, find the secret by running 'stripe listen'
	// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
	// at https://dashboard.stripe.com/webhooks
	const endpointSecret = "whsec_bbc3177a21381cb2bf46a31244de7e96b34a209d3414c07f853cd46b243d3ac2";
	// const express = require("express");
	// const app = express();

	// app.post("/webhook", express.raw({ type: "application/json" }), (request, response) => {

	// });

	let event = request.body;
	// Only verify the event if you have an endpoint secret defined.
	// Otherwise use the basic event deserialized with JSON.parse
	if (endpointSecret) {
		// Get the signature sent by Stripe
		const signature = request.headers["stripe-signature"];
		try {
			event = stripe.webhooks.constructEvent(request.body, signature, endpointSecret);
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

exports.webhookFunc = async (request, response) => {
	const event = request.body;
	// console.log(event);

	// Handle the event
	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntent = event.data.object;
			console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
			// Then define and call a method to handle the successful payment intent.
			// handlePaymentIntentSucceeded(paymentIntent);
			// const webhookUser = await User.create({
			// 	first_name: "Test 1",
			// 	last_name: "Last name",
			// 	email: "hello@email.com",
			// 	password: "test1234"
			// });
			// console.log(webhookUser);
			break;
		case "payment_method.attached":
			const paymentMethod = event.data.object;
			console.log(`PaymentMethod ${paymentMethod.id} was attached to a Customer!`);
			// Then define and call a method to handle the successful attachment of a PaymentMethod.
			// handlePaymentMethodAttached(paymentMethod);
			break;
		// ... handle other event types
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	// Return a response to acknowledge receipt of the event
	response.json({ received: true });
};



exports.webhookFunc2 = (request, response) => {
   const endpointSecret = '';
	let event = request.body;
	// Only verify the event if you have an endpoint secret defined.
	// Otherwise use the basic event deserialized with JSON.parse
	if (endpointSecret) {
		// Get the signature sent by Stripe
		const signature = request.headers["stripe-signature"];
		try {
			event = stripe.webhooks.constructEvent(request.body, signature, endpointSecret);
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
