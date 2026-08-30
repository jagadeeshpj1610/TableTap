const express = require('express')

const router = express.Router();

router.post('/call', createWaiterCall);

module.exports = router;