const path = require('path')

const express = require('express')
const morgan = require('morgan')

const toursRouter = require('./routes/tours')
const usersRouter = require('./routes/users')

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// TODO: use try catch blocks when mongo
// TODO: use joi or express-validator to do this task

app.use('/api/v1/tours', toursRouter)
app.use('/api/v1/users', usersRouter)

app.use((err, req, res, next) => {
  console.error('💥💥💥💥💥💥', err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app
