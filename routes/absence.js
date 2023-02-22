const express = require('express')
const router = express.Router()
const prisma = require('../index')

const kinds = {
    1: '欠席',
    2: '就活欠席',
    3: '遅刻',
    4: '早退'
}

router.get('/', async (req, res) => {
    const student = req.session.student
    const data = await prisma.absence.findMany({
        where: {
            student_id: student.id
        },
        include: {
            student: true
        }
    })
    const absence = data.map((absence) => {
        return {
            id: absence.id,
            kind: kinds[absence.kind],
            reason: absence.reason,
            start_date: absence.start_date,
            end_date: absence.end_date,
            created_at: absence.created_at,
            student_code: absence.student.code,
            student_name: absence.student.name
        }
    })
    res.json(absence)
})

router.post('/add', async (req, res) => {
    const student = req.session.student
    const {kind, reason, start_date, end_date} = req.body
    await prisma.absence.create({
        data: {
            student_id: student.id,
            kind: kind,
            reason: reason,
            start_date: new Date(start_date),
            end_date: new  Date(end_date),
        }
    }).then(() => {
        res.json({status: 0})
    }).catch(() => {
        res.json({status: 1})
    })
})

module.exports = router