const express = require('express')

const router = express.Router();

const { verifyToken, requireRole } = require('../middleware/verifyToken')
const {createOrder, getAllOrders, getOrderById, updateOrderStatus, getOrderBill} = require('../controllers/orderController')

router.get('/', verifyToken, requireRole('admin', 'kitchen', 'waiter'), getAllOrders)
router.post('/', createOrder)
router.get('/:id', getOrderById)
router.patch('/:id/status', verifyToken, requireRole('kitchen', 'admin'), updateOrderStatus)
router.get('/:id/bill', getOrderBill)

module.exports = router