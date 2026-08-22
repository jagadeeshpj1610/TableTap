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
        const { name, price, category, description, isAvailable } = req.body;
        const newItem = await Menu.create({ name, price, category, description, isAvailable })
        res.status(201).json(newItem)
    } catch (error) {
        res.status(500).json({ message: "failed to create menu item" })
    }
}

const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category, description, isAvailable } = req.body;
        const updatedOne = await Menu.findByIdAndUpdate(id, { name, price, category, description, isAvailable }, { returnDocument: 'after' })
        console.log("update succesful");
        res.status(200).json(updatedOne)
    } catch (error) {
        res.status(500).json({ message: "failed to update the menu item" })
    }
}

const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Menu.findByIdAndDelete(id)
        console.log("deleted succesfully");

        if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });
        
        res.status(200).json({ message: "Menu item deleted Sucessfully" })
    } catch (error) {
        res.status(500).json({ message: "failed to delete the menu item" })
    }
}

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem }