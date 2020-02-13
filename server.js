import dotenv from 'dotenv'
dotenv.config()

import jwt from 'express-jwt'
import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'

import config from './config/config'
import { resolver as resolvers, schema } from './graphql'

const PORT = config.app_port
const HOST = config.app_host
const app = express()

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
  context: () => {}
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
