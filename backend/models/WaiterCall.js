const mongoose = require('mongoose')

const WaiterCallSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending' }
},
    { timestamps: true });

module.exports = mongoose.model('waiterCall', WaiterCallSchema)