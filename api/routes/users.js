function usersRoutes () {
  const express = require('express')
  const router = express.Router()
  const usersController = require('../controllers/users')

  router.get('/ping', function (req, res) {
    res.send('pong')
  })
  router.get('/', usersController.getAll)
  router.post('/', usersController.insert)
  router.patch('/:id', usersController.update)
  router.delete('/:id', usersController.remove)

  return router
}

module.exports.usersRoutes = usersRoutes
