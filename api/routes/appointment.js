function appointmentsRoutes () {
  const express = require('express')
  const router = express.Router()
  const appointmentController = require('../controllers/appointment')
  const JWT = require('../middleware/JWT')

  router.get('/ping', function (req, res) {
    res.send('pong')
  })
  router.get('/', JWT.verifyJWT, appointmentController.getAll)
  router.get('/:id', JWT.verifyJWT, appointmentController.getByID)
  router.get('/patient/:id', JWT.verifyJWT, appointmentController.getByPatientID)
  router.post('/', JWT.verifyJWT, appointmentController.insert)
  router.patch('/:id', JWT.verifyJWT, appointmentController.update)
  router.delete('/:id', JWT.verifyJWT, appointmentController.remove)

  return router
}

module.exports.appointmentsRoutes = appointmentsRoutes
