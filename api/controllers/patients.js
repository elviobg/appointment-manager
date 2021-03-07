const Patient = require('../models/patient')

module.exports.insert = function (req, res) {
  Patient.create({
    name: 'Batatinha'
  })
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.getAll = function (req, res) {
  Patient.findAll()
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.getByID = function (req, res) {
  res.send('getPatientByID')
}

module.exports.update = function (req, res) {
  res.send('updatePatient')
}

module.exports.remove = function (req, res) {
  res.send('removePatient')
}
