const nodemailer = require('nodemailer')
const config = require('../config/config')

const Transport = nodemailer.createTransport({
  host: config.mail_server,
  port: config.mail_port,
  secure: false,
  auth: {
    user: config.mail_user,
    pass: config.mail_pass
  },
  tls: {
    ciphers: 'SSLv3'
  },
  requireTLS: true
})

module.exports = Transport
