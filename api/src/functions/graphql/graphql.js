// This module can be used to serve the GraphQL endpoint
// as a lambda function

const { ApolloServer } = require('apollo-server-lambda')
const { makeAugmentedSchema, assertSchema } = require('neo4j-graphql-js')
const neo4j = require('neo4j-driver')

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

const server = new ApolloServer({
  schema: schema,
  context: ({ event }) => {
    if (!event) {
      return { driver }
    }

    return {
      driver,
      req: {
        path: '/graphql',
        httpMethod: 'POST',
        queryStringParameters: {},
        multiValueQueryStringParameters: {},
        headers: {
          'x-forwarded-for': '::1',
          cookie:
            '_legacy_auth0.is.authenticated=true; auth0.is.authenticated=true',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          referer: 'http://localhost:8000/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          origin: 'http://localhost:8000',
          'content-type': 'application/json',
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
          'sec-ch-ua-mobile': '?0',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJNTFg5QmxBcDJnMGlxcnczRnpHeSJ9.eyJpc3MiOiJodHRwczovL2ZsY2FkbWluLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MDg5ZmViOGUxZTNlNzAwNjk3ZjdlZmYiLCJhdWQiOlsiaHR0cHM6Ly9mbGNhZG1pbi5uZXRsaWZ5LmFwcC9ncmFwaHFsIiwiaHR0cHM6Ly9mbGNhZG1pbi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjIwNTMzMzcwLCJleHAiOjE2MjA2MTk3NzAsImF6cCI6ImRENm5uOEFzb1BMNFBxS1Rxd0c5dlRIakRuU2xSSXFXIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbIkJhY2VudGE6Q3JlYXRlIiwiQmFjZW50YTpSZWFkIiwiQmFjZW50YTpVcGRhdGUiLCJCaXNob3A6UmVhZCIsIkNhbXB1czpDcmVhdGUiLCJDYW1wdXM6VXBkYXRlIiwiQ2VudHJlOkNyZWF0ZSIsIkNlbnRyZTpVcGRhdGUiLCJNZW1iZXI6Q3JlYXRlIiwiTWVtYmVyOlJlYWQiLCJNZW1iZXI6VXBkYXRlIiwiVG93bjpDcmVhdGUiLCJUb3duOlVwZGF0ZSJdfQ.p-uXRWsaqTBx02QM2Q70X1f1a1Y0l_t-aEl77UHkPC5osDgyEDMsR8cGswISVG31kvz4c7SktxeVvqVlOPPk3YDbLo64TcqsnACpqMAKQYzyizRs7utJA-awX6MP3lUIbvLPh6-2Y3Iz8g-64PU3ExhZN9m0SxmAfp3VrAkRuywyPonmBWml-sVkKUH2hKJrSdJutaHRVw0uZUJ8cEhe-cDdrlJvK71E8ajzpVCR7AkGaI7420We6brcmGOixggR_wE7ibiTiHeQUndbQsLO0eCzLEIS--dA3-zV0g1LnUQK-WsFLctm-Txngk_FPKJCO2vMHwLYAo0I120j2pJFlg',
          accept: '*/*',
          'sec-ch-ua':
            '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
          'content-length': '2442',
          connection: 'close',
          host: 'localhost:8000',
          'client-ip': '::1',
        },
        multiValueHeaders: {
          'x-forwarded-for': ['::1'],
          cookie: [
            '_legacy_auth0.is.authenticated=true; auth0.is.authenticated=true',
          ],
          'accept-language': ['en-GB,en-US;q=0.9,en;q=0.8'],
          'accept-encoding': ['gzip, deflate, br'],
          referer: ['http://localhost:8000/'],
          'sec-fetch-dest': ['empty'],
          'sec-fetch-mode': ['cors'],
          'sec-fetch-site': ['same-origin'],
          origin: ['http://localhost:8000'],
          'content-type': ['application/json'],
          'user-agent': [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
          ],
          'sec-ch-ua-mobile': ['?0'],
          authorization: [
            'Bearer Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJNTFg5QmxBcDJnMGlxcnczRnpHeSJ9.eyJpc3MiOiJodHRwczovL2ZsY2FkbWluLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MDg5ZmViOGUxZTNlNzAwNjk3ZjdlZmYiLCJhdWQiOlsiaHR0cHM6Ly9mbGNhZG1pbi5uZXRsaWZ5LmFwcC9ncmFwaHFsIiwiaHR0cHM6Ly9mbGNhZG1pbi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjIwNTMzODU0LCJleHAiOjE2MjA2MjAyNTQsImF6cCI6ImRENm5uOEFzb1BMNFBxS1Rxd0c5dlRIakRuU2xSSXFXIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbIkJhY2VudGE6Q3JlYXRlIiwiQmFjZW50YTpSZWFkIiwiQmFjZW50YTpVcGRhdGUiLCJCaXNob3A6UmVhZCIsIkNhbXB1czpDcmVhdGUiLCJDYW1wdXM6VXBkYXRlIiwiQ2VudHJlOkNyZWF0ZSIsIkNlbnRyZTpVcGRhdGUiLCJNZW1iZXI6Q3JlYXRlIiwiTWVtYmVyOlJlYWQiLCJNZW1iZXI6VXBkYXRlIiwiVG93bjpDcmVhdGUiLCJUb3duOlVwZGF0ZSJdfQ.dFjdx2D2k24eWeph6xA1Tes3GO5sZHflM1SEo8kSj3DoAkL-hEsMl9UggIBF30PZ8lIUdhYYDcKfGF6aIlNrCM3QceoWnOCy4e5Z0G6B-IgygvDgzbDqzx9Le3E8M_3CbJjAsLWOE4C_8Jnj2ZvChTF3_wsbra-basHYpT5gfIt5Wuf4wmRl0BUDtW7ZI_UpgGMrJeHgLxlqEABrAxtuonF0b_YBsuwr7WfDEjfBYdlUWlOlNdRrGvx9Fb0nzGSWQ0yiGgLVASVI3eGvz8ryx0k4WZek4pIrXE_DhhtVeuQqM33wkaqf7YT62lj0F2WFx_LJ3MW3jQlcpmea5YEQww',
          ],
          accept: ['*/*'],
          'sec-ch-ua': [
            '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
          ],
          'content-length': ['2442'],
          connection: ['close'],
          host: ['localhost:8000'],
          'client-ip': ['::1'],
        },
        body:
          '{"operationName":"globalSearch","variables":{"searchKey":""},"query":"query globalSearch($searchKey: String!) {\\n  globalSontaSearch(searchKey: $searchKey, first: 6) {\\n    id\\n    name\\n    town {\\n      id\\n      bishop {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    campus {\\n      bishop {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  globalTownSearch(searchKey: $searchKey, first: 6) {\\n    id\\n    name\\n    bishop {\\n      id\\n      __typename\\n    }\\n    __typename\\n  }\\n  globalCampusSearch(searchKey: $searchKey, first: 6) {\\n    id\\n    name\\n    bishop {\\n      id\\n      __typename\\n    }\\n    __typename\\n  }\\n  globalCentreSearch(searchKey: $searchKey, first: 6) {\\n    id\\n    name\\n    town {\\n      id\\n      bishop {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    campus {\\n      id\\n      bishop {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  globalBacentaSearch(searchKey: $searchKey, first: 6) {\\n    id\\n    name\\n    centre {\\n      town {\\n        id\\n        bishop {\\n          id\\n          __typename\\n        }\\n        __typename\\n      }\\n      campus {\\n        id\\n        bishop {\\n          id\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  globalMemberSearch(searchKey: $searchKey, first: 6) {\\n    id\\n    firstName\\n    lastName\\n    pictureUrl\\n    bacenta {\\n      id\\n      name\\n      leader {\\n        id\\n        firstName\\n        lastName\\n        __typename\\n      }\\n      centre {\\n        id\\n        town {\\n          id\\n          bishop {\\n            id\\n            __typename\\n          }\\n          __typename\\n        }\\n        campus {\\n          id\\n          bishop {\\n            id\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    ministry {\\n      id\\n      name\\n      __typename\\n    }\\n    leadsCampus {\\n      id\\n      name\\n      bishop {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    leadsTown {\\n      id\\n      name\\n      bishop {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    townBishop {\\n      id\\n      name\\n      __typename\\n    }\\n    campusBishop {\\n      id\\n      name\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
        isBase64Encoded: false,
      },
    }
  },
  // introspection: true,
  // playground: true,
})

exports.handler = server.createHandler()
