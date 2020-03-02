const jwt = require('jsonwebtoken')
const config = require('../config/config')
class AccessToken {
  static async isAuthenticated (context) {
    try{
      const Authorization = context.request.get('Authorization')
      if (Authorization && Authorization.length) {
        const token = await Authorization.replace('Bearer ', '')
        const { id } = await jwt.verify(token, config.secret)
        return id
      }
      throw new Error('Not authenticated')
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = isAuthenticated
