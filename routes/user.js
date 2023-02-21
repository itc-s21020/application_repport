const express = require('express')
const router = express.Router()
const prisma = require('../index')


router.post('/register', (req, res) => {
    const {student_code, student_name} = req.body
    prisma.student.create({
        data: {
            code: student_code,
            name: student_name
        }
    }).then(() => {
        res.json({status: 0})
    }).catch(() => {
        res.json({status: 1})
    })
})

module.exports = router