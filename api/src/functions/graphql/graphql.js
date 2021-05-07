// This module can be used to serve the GraphQL endpoint
// as a lambda function

const { ApolloServer } = require('apollo-server-lambda')
const { makeAugmentedSchema, assertSchema } = require('neo4j-graphql-js')
const neo4j = require('neo4j-driver')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

// This module is copied during the build step
// Be sure to run `npm run build`
const { typeDefs } = require('./graphql-schema')

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  ),
  {
    encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
  }
)

const schema = makeAugmentedSchema({
  typeDefs,
  config: {
    query: true,
    mutation: true,
    auth: {
      isAuthenticated: true,
      hasScope: true,
    },
  },
})

assertSchema({ schema, driver, debug: true })

// Verify using getPublicKey callback
// Example uses https://github.com/auth0/node-jwks-rsa as a way to fetch the keys.
const client = jwksClient({
  jwksUri: 'https://flcadmin.us.auth0.com/.well-known/jwks.json',
})
function getPublicKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

const server = new ApolloServer({
  schema: schema,
  context: async ({ event }) => {
    const token = event.headers?.authorization?.slice(7)
    // let userId

    if (!token) {
      return {
        driver,
      }
    }

    const authResult = new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getPublicKey,
        {
          algorithms: ['RS256'],
        },
        (error, decoded) => {
          if (error) {
            reject({ error })
          }
          if (decoded) {
            resolve(decoded)
          }
        }
      )
    })

    const decoded = await authResult

    return {
      driver,
      req: event,
      cypherParams: {
        userId: decoded.sub,
      },
      neo4jDatabase: process.env.NEO4J_DATABASE,
    }
  },
  introspection: true,
  playground: true,
})

exports.handler = server.createHandler()
