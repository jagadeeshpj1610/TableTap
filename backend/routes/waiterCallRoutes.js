const express = require('express')

const router = express.Router();

const {createWaiterCall} = require('../controllers/waiterCallController')

router.post('/call', createWaiterCall);

module.exports = router;