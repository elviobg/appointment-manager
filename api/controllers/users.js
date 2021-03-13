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

  console.log(req.body)
  const password = req.body.password
  const email = req.body.email
  const firstname = req.body.firstname
  const lastname = req.body.lastname

  db.users.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
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
  const firstname = req.body.firstname
  const lastname = req.body.lastname

  db.users.update({
    firstname: firstname,
    lastname: lastname
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
