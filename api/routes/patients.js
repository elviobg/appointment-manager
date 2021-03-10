function patientsRoutes () {
  const express = require('express')
  const router = express.Router()
  const patientController = require('../controllers/patients')
  const JWT = require('../middleware/JWT')

  router.get('/ping', function (req, res) {
    res.send('pong')
  })
  router.get('/', JWT.verifyJWT, patientController.getAll)
  router.get('/:id', JWT.verifyJWT, patientController.getByID)
  router.post('/', JWT.verifyJWT, patientController.insert)
  router.put('/:id', JWT.verifyJWT, patientController.update)
  router.delete('/:id', JWT.verifyJWT, patientController.remove)

  return router
}

module.exports.patientsRoutes = patientsRoutes
