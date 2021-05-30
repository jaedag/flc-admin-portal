const dotenv = require('dotenv')
const axios = require('axios').default
const cypher = require('./resolver-queries')

dotenv.config()

const baseURL = 'https://flcadmin.us.auth0.com/'
let authToken
let authRoles = {}
const errorHandling = (member) => {
  if (!member.email) {
    throw `${member.firstName} ${member.lastName} does not have a valid email address`
  } else if (!member.pictureUrl) {
    throw `${member.firstName} ${member.lastName} does not have a valid picture`
  }
}

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
    console.log('auth token obtained')
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
  .catch((err) =>
    console.error('There was an error obtaining auth token', err.data ?? err)
  )

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

const deleteAuthUserConfig = (memberId) => ({
  method: 'delete',
  baseURL: baseURL,
  url: `/api/v2/users/${memberId}`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
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
const deleteUserRoles = (memberId, roles) => ({
  method: 'delete',
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
  //An assign roles function to simplify assigning roles with an axios request
  if (!userRoles.includes(rolesToAssign[0])) {
    axios(setUserRoles(userId, rolesToAssign))
      .then(console.log('User Role successfully added'))
      .catch((err) =>
        console.error('There was an error assigning role', err.response.data)
      )
  }
}
const removeRoles = (userId, userRoles, rolesToRemove) => {
  const userRoleIds = userRoles.map((role) => authRoles[role].id)

  //A remove roles function to simplify removing roles with an axios request
  if (userRoleIds.includes(rolesToRemove)) {
    axios(deleteUserRoles(userId, [rolesToRemove]))
      .then(console.log('User Role sucessfully removed'))
      .catch((err) =>
        console.error(
          'There was an error removing role',
          err?.response?.data ?? err
        )
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
                    const auth_id = res.data.user_id
                    admin.auth_id = res.data.user_id

                    const roles = []

                    assignRoles(auth_id, roles, [authRoles.bishopAdmin.id])
                    console.log(
                      `Auth0 Account successfully created for ${admin.firstName} ${admin.lastName}`
                    )

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setBishopAdmin, {
                        adminId: admin.id,
                        bishopId: args.to.id,
                        auth_id: admin.auth_id,
                        cypherParams: context.cypherParams,
                      })
                      .then(console.log('Cypher Query Executed Successfully'))
                      .catch((err) =>
                        console.error('Error running cypher query', err)
                      )
                  })
                  .catch((err) =>
                    console.error(
                      'Error Creating User',
                      err?.response?.data ?? err
                    )
                  )
              } else if (admin.auth_id) {
                //Check auth0 roles and add roles 'bishopAdmin'
                axios(getUserRoles(admin.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(admin.auth_id, roles, [
                      authRoles.bishopAdmin.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setBishopAdmin, {
                        adminId: admin.id,
                        bishopId: args.to.id,
                        auth_id: admin.auth_id,
                        cypherParams: context.cypherParams,
                      })
                      .then(console.log('Cypher Query Executed Successfully'))
                      .catch((err) =>
                        console.error('Error running cypher query', err)
                      )
                  })
                  .catch((error) =>
                    console.error('getUserRoles Failed to Run', error)
                  )
              }
            })
            .catch((err) =>
              console.error(
                'There was an error obtaining the auth Id ',
                err?.response?.data ?? err
              )
            )
        })

      errorHandling(admin)

      return {
        from: admin,
        to: bishop,
      }
    },
    RemoveMemberIsBishopAdminFor: async (object, args, context) => {
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

          //Check auth0 roles and remove roles 'bishopAdmin'
          axios(getUserRoles(admin.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a bishop Admin, delete auth0 profile
              if (roles.includes('bishopAdmin') && roles.length === 1) {
                axios(deleteAuthUserConfig(admin.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${admin.firstName} ${admin.lastName}`
                  )
                  //Remove Auth0 ID of Admin from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${admin.firstName} ${admin.lastName} was removed as a bishop admin`,
                    auth_id: admin.auth_id,
                    cypherParams: context.cypherParams,
                  })
                })
              }

              //If the person is a bishops admin as well as any other position, remove role bishops admin
              if (roles.includes('bishopAdmin') && roles.length > 1) {
                removeRoles(admin.auth_id, roles, authRoles.bishopAdmin.id)
              }
            })
            .then(async () =>
              //Remove Admin relationship in Neo4j DB
              session
                .run(cypher.removeBshopAdmin, {
                  adminId: admin.id,
                  bishopId: args.to.id,
                  cypherParams: context.cypherParams,
                })
                .then(console.log('Cypher query ran successfully'))
            )
            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response.data ?? error
              )
            })
        })

      errorHandling(admin)

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
                    const auth_id = res.data.user_id
                    admin.auth_id = res.data.user_id

                    const roles = []

                    assignRoles(auth_id, roles, [
                      authRoles.constituencyAdmin.id,
                    ])
                    console.log(
                      `Auth0 Account successfully created for ${admin.firstName} ${admin.lastName}`
                    )

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setTownAdmin, {
                        adminId: admin.id,
                        townId: args.to.id,
                        auth_id: admin.auth_id,
                        cypherParams: context.cypherParams,
                      })
                      .then(console.log('Cypher Query Executed Successfully'))
                      .catch((err) =>
                        console.error('Error running cypher query', err)
                      )
                  })
                  .catch((err) =>
                    console.error(
                      'Error Creating User',
                      err?.response?.data ?? err
                    )
                  )
              } else if (admin.auth_id) {
                //Check auth0 roles and add roles 'constituencyAdmin'
                axios(getUserRoles(admin.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(admin.auth_id, roles, [
                      authRoles.constituencyAdmin.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setTownAdmin, {
                        adminId: admin.id,
                        townId: args.to.id,
                        auth_id: admin.auth_id,
                        cypherParams: context.cypherParams,
                      })
                      .then(console.log('Cypher Query Executed Successfully'))
                      .catch((err) =>
                        console.error('Error running cypher query', err)
                      )
                  })
                  .catch((error) =>
                    console.error('getUserRoles Failed to Run', error)
                  )
              }
            })
            // .then(async (res) => {
            //   console.log(res)
            // })
            .catch((err) =>
              console.error(
                'There was an error obtaining the auth Id ',
                err?.response?.data ?? err
              )
            )
        })

      errorHandling(admin)

      return {
        from: admin,
        to: town,
      }
    },
    RemoveMemberIsTownAdminFor: async (object, args, context) => {
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

          //Check auth0 roles and remove roles 'constituencyAdmin'
          axios(getUserRoles(admin.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a constituency Admin, delete auth0 profile
              if (roles.includes('constituencyAdmin') && roles.length === 1) {
                axios(deleteAuthUserConfig(admin.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${admin.firstName} ${admin.lastName}`
                  )
                  //Remove Auth0 ID of Admin from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${admin.firstName} ${admin.lastName} was removed as a constituency admin`,
                    auth_id: admin.auth_id,
                    cypherParams: context.cypherParams,
                  })
                })
              }

              //If the person is a bishops admin as well as any other position, remove role bishops admin
              if (roles.includes('constituencyAdmin') && roles.length > 1) {
                removeRoles(
                  admin.auth_id,
                  roles,
                  authRoles.constituencyAdmin.id
                )
              }
            })
            .then(async () =>
              //Remove Admin relationship in Neo4j DB
              session
                .run(cypher.removeTownAdmin, {
                  adminId: admin.id,
                  townId: args.to.id,
                  cypherParams: context.cypherParams,
                })
                .then(console.log('Cypher query ran successfully'))
            )
            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response.data ?? error
              )
            })
        })

      errorHandling(admin)

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
                    const auth_id = res.data.user_id
                    admin.auth_id = res.data.user_id

                    const roles = []

                    assignRoles(auth_id, roles, [
                      authRoles.constituencyAdmin.id,
                    ])
                    console.log(
                      `Auth0 Account successfully created for ${admin.firstName} ${admin.lastName}`
                    )

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setCampusAdmin, {
                        adminId: admin.id,
                        campusId: args.to.id,
                        auth_id: admin.auth_id,
                        cypherParams: context.cypherParams,
                      })
                      .then(console.log('Cypher Query Executed Successfully'))
                      .catch((err) =>
                        console.error('Error running cypher query', err)
                      )
                  })
                  .catch((err) =>
                    console.error(
                      'Error Creating User',
                      err.response.data ?? err
                    )
                  )
              } else if (admin.auth_id) {
                //Check auth0 roles and add roles 'constituencyAdmin'
                axios(getUserRoles(admin.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(admin.auth_id, roles, [
                      authRoles.constituencyAdmin.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setCampusAdmin, {
                        adminId: admin.id,
                        campusId: args.to.id,
                        auth_id: admin.auth_id,
                        cypherParams: context.cypherParams,
                      })
                      .then(console.log('Cypher Query Executed Successfully'))
                      .catch((err) =>
                        console.error('Error running cypher query', err)
                      )
                  })
                  .catch((error) =>
                    console.error('getUserRoles Failed to Run', error)
                  )
              }
            })
            .catch((err) =>
              console.error(
                'There was an error obtaining the auth Id ',
                err?.response?.data ?? err
              )
            )
        })

      errorHandling(admin)

      return {
        from: admin,
        to: campus,
      }
    },
    RemoveMemberIsCampusAdminFor: async (object, args, context) => {
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

          //Check auth0 roles and remove roles 'constituencyAdmin'
          axios(getUserRoles(admin.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a constituency Admin, delete auth0 profile
              if (roles.includes('constituencyAdmin') && roles.length === 1) {
                axios(deleteAuthUserConfig(admin.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${admin.firstName} ${admin.lastName}`
                  )
                  //Remove Auth0 ID of Admin from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${admin.firstName} ${admin.lastName} was removed as a constituency admin`,
                    auth_id: admin.auth_id,
                    cypherParams: context.cypherParams,
                  })
                })
              }

              //If the person is a bishops admin as well as any other position, remove role bishops admin
              if (roles.includes('constituencyAdmin') && roles.length > 1) {
                removeRoles(
                  admin.auth_id,
                  roles,
                  authRoles.constituencyAdmin.id
                )
              }
            })
            .then(async () =>
              //Remove Admin relationship in Neo4j DB
              session
                .run(cypher.removeCampusAdmin, {
                  adminId: admin.id,
                  campusId: args.to.id,
                  cypherParams: context.cypherParams,
                })
                .then(console.log('Cypher query ran successfully'))
            )
            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response.data ?? error
              )
            })
        })

      errorHandling(admin)

      return {
        from: admin,
        to: campus,
      }
    },
  },
}
