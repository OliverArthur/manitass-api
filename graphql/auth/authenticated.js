const accessToken = require('../../helper/accessToken')

/**
 * @description function to verify if the
 * user is authenticated or not
 *
 * @param { Object } context
 * @returns Object
 */
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
