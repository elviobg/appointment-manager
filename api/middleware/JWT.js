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
    console.log('User uuid: ' + decoded.id)
    next()
  })
}

module.exports.generateJWT = function (id) {
  const jwt = require('jsonwebtoken')
  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 3600 })
  return token
}
