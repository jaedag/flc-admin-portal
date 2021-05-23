const dotenv = require('dotenv')
const axios = require('axios').default
const cypher = require('./resolver-queries')

dotenv.config()

const baseURL = 'https://flcadmin.us.auth0.com/'
let authToken
let authRoles = {}

const getTokenConfig = {
  method: 'post',
  url: 'https://flcadmin.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  data: {
    client_id: '4LofGKzEk2nFCbVRgG9YScD5AaT7WFFF',
    client_secret: process.env.AUTH_CLIENT_SECRET,
    audience: 'https://flcadmin.us.auth0.com/api/v2/',
    grant_type: 'client_credentials',
  },
}

axios(getTokenConfig)
  .then(async (res) => {
    authToken = res.data.access_token

    const getRolesConfig = {
      method: 'get',
      baseURL: baseURL,
      url: `/api/v2/roles`,
      headers: {
        autho: '',
        Authorization: `Bearer ${authToken}`,
      },
    }

    axios(getRolesConfig).then((res) => {
      res.data.forEach(
        (role) =>
          (authRoles[role.name] = {
            id: role.id,
            name: role.name,
            description: role.description,
          })
      )
    })
  })
  .catch((err) => console.error('There was an error obtaining auth token', err))

const createAuthUserConfig = (member) => ({
  method: 'post',
  baseURL: baseURL,
  url: `/api/v2/users`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
  data: {
    connection: 'flcadmin',
    email: member.email,
    user_metadata: {
      admin: true,
    },
    given_name: member.firstName,
    family_name: member.lastName,
    name: `${member.firstName} ${member.lastName}`,
    picture: member.pictureUrl ?? '',
    user_id: member.id,
    password: 'rAndoMLetteRs',
  },
})

const getAuthIdConfig = (member) => ({
  method: 'get',
  baseURL: baseURL,
  url: `/api/v2/users-by-email?email=${member.email}`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
})
const getUserRoles = (memberId) => ({
  method: 'get',
  baseURL: baseURL,
  url: `/api/v2/users/${memberId}/roles`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
})
const setUserRoles = (memberId, roles) => ({
  method: 'post',
  baseURL: baseURL,
  url: `/api/v2/users/${memberId}/roles`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
  data: {
    roles: roles,
  },
})

const assignRoles = (userId, userRoles, rolesToAssign) => {
  if (!userRoles.includes(rolesToAssign[0])) {
    // const assignRoles = [authRoles[roleToAssign].id]
    //If the person is NOT a co Admin
    axios(setUserRoles(userId, rolesToAssign)).catch((err) =>
      console.error('There was an error assigning role', err.response.data)
    )
  }
}

export const resolvers = {
  // Resolver Parameters
  // Object: the parent result of a previous resolver
  // Args: Field Arguments
  // Context: Context object, database connection, API, etc
  // GraphQLResolveInfo

  Mutation: {
    MergeMemberIsBishopAdminFor: async (object, args, context) => {
      const session = context.driver.session()
      let admin = {}
      let bishop = { id: args.to.id }

      await session
        .run(cypher.matchMemberQuery, args)
        .then(async (response) => {
          // Rearrange member object
          response.records[0].keys.forEach(
            (key, i) => (admin[key] = response.records[0]._fields[i])
          )

          //Check for AuthID of Admin
          axios(getAuthIdConfig(admin))
            .then(async (res) => {
              admin.auth_id = res.data[0]?.user_id

              if (!admin.auth_id) {
                //If admin Does Not Have Auth0 Profile, Create One
                axios(createAuthUserConfig(admin))
                  .then((res) => {
                    const auth_id = res.data[0]?.user_id
                    const roles = []
                    assignRoles(auth_id, roles, [authRoles.bishopAdmin.id])
                  })
                  .catch(
                    console.error((err) =>
                      console.error('Error Creating User', err.response.data)
                    )
                  )
              } else if (admin.auth_id) {
                //Check auth0 roles and add roles 'bishopAdmin'
                axios(getUserRoles(admin.auth_id)).then((res) => {
                  const roles = res.data.map((role) => role.name)

                  if (!roles.includes('bishopAdmin')) {
                    const assignRoles = [authRoles.bishopAdmin.id]

                    //If the person is NOT a bishops Admin
                    axios(getUserRoles(admin.auth_id))
                      .then((res) => {
                        const roles = res.data.map((role) => role.name)

                        assignRoles(admin.auth_id, roles, [
                          authRoles.bishopAdmin.id,
                        ])
                      })
                      .catch((error) =>
                        console.error(
                          'getUserRoles Failed to Run. Check Error',
                          error
                        )
                      )
                  }
                })
              }
            })
            .then(async () =>
              //Write Auth0 ID of Admin to Neo4j DB
              session.run(cypher.setBishopAdmin, {
                id: admin.id,
                bishopId: args.to.id,
                auth_id: admin.auth_id,
                cypherParams: context.cypherParams,
              })
            )
        })

      return {
        from: admin,
        to: bishop,
      }
    },
    MergeMemberIsTownAdminFor: async (object, args, context) => {
      const session = context.driver.session()
      let admin = {}
      let town = { id: args.to.id }

      await session
        .run(cypher.matchMemberQuery, args)
        .then(async (response) => {
          // Rearrange member object
          response.records[0].keys.forEach(
            (key, i) => (admin[key] = response.records[0]._fields[i])
          )

          //Check for AuthID of Admin
          axios(getAuthIdConfig(admin))
            .then(async (res) => {
              admin.auth_id = res.data[0]?.user_id

              if (!admin.auth_id) {
                //If admin Does Not Have Auth0 Profile, Create One
                axios(createAuthUserConfig(admin))
                  .then((res) => {
                    const auth_id = res.data[0]?.user_id
                    const roles = []
                    assignRoles(auth_id, roles, [
                      authRoles.constituencyAdmin.id,
                    ])
                  })
                  .catch((err) => console.error('Error Creating User', err))
              } else if (admin.auth_id) {
                //Check auth0 roles and add roles 'constituencyAdmin'
                axios(getUserRoles(admin.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(admin.auth_id, roles, [
                      authRoles.constituencyAdmin.id,
                    ])
                  })
                  .catch((error) =>
                    console.error(
                      'getUserRoles Failed to Run. Check Error',
                      error
                    )
                  )
              }
            })
            .then(async () =>
              //Write Auth0 ID of Admin to Neo4j DB
              session.run(cypher.setTownAdmin, {
                adminId: admin.id,
                townId: args.to.id,
                auth_id: admin.auth_id,
                cypherParams: context.cypherParams,
              })
            )
            .catch((err) =>
              console.error('There was an error obtaining the auth Id ', err)
            )
        })

      return {
        from: admin,
        to: town,
      }
    },
    MergeMemberIsCampusAdminFor: async (object, args, context) => {
      const session = context.driver.session()
      let admin = {}
      let campus = { id: args.to.id }

      await session
        .run(cypher.matchMemberQuery, args)
        .then(async (response) => {
          // Rearrange member object
          response.records[0].keys.forEach(
            (key, i) => (admin[key] = response.records[0]._fields[i])
          )

          //Check for AuthID of Admin
          axios(getAuthIdConfig(admin))
            .then(async (res) => {
              admin.auth_id = res.data[0]?.user_id

              if (!admin.auth_id) {
                //If admin Does Not Have Auth0 Profile, Create One
                axios(createAuthUserConfig(admin))
                  .then((res) => {
                    const auth_id = res.data[0]?.user_id
                    const roles = []
                    assignRoles(auth_id, roles, [
                      authRoles.constituencyAdmin.id,
                    ])
                  })
                  .catch((err) => console.error('Error Creating User', err))
              } else if (admin.auth_id) {
                //Check auth0 roles and add roles 'constituencyAdmin'
                axios(getUserRoles(admin.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(admin.auth_id, roles, [
                      authRoles.constituencyAdmin.id,
                    ])
                  })
                  .catch((error) =>
                    console.error(
                      'getUserRoles Failed to Run. Check Error',
                      error
                    )
                  )
              }
            })
            .then(async () =>
              //Write Auth0 ID of Admin to Neo4j DB
              session.run(cypher.setCampusAdmin, {
                adminId: admin.id,
                campusId: args.to.id,
                auth_id: admin.auth_id,
                cypherParams: context.cypherParams,
              })
            )
            .catch((err) =>
              console.error('There was an error obtaining the auth Id ', err)
            )
        })

      return {
        from: admin,
        to: campus,
      }
    },
  },
}
