const express = require('express');

const router = express.Router();

const {fetchAllTables, createTheTable} = require('../controllers/tableController')

router.get('/', fetchAllTables)
router.post('/create/', createTheTable)

module.exports = router;