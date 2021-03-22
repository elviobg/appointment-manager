module.exports.insert = function (req, res) {
  const db = require('../database/databaseConnection')

  const name = req.body.name
  const phone = req.body.phone
  const birthday = req.body.birthday
  const gender = req.body.gender
  const height = req.body.height
  const weight = req.body.weight

  db.patients.create({
    name: name,
    phone: phone,
    height: height,
    weight: weight,
    gender: gender,
    birthday: birthday
  })
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.getAll = function (req, res) {
  const db = require('../database/databaseConnection')
  db.patients.findAll({ order: [['name']] })
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.getByID = function (req, res) {
  const db = require('../database/databaseConnection')
  const id = req.params.id

  db.patients.findOne({ where: { uuid: id } })
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.update = function (req, res) {
  const db = require('../database/databaseConnection')

  const id = req.params.id
  const name = req.body.name
  const phone = req.body.phone
  const birthday = req.body.birthday
  const gender = req.body.gender
  const height = req.body.height
  const weight = req.body.weight

  db.patients.update({
    name: name,
    phone: phone,
    height: height,
    weight: weight,
    gender: gender,
    birthday: birthday
  },
  { where: { uuid: id } })
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.remove = function (req, res) {
  const db = require('../database/databaseConnection')
  const id = req.params.id

  db.patients.destroy({ where: { uuid: id } })
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
