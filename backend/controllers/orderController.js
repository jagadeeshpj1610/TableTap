const Order = require('../models/Order')



const createOrder = async (req, res ) => {
    try {
        const {tableNumber, items} = req.body;
        const totalAmount = items.reduce((total, item) => total + (item.quantity * item.price), 0);
        const newOrder = await Order.create({
            tableNumber,
            items,
            totalAmount,
        })
        res.status(201).json(newOrder)
        
    } catch (error) {
        res.status(500).json({message : "failed to create the order"})
        
    }
}

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({}).sort({createdAt : -1})
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(500).json({message : "failed to fetch the orders"})
    }
}

module.exports = {createOrder, getAllOrders}