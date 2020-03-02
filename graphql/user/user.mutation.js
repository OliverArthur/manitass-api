const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const Mutation = {
  /**
   * @methods register an new user
   *
   * @param {*} _
   * @param { Object } args
   * @param { Object } { models } object
   * @returns { token, object }
   */
  async signUp(_, args, { models }) {
    const firstName = args.input.email
    const lastName = args.input.email
    const email = args.input.email
    const password = args.input.password
    try {
      const user = await models.User.findOne({
        where: {
          email
        }
      })
      if (user) {
        throw new Error('An user with that email already exists.')
      }

      const hashPassword = await bcrypt.hash(password, 12)

      const newUser = await models.User.create({
        firstName: args.input.email,
        lastName: args.input.email,
        email: args.input.email,
        password: hashPassword
      })

      const payload = await ({ id: newUser.id })
      const token = jwt.sign(payload, config.secret, {
        expiresIn: '7w'
      })

      return { payload, token }
    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * @methods aunthenticate an user
   *
   * @param {*} _
   * @param {*} email
   * @param {*} password
   * @param { models } { models } object
   * @returns { token, object }
   */
  async login(_, { email, password }, { models }) {
    try {
      const user = await models.User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw new Error('There is no user with that email.')
      }
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error('Incorrect password')
      }

      const token = jwt.sign({
        id: user.id,
        email
      }, config.secret, { expiresIn: '8h' })

      return {
        token,
        user
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { Mutation }
