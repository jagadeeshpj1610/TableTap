const express = require("express");

const router = express.Router();

const { verifyToken, requireRole } = require('../middleware/verifyToken')
const { createPayment, updatePaymentStatus, getAllPayments } = require("../controllers/paymentController");

router.post("/", createPayment);
router.get("/", verifyToken, requireRole('admin'), getAllPayments);
router.patch("/:id/status", verifyToken, requireRole('admin'), updatePaymentStatus);

module.exports = router;