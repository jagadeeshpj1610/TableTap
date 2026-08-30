const express = require('express')

const router = express.Router();

const {createOrder, getAllOrders, getOrderById, updateOrderStatus} = require('../controllers/orderController')

router.get('/', getAllOrders)
router.post('/', createOrder)
router.get('/:id', getOrderById)
router.patch('/:id/status',updateOrderStatus)

module.exports = router