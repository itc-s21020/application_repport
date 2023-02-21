const express = require('express')
const router = express.Router()
const prisma = require('../index')


router.post('/register', async (req, res) => {
    const {student_code, student_name} = req.body
    await prisma.student.create({
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

router.post('/login', async (req, res) => {
    const {student_code} = req.body
    const student = await prisma.student.findFirst({
        where: {
            code: student_code
        }
    })
    if (student == null) {
        res.json({status: 0})
    }else {
        res.json({status: 1})
    }
})

module.exports = router