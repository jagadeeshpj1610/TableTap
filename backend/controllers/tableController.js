const Table = require('../models/Table')


const fetchAllTables = async (req, res) => {
    try {
        const allTables = await Table.find({})
        console.log(allTables);

        res.status(200).json(allTables)
    } catch (error) {
        res.status(500).json({ message: "failed to fetch the tables" })
    }
}

const createTheTable = async (req, res) => {
    try {
        const { tableNumber, qrCodeId } = req.body;
        const existing = await Table.findOne({ tableNumber });
        if (existing) {
            return res.status(400).json({ message: "Table number already exists" });
        }
        const newOne = await Table.create({ tableNumber, qrCodeId })
        res.status(201).json({newOne,  message : "table is created succsessfully"})
    } catch (error) {
        res.status(500).json({ message: "failed to create the table" });
    }
}

module.exports = { fetchAllTables, createTheTable }