const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const api = express()

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const patientsRouter = require('./routes/patients')

api.use(logger('dev'))
api.use(express.json())
api.use(express.urlencoded({ extended: false }))
api.use(cookieParser())

const version = process.env.API_VERSION
const prefix = '/api/v'.concat(version.toString())

api.use(prefix.concat('/'), indexRouter)
api.use(prefix.concat('/users'), usersRouter)
api.use(prefix.concat('/patients'), patientsRouter.patientsRoutes());

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
