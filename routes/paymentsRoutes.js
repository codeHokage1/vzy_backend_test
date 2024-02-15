const express = require("express");
const router = require("express").Router();
const { isLoggedin } = require("../middlewares/auth");
const paymentController = require("../controllers/paymentController");


router
	.post("/webhook", express.raw({type: 'application/json'}), paymentController.webhookFunc2);

module.exports = router;
