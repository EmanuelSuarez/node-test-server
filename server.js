require('dotenv').config();
const express = require('express')

const app = express()

require('./database')

app.get('/', (req, res) =>{
    res.send('Hello World!!')
})

app.listen(8080)
console.log('Server listening on port 8080');