const express = require('express')
const app =express()
const router = express.Router()

router.get('/', (req, res) =>{
    res.send('hello!!')
})

app.use(router)

app.listen(3000, () => console.log('サーバー起動しました'))