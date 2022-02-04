// This module can be used to serve the GraphQL endpoint
// as a lambda function

const { ApolloServer } = require('apollo-server-lambda')
const { Neo4jGraphQL } = require('@neo4j/graphql')
const { merge } = require('lodash')
const neo4j = require('neo4j-driver')

// This module is copied during the build step
// Be sure to run `npm run build`
const { typeDefs } = require('./schema/graphql-schema')
const { resolvers } = require('../../resolvers')
const { serviceResolvers } = require('../../resolvers/service-resolvers')

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  )
)

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers: merge(resolvers, serviceResolvers),
  driver,
  config: {
    jwt: {
      secret: process.env.JWT_SECRET.replace(/\\n/gm, '\n'),
      rolesPath: 'permissions',
    },
  },
})

const server = new ApolloServer({
  schema: neoSchema.schema,
  context: ({ event }) => {
    return { req: event }
  },
  introspection: true,
})

// exports.handler = server.createHandler()

const apolloHandler = server.createHandler()

export const handler = (event, context, ...args) => {
  return apolloHandler(
    {
      ...event,
      requestContext: context,
    },
    context,
    ...args
  )
}
