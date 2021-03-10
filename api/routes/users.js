function usersRoutes () {
  const express = require('express')
  const router = express.Router()
  const usersController = require('../controllers/users')
  const authController = require('../controllers/auth')

  router.get('/ping', function (req, res) {
    res.send('pong')
  })
  router.get('/', usersController.getAll)
  router.post('/', usersController.insert)
  router.patch('/:id', usersController.update)
  router.delete('/:id', usersController.remove)
  router.post('/login', authController.login)
  router.post('/logout', authController.logout)

  return router
}

module.exports.usersRoutes = usersRoutes
