module.exports.getAll = function (req, res) {
  const db = require('../database/databaseConnection')
  db.users.findAll()
    .then(users => {
      res.status(200).send(JSON.stringify(users))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.insert = function (req, res) {
  const db = require('../database/databaseConnection')

  const name = req.body.name
  const login = req.body.login
  const password = req.body.password

  db.users.create({
    name: name,
    login: login,
    password: password
  })
    .then(users => {
      res.status(200).send(JSON.stringify(users))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.update = function (req, res) {
  const db = require('../database/databaseConnection')

  const id = req.params.id
  const name = req.body.name

  db.users.update({
    name: name
  },
  { where: { uuid: id } })
    .then(users => {
      res.status(200).send(JSON.stringify(users))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.remove = function (req, res) {
  const db = require('../database/databaseConnection')
  const id = req.params.id

  db.users.destroy({ where: { uuid: id } })
    .then(users => {
      res.status(200).send(JSON.stringify(users))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
