const Query = {
  async fetchUsers (root, args, { models }) {
    try {
      const req = await models.User.findAll()
      return req
    } catch (error) {
      throw error
    }
  }
}

module.exports = Query
