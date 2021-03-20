module.exports.insert = function (req, res) {
  const db = require('../database/databaseConnection')

  const patientId = req.body.patient_id
  const date = req.body.date
  const observation = req.body.observation

  db.appointments.create({
    patientUuid: patientId,
    date: date,
    observation: observation
  })
    .then(appointments => {
      res.status(200).send(JSON.stringify(appointments))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.getAll = function (req, res) {
  const db = require('../database/databaseConnection')
  db.appointments.findAll({ include: db.patients, order: [['date']] })
    .then(appointments => {
      res.status(200).send(JSON.stringify(appointments))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.getByID = function (req, res) {
  const db = require('../database/databaseConnection')
  const id = req.params.id

  db.appointments.findOne({
    where: { uuid: id },
    include: db.patients
  })
    .then(appointments => {
      res.status(200).send(JSON.stringify(appointments))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.getByPatientID = function (req, res) {
  console.log('by patient ID')
  const db = require('../database/databaseConnection')
  const patientId = req.params.id

  db.appointments.findAll({
    where: { patientUuid: patientId },
    include: db.patients,
    order: [['date']]
  })
    .then(appointments => {
      res.status(200).send(JSON.stringify(appointments))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.update = function (req, res) {
  const db = require('../database/databaseConnection')

  const id = req.params.id
  const observation = req.body.observation

  db.appointments.update({
    observation: observation
  },
  { where: { uuid: id } })
    .then(appointments => {
      res.status(200).send(JSON.stringify(appointments))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.remove = function (req, res) {
  const db = require('../database/databaseConnection')
  const id = req.params.id

  db.appointments.destroy({ where: { uuid: id } })
    .then(appointments => {
      res.status(200).send(JSON.stringify(appointments))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
