const Menu = require('../models/Menu')

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find({})
        res.status(200).json(menuItems)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch menu items' })
    }
}

const createMenuItem = async (req, res) => {
    try {
        const {name, price, category, description, isAvailable } = req.body;
        const newItem = await Menu.create({name, price, category, description, isAvailable})
        res.status(201).json(newItem)
    } catch (error) {
        res.status(500).json({message : "failed to create menu item"})
    }
}

module.exports = {getMenuItems, createMenuItem}