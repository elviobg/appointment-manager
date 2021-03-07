const db = require('../database/databaseConnection')

module.exports.insert = function (req, res) {
  db.patients.create({
    name: 'Batatinha da Silva',
    phone: '99999999',
    height: 1.72,
    width: 75
  })
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.getAll = function (req, res) {
  db.patients.findAll()
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
