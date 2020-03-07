const jwt = require('jsonwebtoken')
const config = require('../config/config')

function accessToken(token) {
  const authToken = token.replace('Bearer ', '')
  const id = jwt.verify(authToken, config.secret)
  if (!token) {
    throw new Error('Not authenticated')
  }
  return id
}

module.exports = accessToken
