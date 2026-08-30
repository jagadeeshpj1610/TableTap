const Table = require('../models/Table')


const fetchAllTables = async (req, res) => {
    try {
        const allTables = await Table.find({})
        console.log(allTables);
        
        res.status(200).json({allTables})
    } catch (error) {
        res.status(500).json({message : "failed to fetch the tables"})
    }
}

const createTheTable = async (req, res) => {
    try {
        const {tableNumber, qrCodeId} = req.body;
        const newOne = await Table.create({tableNumber, qrCodeId})
        res.status(201).json(newOne)
    } catch (error) {
        res.status(500).json({message : "failed to create the table"});
    }
}

module.exports = {fetchAllTables, createTheTable}