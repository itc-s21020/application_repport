const express = require('express')
const router = express.Router()
const prisma = require('../index')

router.get('/', (req, res) => {
    res.send('getしました')
})

router.post('/apply', async (req, res) => {
    const {
        certificate_of_enrollment,
        transcript,
        attendance_certificate,
        certificate_of_expected_graduation,
        graduation_certificate,
        health_certificate
    } = req.body
    const student = req.session.student
    await prisma.cerfiticateApplication.create({
        data: {
            student_id: student.id,
            certificate_of_enrollment: certificate_of_enrollment,
            transcript: transcript,
            attendance_certificate: attendance_certificate,
            certificate_of_expected_graduation: certificate_of_expected_graduation,
            graduation_certificate: graduation_certificate,
            health_certificate: health_certificate
        }
    }).then((result) => {
        const total_copy =
            result.certificate_of_enrollment+
            result.transcript+
            result.attendance_certificate+
            result.certificate_of_expected_graduation+
            result.graduation_certificate+
            result.health_certificate
        const total_amount =
            result.certificate_of_enrollment * 200 +
            result.transcript * 200 +
            result.attendance_certificate * 200 +
            result.certificate_of_expected_graduation * 200 +
            result.graduation_certificate * 200 +
            result.health_certificate * 100
        res.json({
            status: 0,
            receipt: req.body,
            scheduled_date: result.scheduled_date,
            total_copy: total_copy,
            total_amount: total_amount
        })
    }).catch(() => {
        res.json({status: 1})
    })
})

module.exports = router