function patientsRoutes() {
  const express = require('express');
  const router = express.Router();
  const patientController = require('../controllers/patients')

  router.get('/ping', function (req, res) {
    res.send('pong')
  })
  router.get('/', patientController.getAll)
  router.get('/:id', patientController.getByID)
  router.post('/', patientController.insert)
  router.put('/:id', patientController.update)
  router.delete('/:id', patientController.remove)

  return router
}
  
module.exports.patientsRoutes = patientsRoutes;
