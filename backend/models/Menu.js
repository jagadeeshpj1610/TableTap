const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    description: { type: String },
    isVeg : {type : Boolean , required : true},
    isAvailable: { type: Boolean, default : true },
    imageUrl : {type : String}
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema)