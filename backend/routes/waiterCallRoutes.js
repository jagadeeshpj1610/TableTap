const express = require('express')

const router = express.Router();

const {createWaiterCall, getAllWaiterCalls, resolveWaiterCall} = require('../controllers/waiterCallController')

router.post('/call', createWaiterCall);
router.get('/', getAllWaiterCalls)
router.patch('/:id/resolve', resolveWaiterCall)

module.exports = router;