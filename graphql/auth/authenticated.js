const accessToken = require('../../helper/accessToken')

function authenticated (context) {
  const authToken = context.req.headers.authorization

  if (!authToken) {
    throw new Error('Unable to authenticate user')
  }

  const currentUser = accessToken(authToken)

  return {
    authToken,
    currentUser
  }
}

module.exports = authenticated
