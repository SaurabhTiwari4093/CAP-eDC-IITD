require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// const fs=require('fs')
// const https=require('https')

// https server
// const key=fs.readFileSync('private.key')
// const cert=fs.readFileSync('certificate.crt')

// const cred={
//     key,
//     cert
// }

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors())
app.use(express.json())

// app.get('/',(req,res)=>{
//     res.send('Hello world')
// })
app.use(express.static("client"));

// ............... to verify zeroSSL ................
// app.get('/.well-known/pki-validation/5BBD5156C03560710CC81935A12BD01B.txt',(req,res)=>{
//     res.sendFile('/home/ubuntu/CAP/5BBD5156C03560710CC81935A12BD01B.txt')
// })

const registrationRouter = require('./routes/registration')
app.use('/api/registration', registrationRouter)

const messageRouter = require('./routes/message')
app.use('/api/message', messageRouter)

const port = process.env.PORT || 3000

// const httpsServer=https.createServer(cred,app)

// httpsServer.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})