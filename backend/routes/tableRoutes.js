const express = require('express');

const router = express.Router();

const { verifyToken, requireRole } = require('../middleware/verifyToken')
const {fetchAllTables, createTheTable} = require('../controllers/tableController')

router.get('/', fetchAllTables)
router.post('/create/', verifyToken, requireRole('admin'), createTheTable)

module.exports = router;