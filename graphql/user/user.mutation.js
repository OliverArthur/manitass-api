const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Transport = require('../../helper/transporter')
const newAccountMail = require('../../templates/newAccountMail')
const deleteAccountMail = require('../../templates/deleteAccountMail')

const authenticated = require('../auth/authenticated')
const config = require('../../config/config')
const db = require('../../models')

const Mutation = {
  /**
   * @methods register an new user
   *
   * @param {*} _
   * @param { Object } args
   * @param { Object } { models } object
   * @returns { token, object }
   */
  async signUp(_, args, context) {
    const firstName = args.input.email
    const lastName = args.input.email
    const email = args.input.email
    const password = args.input.password
    try {
      const user = await db.User.findOne({
        where: {
          email
        }
      })
      if (user) {
        throw new Error('An user with that email already exists.')
      }

      const hashPassword = await bcrypt.hash(password, 12)

      const newUser = await db.User.create({
        firstName: args.input.email,
        lastName: args.input.email,
        email: args.input.email,
        password: hashPassword
      })

      Transport.sendMail(newAccountMail(email, newUser))

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
  async login(_, { email, password }, context) {
    try {
      const user = await db.User.findOne({
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
  },

  /**
   * @description delete user account
   *
   * @param {*} _
   * @param { Int } { id }
   * @param { Object } context
   * @returns Boolean
   */
  async deleteAccount(_, { id }, context) {
    try {
      const authorizedUser = await authenticated(context)
      const userId = authorizedUser.currentUser.id
      const user = await db.User.findOne({
        where: {
          id
        }
      })
      if (id === userId) {
        Transport.sendMail(deleteAccountMail(user.email, user))
        return !!await db.User.destroy({
          where: { id: userId }
        })
      } else {
        throw new Error('You must be an authorized user to delete this account')
      }
    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * @description update user details
   *
   * @param {*} _
   * @param { Int, object } { id, input }
   * @param { Object } context
   * @returns Object
   */
  async updateUser(_, { id, input }, context) {
    try {
      const authorizedUser = await authenticated(context)
      const userId = authorizedUser.currentUser.id
      if (id === userId) {
        return !!await db.User.update(
          {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            postcode: input.postcode,
            avatar: input.avatar,
            country: input.country,
            city: input.city,
            phone: input.phone,
            isWorker: input.isWorker,
            isConfirmed: input.isConfirmed,
          },
          { where: { id: userId } }
        )
      } else {
        throw new Error('You must be an authorized user to update this account')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { Mutation }
