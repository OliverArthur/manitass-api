import glue from 'schemaglue'

const options = {
  js: '**/*.js'
}
export const { schema, resolver } = glue('graphql', options)
