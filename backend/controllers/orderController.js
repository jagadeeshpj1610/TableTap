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

module.exports = {createOrder}