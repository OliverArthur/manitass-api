const dotenv = require('dotenv')
dotenv.config()

const jwt = require('express-jwt')
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const { Schema } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

const config = require('./config/config')
const { resolver, schema } = require('./graphql')
const models = require('./models')

const PORT = config.app_port
const HOST = config.app_host
const app = express()
const resolvers = resolver

const autMiddleware = jwt({
  secret: config.secret,
  credentialsRequired: false
})

app.use(autMiddleware)

app.use((err, req, res, next) => {
  const errorObject = {
    error: true,
    message: `${err.name}: ${err.message}`
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(errorObject)
  } else {
    return res.status(400).json(errorObject)
  }
})

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  playground: true,
  context: {
    models
  }
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, async () => {
  console.log(`🚀Server ready at http://${HOST}:${PORT}${server.graphqlPath}`)
  let error
  if (error) {
    console.error('Error: Cannot connect to database');
  } else {
    console.log('Connected to database');
  }
})
