const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },        
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash", "card", "UPI"], required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);