module.exports.login = async function (req, res) {
  const bcrypt = require('bcrypt')
  const login = req.body.login
  const password = req.body.password
  const db = require('../database/databaseConnection')
  const JWT = require('../middleware/JWT')

  db.users.findOne({ where: { login: login } })
    .then(async function (user) {
      if (!user) {
        return res.status(404).send({ auth: false, message: 'User not found' })
      }
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).send({ auth: true, token: JWT.generateJWT(user.uuid) })
      } else {
        res.status(401).send({ auth: false, message: 'Invalid login and/or password' })
      }
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports.logout = function (req, res) {
  res.status(200).send({ auth: false, token: null })
}
