const jwt = require('jsonwebtoken')
const config = require('../config/config')


/**
 * @description helper function to get the authenticated user
 * by getting the access token from the headers.
 *
 * @param { String } token
 * @returns Int
 */
function accessToken(token) {
  const authToken = token.replace('Bearer ', '')
  const id = jwt.verify(authToken, config.secret)
  if (!token) {
    throw new Error('Not authenticated')
  }
  return id
}

module.exports = accessToken
