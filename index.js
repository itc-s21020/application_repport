const express = require('express')
const app =express()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = prisma
const router = express.Router()
const userRouter = require('./routes/user')

app.use(express.json())


router.get('/', (req, res) =>{
    res.send('hello!!')
})

app.use(router)
app.use(userRouter)

app.listen(3000, () => console.log('サーバー起動しました'))