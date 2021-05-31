// This module can be used to serve the GraphQL endpoint
// as a lambda function

const { ApolloServer, SchemaDirectiveVisitor } = require('apollo-server-lambda')
const { makeAugmentedSchema, assertSchema } = require('neo4j-graphql-js')
const neo4j = require('neo4j-driver')
const jwt = require('jsonwebtoken')

// This module is copied during the build step
// Be sure to run `npm run build`
const { typeDefs } = require('./graphql-schema')

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  )
)

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }
  return target
}

class MyHasScopeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    var expectedScopes = this.args.scopes
    var next = field.resolve // wrap resolver with auth check

    field.resolve = function (result, args, context, info) {
      console.log(
        'Field name ' +
          field.name +
          ' VFD - looking for scope ' +
          expectedScopes
      )

      // var decoded = verifyAndDecodeToken({
      //   context: context,
      // }) // FIXME: override with env var

      var scopes =
        decoded['permissions'] ||
        decoded['Permissions'] ||
        decoded['Scopes'] ||
        decoded['scopes'] ||
        decoded['Scope'] ||
        decoded['scope'] ||
        []

      // if any requested scope matches
      if (
        expectedScopes.some(function (scope) {
          return scopes.indexOf(scope) !== -1
        }) ||
        expectedScopes.some(function (scope) {
          return scopes.indexOf('[' + field.name + ']') !== -1
        })
      ) {
        return next(
          result,
          args,
          _objectSpread({}, context, {
            user: decoded,
          }),
          info
        )
      }

      throw new _errors.AuthorizationError({
        message: 'You are not authorized for this resource',
      })
    }
  }
  visitObject(obj) {
    var fields = obj.getFields()
    var expectedScopes = this.args.scopes

    Object.keys(fields).forEach(function (fieldName) {
      var field = fields[fieldName]
      var next = field.resolve

      field.resolve = function (result, args, context, info) {
        console.log(
          'Field name ' +
            field.name +
            ' VFD - looking for scope ' +
            expectedScopes
        )

        // var decoded = verifyAndDecodeToken({
        //   context: context,
        // }) // FIXME: override w/ env var

        var scopes =
          decoded['permissions'] ||
          decoded['Permissions'] ||
          decoded['Scopes'] ||
          decoded['scopes'] ||
          decoded['Scope'] ||
          decoded['scope'] ||
          []

        if (
          expectedScopes.some(function (role) {
            return scopes.indexOf(role) !== -1
          })
        ) {
          return next(
            result,
            args,
            _objectSpread({}, context, {
              user: decoded,
            }),
            info
          )
        }

        throw new _errors.AuthorizationError({
          message: 'You are not authorized for this resource',
        })
      }
    })
  }
}

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
  schemaDirectives: { hasScope: MyHasScopeDirective },
})

assertSchema({ schema, driver, debug: true })

const server = new ApolloServer({
  schema: schema,
  context: async ({ event }) => {
    const token = event.headers?.authorization?.slice(7)

    if (!token) {
      return {
        driver,
      }
    }

    const authResult = new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.JWT_SECRET.replace(/\\n/gm, '\n'),
        {
          algorithms: ['RS256'],
        },
        (error, decoded) => {
          if (error) {
            // eslint-disable-next-line
            console.log('error', error)
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
        user_authId: decoded.sub,
      },
    }
  },
  introspection: false,
  playground: false,
})

exports.handler = server.createHandler()
