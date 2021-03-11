function usersRoutes () {
  const express = require('express')
  const router = express.Router()
  const usersController = require('../controllers/users')
  const authController = require('../controllers/auth')
  const JWT = require('../middleware/JWT')

  router.get('/ping', function (req, res) {
    res.send('pong')
  })
  router.get('/', JWT.verifyJWT, usersController.getAll)
  router.post('/', usersController.insert)
  router.patch('/:id', JWT.verifyJWT, usersController.update)
  router.delete('/:id', JWT.verifyJWT, usersController.remove)
  router.post('/login', authController.login)
  router.post('/logout', JWT.verifyJWT, authController.logout)

  return router
}

module.exports.usersRoutes = usersRoutes
