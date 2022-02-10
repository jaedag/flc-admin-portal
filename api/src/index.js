import { typeDefs } from './schema/graphql-schema'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import neo4j from 'neo4j-driver'
import { Neo4jGraphQL } from '@neo4j/graphql'
import dotenv from 'dotenv'
import { resolvers } from './resolvers/resolvers'
import { serviceResolvers } from './resolvers/service-resolvers'
import { arrivalsResolvers } from './resolvers/arrivals-resolvers'

// set environment variables from .env
dotenv.config()

const app = express()

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687/',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'letmein'
  ),
  {
    encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
  }
)

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers: { ...resolvers, ...serviceResolvers, ...arrivalsResolvers },
  driver,
  config: {
    jwt: {
      secret: process.env.JWT_SECRET,
      rolesPath: 'https://flcadmin\\.netlify\\.app/roles',
    },
  },
})

/*
 * Create a Neo4j driver instance to connect to the database
 * using credentials specified as environment variables
 * with fallback to defaults
 */

/*
 * Create a new ApolloServer instance, serving the GraphQL schema
 * created using makeAugmentedSchema above and injecting the Neo4j driver
 * instance into the context object so it is available in the
 * generated resolvers to connect to the database.
 */

const startServer = async () => {
  const server = new ApolloServer({
    context: ({ req }) => req,
    schema: neoSchema.schema,
    introspection: true,
  })

  await server.start()
  server.applyMiddleware({ app, path })
}

// Specify host, port and path for GraphQL endpoint
const port = process.env.GRAPHQL_SERVER_PORT || 4001
const path = process.env.GRAPHQL_SERVER_PATH || '/graphql'
const host = process.env.GRAPHQL_SERVER_HOST || '0.0.0.0'

/*
 * Optionally, apply Express middleware for authentication, etc
 * This also also allows us to specify a path for the GraphQL endpoint
 */

startServer()

app.listen({ host, port, path }, () => {
  // eslint-disable-next-line
  console.log(`GraphQL server ready at http://${host}:${port}${path}`)
})
