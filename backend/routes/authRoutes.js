const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const ROLE_PASSWORDS = {
    admin: process.env.ADMIN_PASSWORD,
    kitchen: process.env.KITCHEN_PASSWORD,
    waiter: process.env.WAITER_PASSWORD,
}

router.post('/login', (req, res) => {
    const { role, password } = req.body

    if (!role || !password) {
        return res.status(400).json({ message: "Role and password are required" })
    }

    const correctPassword = ROLE_PASSWORDS[role]

    if (!correctPassword) {
        return res.status(400).json({ message: "Invalid role" })
    }

    if (password !== correctPassword) {
        return res.status(401).json({ message: "Incorrect password" })
    }

    const token = jwt.sign(
        { role },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
    )

    res.status(200).json({ token, role })
})

module.exports = router