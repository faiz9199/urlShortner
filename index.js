const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const app = express()
const PORT = 4000
app.use(bodyParser.json())


app.get('/', (req, res)=> {
    res.send('Hello from faiz server')
})

const urlRoutes = require('./routes/urlRoutes')

app.use('/', urlRoutes)

app.listen(PORT, ()=> {
    console.log(`Server listening on port:${PORT}`)
})
