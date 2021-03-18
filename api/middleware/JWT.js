module.exports.verifyJWT = function (req, res, next) {
  const jwt = require('jsonwebtoken')
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(400).send({ auth: false, message: 'Token not found' })
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).send({ auth: false, message: 'Token invalid' })
    }
    req.userId = decoded.id
    next()
  })
}

module.exports.generateJWT = function (id) {
  const ONE_HOUR_IN_MINUTES = 3600
  const jwt = require('jsonwebtoken')
  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: ONE_HOUR_IN_MINUTES * 12 })
  return token
}
