require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')

app.use('/download', routes)

app.listen('3000', function () {
  console.log('Listem port 3000!')
})
