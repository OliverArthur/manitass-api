const authenticated = require('../auth/authenticated')
const db = require('../../models')

const Query = {
  async user(_, { id }, context) {
    const authorizedUser = authenticated(context)
    try {
      if (!authorizedUser.authToken) {
        throw new Error('You are not authorized to access this user information.')
      }
      const req = await db.User.findOne({
        where: {
          id
        }
      })
      return req
    } catch (error) {
      throw error
    }
  },
  async fetchUsers (_, args, context) {
    try {
      const req = await db.User.findAll()
      return req
    } catch (error) {
      throw error
    }
  }
}

module.exports = Query
