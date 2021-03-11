const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const api = express()
require('dotenv').config()

api.use(logger('dev'))
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(cookieParser())

const version = process.env.API_VERSION
const prefix = '/api/v'.concat(version.toString())
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const patientsRouter = require('./routes/patients')
const appointmentsRouter = require('./routes/appointment')

api.use(prefix.concat('/'), indexRouter)
api.use(prefix.concat('/users'), usersRouter.usersRoutes())
api.use(prefix.concat('/patients'), patientsRouter.patientsRoutes())
api.use(prefix.concat('/appointments'), appointmentsRouter.appointmentsRoutes())

// catch 404 and forward to error handler
api.use(function (req, res, next) {
  next(createError(404))
})

// error handler
api.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = api
