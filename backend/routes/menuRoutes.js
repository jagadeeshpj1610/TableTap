const express = require('express')

const router = express.Router();

const {getMenuItems, createMenuItem, updateMenuItem} = require('../controllers/menuController')

router.get('/', getMenuItems )
router.post('/', createMenuItem)
router.put(':/id', updateMenuItem)

module.exports = router