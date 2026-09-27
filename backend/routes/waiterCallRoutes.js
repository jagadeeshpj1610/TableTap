const express = require('express')

const router = express.Router();

const { verifyToken, requireRole } = require('../middleware/verifyToken')
const {createWaiterCall, getAllWaiterCalls, resolveWaiterCall} = require('../controllers/waiterCallController')

router.post('/call', createWaiterCall);
router.get('/', verifyToken, requireRole('admin', 'waiter'), getAllWaiterCalls)
router.patch('/:id/resolve', verifyToken, requireRole('waiter', 'admin'), resolveWaiterCall)

module.exports = router;