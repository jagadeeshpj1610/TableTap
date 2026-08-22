const express = require('express')

const router = express.Router();

const {getMenuItems, createMenuItem} = require('../controllers/menuController')

router.get('/', getMenuItems )
router.post('/', createMenuItem)

module.exports = router