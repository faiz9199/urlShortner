const mongoose = require ('mongoose')
require('dotenv').config()

// const mongoURL = 'mongodb://localhost:27017/urlShortner'
const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', ()=> {
    console.log('MogoDB connected to server')
})

db.on('error', (err)=> {
    console.log('MogoDB connected to server', err)
})

db.on('disconnected', ()=> {
    console.log('MogoDB disconnected')
})

module.exports = db