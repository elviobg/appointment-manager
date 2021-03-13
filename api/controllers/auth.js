module.exports.login = async function (req, res) {
  const bcrypt = require('bcrypt')
  const email = req.body.email
  const password = req.body.password
  const db = require('../database/databaseConnection')
  const JWT = require('../middleware/JWT')

  db.users.findOne({ where: { email: email } })
    .then(async function (user) {
      if (!user) {
        return res.status(404).send({ auth: false, message: 'User not found' })
      }
      if (await bcrypt.compare(password, user.password)) {        
        const token = JWT.generateJWT(user.email)
        res.status(200).send({ auth: true, email:log, token: token })
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
