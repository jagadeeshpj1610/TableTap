const express = require('express');

const router = express.Router();

const {fetchAllTables} = require('../controllers/tableController')

router.get('/', fetchAllTables)

module.exports = router;