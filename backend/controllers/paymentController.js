const Payment = require("../models/Payment");


const createPayment = async (req, res) => {
    try {
        const { orderId, amount, paymentMethod } = req.body;
        const payment = await Payment.create({ orderId, amount, paymentMethod });
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const payment = await Payment.findByIdAndUpdate(id, { status }, { returnDocument: "after" });
        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createPayment, updatePaymentStatus, getAllPayments };