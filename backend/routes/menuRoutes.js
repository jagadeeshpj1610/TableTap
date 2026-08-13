const express = require('express')

const router = express.Router();

const {getMenuItems} = require('../controllers/menuController')

router.get('/api/menu', getMenuItems )

module.exports = router