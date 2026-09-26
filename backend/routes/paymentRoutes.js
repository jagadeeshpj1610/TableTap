const express = require("express");

const router = express.Router();

const { createPayment, updatePaymentStatus, getAllPayments } = require("../controllers/paymentController");

router.post("/", createPayment);
router.get("/", getAllPayments);
router.patch("/:id/status", updatePaymentStatus);

module.exports = router;