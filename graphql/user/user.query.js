const authenticated = require('../auth/authenticated')
const db = require('../../models')

const Query = {

  /**
   * @description get authenticated user information
   *
   * @param {*} _
   * @param { Int } { id }
   * @param { Object } context
   * @returns Object
   */
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

  /**
   * @description fetch all user
   *
   * @param {*} _
   * @param { Object } args
   * @param { Object } context
   * @returns
   */
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
