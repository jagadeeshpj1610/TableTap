const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true },
    items: {
        type: [
            {
                menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true }
            }
        ],
        validate: {
            validator: (arr) => arr.length > 0,
            message: 'Order must contain at least one item'
        }
    },
    status: { type: String, enum: ['pending', 'preparing', 'ready', 'served'], default: 'pending' },
    specialInstructios : {type : String},
    totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);