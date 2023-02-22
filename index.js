const express = require('express')
const app =express()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const session = require('express-session')

module.exports = prisma
const router = express.Router()
const userRouter = require('./routes/user')
const absenceRouter = require('./routes/absence')

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "qawsedrf",
    store: new (require('connect-pg-simple')(session))({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true
    })
}))


router.get('/', (req, res) =>{
    res.send('hello!!')
})

app.use(router)
app.use(userRouter)
app.use('/absences', (req, res, next) => {
    const student = req.session.student
    if (student === undefined) {
        res.send('ログインしていません')
    }else {
        next()
    }
}, absenceRouter)


app.listen(3000, () => console.log('サーバー起動しました'))