const express = require('express')

const router = express.Router();

const { verifyToken, requireRole } = require('../middleware/verifyToken')
const {getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem} = require('../controllers/menuController')

router.get('/', getMenuItems )
router.post('/', verifyToken, requireRole('admin'), createMenuItem)
router.put('/:id', verifyToken, requireRole('admin'), updateMenuItem)
router.delete('/:id', verifyToken, requireRole('admin'), deleteMenuItem)

module.exports = router