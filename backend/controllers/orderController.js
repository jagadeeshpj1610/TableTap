const Order = require('../models/Order')



const createOrder = async (req, res) => {
    try {
        const { tableNumber, items } = req.body;
        const totalAmount = items.reduce((total, item) => total + (item.quantity * item.price), 0);
        const newOrder = await Order.create({
            tableNumber,
            items,
            totalAmount,
        })
        res.status(201).json(newOrder)

    } catch (error) {
        res.status(500).json({ message: "failed to create the order" })

    }
}

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({}).sort({ createdAt: -1 })
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(500).json({ message: "failed to fetch the orders" })
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const specificOrder = await Order.findById(id);
        if (!specificOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        console.log(specificOrder);
        res.status(200).json(specificOrder)
    } catch (error) {
        console.log("damn");
        res.status(500).json({ message: "failed to get the speific order" })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { returnDocument: 'after', runValidators: true })
        if (!updatedOrder) {
            return res.status(404).json({ message: "order not found" })
        }
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json({ message: 'failed to update the order status' })
    }
}

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus }