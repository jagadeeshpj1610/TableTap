const express = require('express')

const router = express.Router();

const {createWaiterCall, getAllWaiterCalls} = require('../controllers/waiterCallController')

router.post('/call', createWaiterCall);
router.get('/', getAllWaiterCalls)

module.exports = router;