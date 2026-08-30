const mongoose = require('mongoose')

const TableSchema = new mongoose.Schema({
    tableNumber : {type : Number , required : true, unique : true},
    qrCodeId : {type : String, required : true},
    status : {type : String, enum:['available', 'occupied'], default : 'available'}
})

module.exports = mongoose.model('Table', TableSchema);