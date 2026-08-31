
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

const getAllWaiterCalls = async (req, res) => {
    try {
        const allCalls = await WaiterCallSchema.find({});
        console.log(allCalls);
        res.status(200).json(allCalls);
    } catch (error) {
        console.log("failed to fetch the waiter calls");
        res.status(500).json({message : "failed to get the waiter calls"});
    }
}

module.exports = {createWaiterCall, getAllWaiterCalls}