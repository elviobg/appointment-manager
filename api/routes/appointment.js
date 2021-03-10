function appointmentsRoutes () {
  const express = require('express')
  const router = express.Router()
  const appointmentController = require('../controllers/appointment')

  router.get('/ping', function (req, res) {
    res.send('pong')
  })
  router.get('/', appointmentController.getAll)
  router.get('/:id', appointmentController.getByID)
  router.get('/patient/:id', appointmentController.getByPatientID)
  router.post('/', appointmentController.insert)
  router.put('/:id', appointmentController.update)
  router.delete('/:id', appointmentController.remove)

  return router
}

module.exports.appointmentsRoutes = appointmentsRoutes
