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
const isAuth = (permittedRoles, userRoles) => {
  if (!permittedRoles.some((r) => userRoles.includes(r))) {
    throw 'You are not permitted to run this mutation'
  }
}
const rearrangeMemberObject = (member, response) => {
  response.records[0].keys.forEach(
    (key, i) => (member[key] = response.records[0]._fields[i])
  )
  return member.member
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
    console.error('There was an error obtaining auth token', err?.data ?? err)
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

  Member: {
    fullName: (obj) => {
      return `${obj.firstName} ${obj.lastName}`
    },
  },

  Mutation: {
    MakeBishopAdmin: async (object, args, context) => {
      const permittedRoles = ['adminFederal']
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let admin = {}
      let bishop = { id: args.bishopId }

      await session
        .run(cypher.matchMemberQuery, args)
        .then(async (response) => {
          //Rearrange member object
          admin = rearrangeMemberObject(admin, response)

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

                    assignRoles(auth_id, roles, [authRoles.adminBishop.id])
                    console.log(
                      `Auth0 Account successfully created for ${admin.firstName} ${admin.lastName}`
                    )

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setBishopAdmin, {
                        adminId: admin.id,
                        bishopId: args.bishopId,
                        auth_id: admin.auth_id,
                        auth: context.auth,
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
                //Check auth0 roles and add roles 'adminBishop'
                axios(getUserRoles(admin.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(admin.auth_id, roles, [
                      authRoles.adminBishop.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setBishopAdmin, {
                        adminId: admin.id,
                        bishopId: args.bishopId,
                        auth_id: admin.auth_id,
                        auth: context.auth,
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

      return admin
    },
    RemoveBishopAdmin: async (object, args, context) => {
      const permittedRoles = ['adminFederal']
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let admin = {}

      await session
        .run(cypher.matchMemberQuery, { id: args.adminId })
        .then(async (response) => {
          //Rearrange member object
          admin = rearrangeMemberObject(admin, response)

          //Check auth0 roles and remove roles 'adminBishop'
          axios(getUserRoles(admin.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a bishop Admin, delete auth0 profile
              if (roles.includes('adminBishop') && roles.length === 1) {
                axios(deleteAuthUserConfig(admin.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${admin.firstName} ${admin.lastName}`
                  )
                  //Remove Auth0 ID of Admin from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${admin.firstName} ${admin.lastName} was removed as a bishop admin`,
                    auth_id: admin.auth_id,
                    auth: context.auth,
                  })
                })
              }

              //If the person is a bishops admin as well as any other position, remove role bishops admin
              if (roles.includes('adminBishop') && roles.length > 1) {
                removeRoles(admin.auth_id, roles, authRoles.adminBishop.id)
              }
            })
            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response?.data ?? error
              )
            })
            .then(async () =>
              //Remove Admin relationship in Neo4j DB
              session
                .run(cypher.removeBishopAdmin, {
                  adminId: admin.id,
                  bishopId: args.bishopId,
                  auth: context.auth,
                })
                .then(console.log('Cypher query ran successfully'))
            )
        })

      errorHandling(admin)

      return admin
    },
    MakeTownAdmin: async (object, args, context) => {
      const permittedRoles = ['adminFederal', 'adminBishop']
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let admin = {}
      let town = { id: args.townId }

      await session
        .run(cypher.matchMemberQuery, { id: args.adminId })
        .then(async (response) => {
          //Rearrange member object
          admin = rearrangeMemberObject(admin, response)

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
                      authRoles.adminConstituency.id,
                    ])
                    console.log(
                      `Auth0 Account successfully created for ${admin.firstName} ${admin.lastName}`
                    )

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setTownAdmin, {
                        adminId: admin.id,
                        townId: args.townId,
                        auth_id: admin.auth_id,
                        auth: context.auth,
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
                //Check auth0 roles and add roles 'adminConstituency'
                axios(getUserRoles(admin.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(admin.auth_id, roles, [
                      authRoles.adminConstituency.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setTownAdmin, {
                        adminId: admin.id,
                        townId: town.id,
                        auth_id: admin.auth_id,
                        auth: context.auth,
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

      return admin
    },
    RemoveTownAdmin: async (object, args, context) => {
      const permittedRoles = ['adminFederal', 'adminBishop']
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let admin = {}
      let town = { id: args.townId }

      await session
        .run(cypher.matchMemberQuery, { id: args.adminId })
        .then(async (response) => {
          //Rearrange member object
          admin = rearrangeMemberObject(admin, response)

          //Check auth0 roles and remove roles 'adminConstituency'
          axios(getUserRoles(admin.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a constituency Admin, delete auth0 profile
              if (roles.includes('adminConstituency') && roles.length === 1) {
                axios(deleteAuthUserConfig(admin.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${admin.firstName} ${admin.lastName}`
                  )
                  //Remove Auth0 ID of Admin from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${admin.firstName} ${admin.lastName} was removed as a constituency admin`,
                    auth_id: admin.auth_id,
                    auth: context.auth,
                  })
                })
              }

              //If the person is a bishops admin as well as any other position, remove role bishops admin
              if (roles.includes('adminConstituency') && roles.length > 1) {
                removeRoles(
                  admin.auth_id,
                  roles,
                  authRoles.adminConstituency.id
                )
              }
            })

            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response.data ?? error
              )
            })
            .then(async () =>
              //Remove Admin relationship in Neo4j DB
              session
                .run(cypher.removeTownAdmin, {
                  adminId: admin.id,
                  townId: town.id,
                  auth: context.auth,
                })
                .then(console.log('Cypher query ran successfully'))
            )
        })

      errorHandling(admin)

      return admin
    },
    MakeCampusAdmin: async (object, args, context) => {
      const permittedRoles = ['adminFederal', 'adminBishop']
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let admin = {}
      let campus = { id: args.campusId }

      await session
        .run(cypher.matchMemberQuery, { id: args.adminId })
        .then(async (response) => {
          //Rearrange member object
          admin = rearrangeMemberObject(admin, response)

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
                      authRoles.adminConstituency.id,
                    ])
                    console.log(
                      `Auth0 Account successfully created for ${admin.firstName} ${admin.lastName}`
                    )

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setCampusAdmin, {
                        adminId: admin.id,
                        campusId: campus.id,
                        auth_id: admin.auth_id,
                        auth: context.auth,
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
                //Check auth0 roles and add roles 'adminConstituency'
                axios(getUserRoles(admin.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(admin.auth_id, roles, [
                      authRoles.adminConstituency.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.setCampusAdmin, {
                        adminId: admin.id,
                        campusId: args.campusId,
                        auth_id: admin.auth_id,
                        auth: context.auth,
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

      return admin
    },
    RemoveCampusAdmin: async (object, args, context) => {
      const permittedRoles = ['adminFederal', 'adminBishop']
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let admin = {}
      let campus = { id: args.campusId }

      await session
        .run(cypher.matchMemberQuery, { id: args.adminId })
        .then(async (response) => {
          //Rearrange member object
          admin = rearrangeMemberObject(admin, response)

          //Check auth0 roles and remove roles 'adminConstituency'
          axios(getUserRoles(admin.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a constituency Admin, delete auth0 profile
              if (roles.includes('adminConstituency') && roles.length === 1) {
                axios(deleteAuthUserConfig(admin.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${admin.firstName} ${admin.lastName}`
                  )
                  //Remove Auth0 ID of Admin from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${admin.firstName} ${admin.lastName} was removed as a constituency admin`,
                    auth_id: admin.auth_id,
                    auth: context.auth,
                  })
                })
              }

              //If the person is a bishops admin as well as any other position, remove role bishops admin
              if (roles.includes('adminConstituency') && roles.length > 1) {
                removeRoles(
                  admin.auth_id,
                  roles,
                  authRoles.adminConstituency.id
                )
              }
            })
            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response.data ?? error
              )
            })
            .then(async () =>
              //Remove Admin relationship in Neo4j DB
              session
                .run(cypher.removeCampusAdmin, {
                  adminId: admin.id,
                  campusId: campus.id,
                  auth: context.auth,
                })
                .then(console.log('Cypher query ran successfully'))
            )
        })

      errorHandling(admin)

      return admin
    },
    MakeBacentaLeader: async (object, args, context) => {
      const permittedRoles = [
        'adminFederal',
        'adminBishop',
        'adminConstituency',
      ]
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let leader = {}
      let bacenta = { id: args.bacentaId }

      await session
        .run(cypher.matchMemberQuery, { id: args.leaderId })
        .then(async (response) => {
          // Rearrange member
          leader = rearrangeMemberObject(leader, response)

          //Check for AuthID of Leader
          axios(getAuthIdConfig(leader))
            .then(async (res) => {
              leader.auth_id = res.data[0]?.user_id

              if (!leader.auth_id) {
                //If leader Does Not Have Auth0 Profile, Create One
                axios(createAuthUserConfig(leader))
                  .then((res) => {
                    const auth_id = res.data.user_id
                    leader.auth_id = res.data.user_id

                    const roles = []

                    assignRoles(auth_id, roles, [authRoles.leaderBacenta.id])
                    console.log(
                      `Auth0 Account successfully created for ${leader.firstName} ${leader.lastName}`
                    )

                    //Write Auth0 ID of Leader to Neo4j DB
                    session
                      .run(cypher.makeBacentaLeader, {
                        leaderId: leader.id,
                        bacentaId: bacenta.id,
                        auth_id: leader.auth_id,
                        auth: context.auth,
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
              } else if (leader.auth_id) {
                //Check auth0 roles and add roles 'leaderBacenta'
                axios(getUserRoles(leader.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(leader.auth_id, roles, [
                      authRoles.leaderBacenta.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.makeBacentaLeader, {
                        leaderId: leader.id,
                        bacentaId: bacenta.id,
                        auth_id: leader.auth_id,
                        auth: context.auth,
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

      errorHandling(leader)

      return leader
    },
    RemoveBacentaLeader: async (object, args, context) => {
      const permittedRoles = [
        'adminFederal',
        'adminBishop',
        'adminConstituency',
      ]

      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let leader = {}
      let bacenta = { id: args.bacentaId }

      await session
        .run(cypher.matchMemberQuery, { id: args.leaderId })
        .then(async (response) => {
          // Rearrange member object
          leader = rearrangeMemberObject(leader, response)

          if (leader.leadsBacenta.length > 1) {
            //If he leads more than one bacenta don't touch his Auth0 roles
            return
          }

          //Check auth0 roles and remove roles 'leaderBacenta'
          axios(getUserRoles(leader.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a bacentaLeader, delete auth0 profile
              if (roles.includes('leaderBacenta') && roles.length === 1) {
                axios(deleteAuthUserConfig(leader.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${leader.firstName} ${leader.lastName}`
                  )
                  //Remove Auth0 ID of Leader from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${leader.firstName} ${leader.lastName} was removed as a bacenta leader`,
                    auth_id: leader.auth_id,
                    auth: context.auth,
                  })
                })
              }

              //If the person is a bacenta leader as well as any other position, remove role bacenta leader
              if (roles.includes('leaderBacenta') && roles.length > 1) {
                removeRoles(leader.auth_id, roles, authRoles.leaderBacenta.id)
              }
            })
            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response.data ?? error
              )
            })
          //Relationship inn Neo4j will be removed when the replacement leader is being added
        })

      errorHandling(leader)

      return leader
    },
    MakeCentreLeader: async (object, args, context) => {
      const permittedRoles = [
        'adminFederal',
        'adminBishop',
        'adminConstituency',
      ]
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let leader = {}
      let centre = { id: args.centreId }

      await session
        .run(cypher.matchMemberQuery, { id: args.leaderId })
        .then(async (response) => {
          // Rearrange member object
          leader = rearrangeMemberObject(leader, response)

          //Check for AuthID of Leader
          axios(getAuthIdConfig(leader))
            .then(async (res) => {
              leader.auth_id = res.data[0]?.user_id

              if (!leader.auth_id) {
                //If leader Does Not Have Auth0 Profile, Create One
                axios(createAuthUserConfig(leader))
                  .then((res) => {
                    const auth_id = res.data.user_id
                    leader.auth_id = res.data.user_id

                    const roles = []

                    assignRoles(auth_id, roles, [authRoles.leadsCampus.id])
                    console.log(
                      `Auth0 Account successfully created for ${leader.firstName} ${leader.lastName}`
                    )

                    //Write Auth0 ID of Leader to Neo4j DB
                    session
                      .run(cypher.makeCentreLeader, {
                        leaderId: leader.id,
                        centreId: centre.id,
                        auth_id: leader.auth_id,
                        auth: context.auth,
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
              } else if (leader.auth_id) {
                //Check auth0 roles and add roles 'leaderCentre'
                axios(getUserRoles(leader.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(leader.auth_id, roles, [
                      authRoles.leaderCentre.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.makeCentreLeader, {
                        leaderId: leader.id,
                        centreId: centre.id,
                        auth_id: leader.auth_id,
                        auth: context.auth,
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

      errorHandling(leader)

      return leader
    },
    RemoveCentreLeader: async (object, args, context) => {
      const permittedRoles = [
        'adminFederal',
        'adminBishop',
        'adminConstituency',
      ]
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let leader = {}
      let centre = { id: args.centreId }

      await session
        .run(cypher.matchMemberQuery, { id: args.leaderId })
        .then(async (response) => {
          // Rearrange member object
          leader = rearrangeMemberObject(leader, response)

          if (leader.leadsCentre.length > 1) {
            //If he leads more than one Centre don't touch his Auth0 roles
            return
          }

          //Check auth0 roles and remove roles 'leaderCentre'
          axios(getUserRoles(leader.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a constituency Admin, delete auth0 profile
              if (roles.includes('leaderCentre') && roles.length === 1) {
                axios(deleteAuthUserConfig(leader.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${leader.firstName} ${leader.lastName}`
                  )
                  //Remove Auth0 ID of Leader from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${leader.firstName} ${leader.lastName} was removed as a centre leader`,
                    auth_id: leader.auth_id,
                    auth: context.auth,
                  })
                })
              }

              //If the person is a centre leader as well as any other position, remove role centre leader
              if (roles.includes('leaderCentre') && roles.length > 1) {
                removeRoles(leader.auth_id, roles, authRoles.leaderCentre.id)
              }
            })
            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response.data ?? error
              )
            })
          //Relationship inn Neo4j will be removed when the replacement leader is being added
        })

      errorHandling(leader)

      return leader
    },
    MakeCampusLeader: async (object, args, context) => {
      const permittedRoles = [
        'adminFederal',
        'adminBishop',
        'adminConstituency',
      ]
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let leader = {}
      let campus = { id: args.campusId }

      await session
        .run(cypher.matchMemberQuery, { id: args.leaderId })
        .then(async (response) => {
          // Rearrange member object
          leader = rearrangeMemberObject(leader, response)

          //Check for AuthID of Leader
          axios(getAuthIdConfig(leader))
            .then(async (res) => {
              leader.auth_id = res.data[0]?.user_id

              if (!leader.auth_id) {
                //If leader Does Not Have Auth0 Profile, Create One
                axios(createAuthUserConfig(leader))
                  .then((res) => {
                    const auth_id = res.data.user_id
                    leader.auth_id = res.data.user_id

                    const roles = []

                    assignRoles(auth_id, roles, [
                      authRoles.leaderConstituency.id,
                    ])
                    console.log(
                      `Auth0 Account successfully created for ${leader.firstName} ${leader.lastName}`
                    )

                    //Write Auth0 ID of Leader to Neo4j DB
                    session
                      .run(cypher.makeCampusLeader, {
                        leaderId: leader.id,
                        campusId: campus.id,
                        auth_id: leader.auth_id,
                        auth: context.auth,
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
              } else if (leader.auth_id) {
                //Check auth0 roles and add roles 'leaderConstituency'
                axios(getUserRoles(leader.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(leader.auth_id, roles, [
                      authRoles.leaderConstituency.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.makeCampusLeader, {
                        leaderId: leader.id,
                        campusId: campus.id,
                        auth_id: leader.auth_id,
                        auth: context.auth,
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

      errorHandling(leader)

      return leader
    },
    RemoveCampusLeader: async (object, args, context) => {
      const permittedRoles = [
        'adminFederal',
        'adminBishop',
        'adminConstituency',
      ]
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let leader = {}
      let campus = { id: args.campusId }

      await session
        .run(cypher.matchMemberQuery, { id: args.leaderId })
        .then(async (response) => {
          leader = rearrangeMemberObject(leader, response)

          if (leader.leadsCampus.length > 1) {
            //If he leads more than one Campus don't touch his Auth0 roles
            return
          }

          //Check auth0 roles and remove roles 'leaderConstituency'
          axios(getUserRoles(leader.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a constituency Admin, delete auth0 profile
              if (roles.includes('leaderConstituency') && roles.length === 1) {
                axios(deleteAuthUserConfig(leader.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${leader.firstName} ${leader.lastName}`
                  )
                  //Remove Auth0 ID of Leader from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${leader.firstName} ${leader.lastName} was removed as a Campus CO`,
                    auth_id: leader.auth_id,
                    auth: context.auth,
                  })
                })
              }

              //If the person is a Campus leader as well as any other position, remove role Campus leader
              if (roles.includes('leaderConstituency') && roles.length > 1) {
                removeRoles(leader.auth_id, roles, authRoles.leadsCampus.id)
              }
            })
            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response.data ?? error
              )
            })
          //Relationship inn Neo4j will be removed when the replacement leader is being added
        })

      errorHandling(leader)

      return leader
    },
    MakeTownLeader: async (object, args, context) => {
      const permittedRoles = [
        'adminFederal',
        'adminBishop',
        'adminConstituency',
      ]
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let leader = {}
      let town = { id: args.townId }

      await session
        .run(cypher.matchMemberQuery, { id: args.leaderId })
        .then(async (response) => {
          leader = rearrangeMemberObject(leader, response)

          //Check for AuthID of Leader
          axios(getAuthIdConfig(leader))
            .then(async (res) => {
              leader.auth_id = res.data[0]?.user_id

              if (!leader.auth_id) {
                //If leader Does Not Have Auth0 Profile, Create One
                axios(createAuthUserConfig(leader))
                  .then((res) => {
                    const auth_id = res.data.user_id
                    leader.auth_id = res.data.user_id

                    const roles = []

                    assignRoles(auth_id, roles, [
                      authRoles.leaderConstituency.id,
                    ])
                    console.log(
                      `Auth0 Account successfully created for ${leader.firstName} ${leader.lastName}`
                    )

                    //Write Auth0 ID of Leader to Neo4j DB
                    session
                      .run(cypher.makeTownLeader, {
                        leaderId: leader.id,
                        townId: town.id,
                        auth_id: leader.auth_id,
                        auth: context.auth,
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
              } else if (leader.auth_id) {
                //Check auth0 roles and add roles 'leaderConstituency'
                axios(getUserRoles(leader.auth_id))
                  .then((res) => {
                    const roles = res.data.map((role) => role.name)

                    assignRoles(leader.auth_id, roles, [
                      authRoles.leaderConstituency.id,
                    ])

                    //Write Auth0 ID of Admin to Neo4j DB
                    session
                      .run(cypher.makeTownLeader, {
                        leaderId: leader.id,
                        townId: town.id,
                        auth_id: leader.auth_id,
                        auth: context.auth,
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

      errorHandling(leader)

      return leader
    },
    RemoveTownLeader: async (object, args, context) => {
      const permittedRoles = [
        'adminFederal',
        'adminBishop',
        'adminConstituency',
      ]
      isAuth(permittedRoles, context.auth.roles)

      const session = context.driver.session()
      let leader = {}
      let town = { id: args.townId }

      await session
        .run(cypher.matchMemberQuery, { id: args.leaderId })
        .then(async (response) => {
          leader = rearrangeMemberObject(leader, response)

          if (leader.leadsTown.length > 1) {
            //If he leads more than one Town don't touch his Auth0 roles
            return
          }

          //Check auth0 roles and remove roles 'leaderConstituency'
          axios(getUserRoles(leader.auth_id))
            .then((res) => {
              const roles = res.data.map((role) => role.name)

              //If the person is only a constituency Admin, delete auth0 profile
              if (roles.includes('leaderConstituency') && roles.length === 1) {
                axios(deleteAuthUserConfig(leader.auth_id)).then(async () => {
                  console.log(
                    `Auth0 Account successfully deleted for ${leader.firstName} ${leader.lastName}`
                  )
                  //Remove Auth0 ID of Leader from Neo4j DB
                  session.run(cypher.removeMemberAuthId, {
                    log: `${leader.firstName} ${leader.lastName} was removed as a Town CO`,
                    auth_id: leader.auth_id,
                    auth: context.auth,
                  })
                })
              }

              //If the person is a Town leader as well as any other position, remove role Town leader
              if (roles.includes('leaderConstituency') && roles.length > 1) {
                removeRoles(leader.auth_id, roles, authRoles.leadsCampus.id)
              }
            })
            .catch((error) => {
              console.error(
                'getUserRoles Failed to Run',
                error.response.data ?? error
              )
            })
          //Relationship in Neo4j will be removed when the replacement leader is being added
        })

      errorHandling(leader)

      return leader
    },
  },
}
