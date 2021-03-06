const express = require('express')
const router = express.Router()
const db = require('./../db')

/* GET users listing. */
router.get('/test', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/', function (req, res, next) {
  db.Patient.create({
    name: 'Batatinha'
  })
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
})

router.get('/', function (req, res, next) {
  db.Patient.findAll()
    .then(patients => {
      res.status(200).send(JSON.stringify(patients))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
})

module.exports = router
