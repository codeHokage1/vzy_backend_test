const express = require("express");
const router = require("express").Router();
const { checkNewPaymentDetails } = require("../middlewares/validateRequest");
const {isLoggedin} = require("../middlewares/auth");
const paymentController = require("../controllers/paymentController");

router
	.post("/webhook", express.raw({ type: "application/json" }), paymentController.webhookFunc)
	.post("/subscribe", express.json(), isLoggedin, checkNewPaymentDetails, paymentController.pay)
	.get("/success", paymentController.success);

module.exports = router;
