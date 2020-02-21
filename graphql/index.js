const glue = require('schemaglue')

const options = {
  js: '**/*.js'
}

const { schema, resolver } = glue('graphql', options)

module.exports = { schema, resolver }
