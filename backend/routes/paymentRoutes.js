const express = require("express");

const router = express.Router();

const { createPayment, updatePaymentStatus } = require("../controllers/paymentController");

router.post("/", createPayment);
router.patch("/:id/status", updatePaymentStatus);

module.exports = router;