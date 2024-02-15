const express = require("express");
const router = require("express").Router();
const {checkNewPaymentDetails} = require("../middlewares/validateRequest");
const paymentController = require("../controllers/paymentController");
const bodyParser = require("body-parser");

router
	.post("/webhook", express.raw({type: 'application/json'}), paymentController.webhookFunc2)
	// .post("/pay", express.json(), checkNewPaymentDetails, paymentController.pay);
	.post("/pay", express.json(), checkNewPaymentDetails, paymentController.pay)
	.get("/success", paymentController.success);

	// .post("/webhook", bodyParser.raw({type: "*/*"}), paymentController.webhookFunc2);


module.exports = router;
