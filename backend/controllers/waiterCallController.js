
const WaiterCallSchema = require('../models/WaiterCall')

const createWaiterCall = async (req, res) => {
    try {
        const {tableNumber} = req.body;
        const createdCall = await WaiterCallSchema.create({tableNumber})
        res.status(201).json(createdCall)
    } catch (error) {
        res.status(500).json({message:'failed to created the waiter call'})
    }
}

module.exports = {createWaiterCall}