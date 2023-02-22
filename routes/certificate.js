const express = require('express')
const router = express.Router()
const prisma = require('../index')

router.get('/', (req, res) => {
    res.send('getしました')
})

router.post('/apply', (req, res) => {
    res.send('postしました')
})

module.exports = router