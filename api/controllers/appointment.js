module.exports.insert = function (req, res) {
    const db = require('../database/databaseConnection')
  
    const patient_id = req.body.patient_id
    const date = req.body.date
    const observation = req.body.observation
  
    db.appointments.create({
        patientUuid: patient_id,
        date: date,
        observation: observation,
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
    db.appointments.findAll()
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
  
    db.appointments.findAll({ where: { uuid: id } })
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
    const patient_id = req.params.id
  
    db.appointments.findAll({ where: { patientUuid: patient_id } })
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
    const patient_id = req.body.patient_id
    const date = req.body.date
    const observation = req.body.observation
  
    db.appointments.update({
        patientUuid: patient_id,
        date: date,
        observation: observation,
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
  