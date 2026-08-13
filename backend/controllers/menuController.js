const Menu = require('../models/Menu')

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find({})
        res.status(200).json(menuItems)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch menu items' })
    }
}

module.exports = {getMenuItems}