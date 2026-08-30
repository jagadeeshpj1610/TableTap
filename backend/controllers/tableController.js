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

module.exports = {fetchAllTables}