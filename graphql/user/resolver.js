const { Query } = require('./user.query')
const { Mutation } = require('./user.mutation')

const resolver = {
  Query: Query,
  Mutation: Mutation
}

module.exports = { resolver }
