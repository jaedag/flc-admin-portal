const dotenv = require('dotenv')
const axios = require('axios').default
const cypher = require('./resolver-queries')

dotenv.config()

const baseURL = 'https://flcadmin.us.auth0.com/'
let authToken
let authRoles = {}

const isAuth = (permittedRoles, userRoles) => {
  if (!permittedRoles.some((r) => userRoles.includes(r))) {
    throw 'You are not permitted to run this mutation'
  }
}
const throwErrorMsg = (message, error) => {
  console.error(message, error?.response?.data ?? error)
  throw 'There was a problem making your changes, please try again'
}
const errorHandling = (member) => {
  if (!member.email) {
    throw `${member.firstName} ${member.lastName} does not have a valid email address`
  } else if (!member.pictureUrl) {
    throw `${member.firstName} ${member.lastName} does not have a valid picture`
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
      .catch((err) => throwErrorMsg('There was an error assigning role', err))
  }
}
const removeRoles = (userId, userRoles, rolesToRemove) => {
  const userRoleIds = userRoles.map((role) => authRoles[role].id)

  //A remove roles function to simplify removing roles with an axios request
  if (userRoleIds.includes(rolesToRemove)) {
    axios(deleteUserRoles(userId, [rolesToRemove]))
      .then(console.log('User Role sucessfully removed'))
      .catch((err) => throwErrorMsg('There was an error removing role', err))
  }
}

const MakeServant = async (
  context,
  args,
  permittedRoles,
  churchType,
  servantType
) => {
  isAuth(permittedRoles, context.auth.roles)

  const churchLower = churchType.toLowerCase()
  const servantLower = servantType.toLowerCase()
  let verb
  if (servantType === 'Leader') {
    verb = `leads${churchType}`
  }

  if (servantType === 'Admin') {
    verb = `isAdminFor${churchType}`
  }

  const session = context.driver.session()
  let servant = {}
  let church = { id: args[`${churchLower}Id`] }

  await session
    .run(cypher.matchMemberQuery, { id: args[`${servantLower}Id`] })
    .then(async (response) => {
      // Rearrange member object
      servant = rearrangeMemberObject(servant, response)
      errorHandling(servant)

      //Check for AuthID of servant
      axios(getAuthIdConfig(servant))
        .then(async (res) => {
          servant.auth_id = res.data[0]?.user_id

          if (!servant.auth_id) {
            //If servant Does Not Have Auth0 Profile, Create One
            axios(createAuthUserConfig(servant))
              .then((res) => {
                const auth_id = res.data.user_id
                servant.auth_id = res.data.user_id

                const roles = []

                assignRoles(auth_id, roles, [
                  authRoles[`${servantLower}${churchType}`].id,
                ])
                console.log(
                  `Auth0 Account successfully created for ${servant.firstName} ${servant.lastName}`
                )

                //Write Auth0 ID of Leader to Neo4j DB
                session
                  .run(cypher[`make${churchType}${servant}`], {
                    [`${servantLower}Id`]: servant.id,
                    [`${churchLower}Id`]: church.id,
                    auth_id: servant.auth_id,
                    auth: context.auth,
                  })
                  .then(console.log('Cypher Query Executed Successfully'))
                  .catch((err) =>
                    throwErrorMsg('Error running cypher query', err)
                  )
              })
              .catch((err) => throwErrorMsg('Error Creating User', err))
          } else if (servant.auth_id) {
            //Check auth0 roles and add roles 'leaderCentre'
            axios(getUserRoles(servant.auth_id))
              .then((res) => {
                const roles = res.data.map((role) => role.name)

                assignRoles(servant.auth_id, roles, [
                  authRoles[`${servantLower}${churchType}`].id,
                ])

                //Write Auth0 ID of Admin to Neo4j DB
                session
                  .run(cypher[`make${churchType}${servantType}`], {
                    [`${servantLower}Id`]: servant.id,
                    [`${churchLower}Id`]: church.id,
                    auth_id: servant.auth_id,
                    auth: context.auth,
                  })
                  .then(console.log('Cypher Query Executed Successfully'))
                  .catch((err) =>
                    throwErrorMsg('Error running cypher query', err)
                  )
              })
              .catch((error) =>
                throwErrorMsg('getUserRoles Failed to Run', error)
              )
          }
        })
        .catch((err) =>
          throwErrorMsg('There was an error obtaining the auth Id ', err)
        )
    })
    .catch((err) => throwErrorMsg('', err))

  //Returning the data such that it can update apollo cache
  servant[`${verb}`].push({
    id: church.id,
    leader: {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    },
  })

  servant[`${verb}`].map((church) => {
    church.leader = {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    }
  })

  return servant
}
const RemoveServant = async (
  context,
  args,
  permittedRoles,
  churchType,
  servantType
) => {
  isAuth(permittedRoles, context.auth.roles)

  const churchLower = churchType.toLowerCase()
  const servantLower = servantType.toLowerCase()
  let verb
  if (servantType === 'Leader') {
    verb = `leads${churchType}`
  }

  if (servantType === 'Admin') {
    verb = `isAdminFor${churchType}`
  }

  const session = context.driver.session()
  let servant = {}
  let church = { id: args[`${churchLower}Id`] }

  await session
    .run(cypher.matchMemberQuery, { id: args[`${servantLower}Id`] })
    .then(async (response) => {
      // Rearrange member object
      servant = rearrangeMemberObject(servant, response)
      errorHandling(servant)

      if (servant[`${verb}`].length > 1) {
        //If he leads more than one Church don't touch his Auth0 roles
        return
      }

      //Check auth0 roles and remove roles 'leaderCentre'
      axios(getUserRoles(servant.auth_id))
        .then((res) => {
          const roles = res.data.map((role) => role.name)

          //If the person is only a constituency Admin, delete auth0 profile
          if (roles.includes(`leader${churchType}`) && roles.length === 1) {
            axios(deleteAuthUserConfig(servant.auth_id))
              .then(async () => {
                console.log(
                  `Auth0 Account successfully deleted for ${servant.firstName} ${servant.lastName}`
                )
                //Remove Auth0 ID of Leader from Neo4j DB
                session.run(cypher.removeMemberAuthId, {
                  log: `${servant.firstName} ${servant.lastName} was removed as a ${churchType} ${servantType}`,
                  auth_id: servant.auth_id,
                  auth: context.auth,
                })
              })
              .catch((error) => {
                throwErrorMsg('Cypher Query Failed To Run', error)
              })
          }

          //If the person is a centre leader as well as any other position, remove role centre leader
          if (roles.includes(`leader${churchType}`) && roles.length > 1) {
            removeRoles(
              servant.auth_id,
              roles,
              authRoles[`${servantLower}${churchType}`].id
            )
          }
        })
        .catch((error) => {
          throwErrorMsg('getUserRoles Failed to Run', error)
        })
      //Relationship inn Neo4j will be removed when the replacement leader is being added
    })
    .catch((err) => throwErrorMsg('', err))

  //Returning the data such that it can update apollo cache
  servant[`${verb}`].push({
    id: church.id,
    leader: {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    },
  })

  servant[`${verb}`].map((church) => {
    church.leader = {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    }
  })

  return servant
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
  Centre: {
    bacentaServiceAggregate: async (obj, args, context) => {
      let serviceAggregates = []

      const session = context.driver.session()
      await session
        .run(cypher.getCentreBacentaServiceAggregates, obj)
        .then((response) =>
          response.records.map((record) => {
            let serviceAggregate = {}
            record.keys.forEach(
              (key, i) => (serviceAggregate[key] = record._fields[i])
            )
            serviceAggregates.push(serviceAggregate)
          })
        )
        .catch((error) => console.log(error))

      return serviceAggregates
    },
  },
  Campus: {
    componentServiceAggregate: async (obj, args, context) => {
      let serviceAggregates = []

      const session = context.driver.session()
      await session
        .run(cypher.getCampusTownServiceAggregates, obj)
        .then((response) =>
          response.records.map((record) => {
            let serviceAggregate = {}

            record.keys.forEach(
              (key, i) => (serviceAggregate[key] = record._fields[i])
            )
            serviceAggregates.push(serviceAggregate)
          })
        )
        .catch((error) => console.log(error))

      return serviceAggregates
    },
  },
  Town: {
    componentServiceAggregate: async (obj, args, context) => {
      let serviceAggregates = []

      const session = context.driver.session()
      await session
        .run(cypher.getCampusTownServiceAggregates, obj)
        .then((response) =>
          response.records.map((record) => {
            let serviceAggregate = {}

            record.keys.forEach(
              (key, i) => (serviceAggregate[key] = record._fields[i])
            )
            serviceAggregates.push(serviceAggregate)
          })
        )
        .catch((error) => console.log(error))

      return serviceAggregates
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
        .run(cypher.matchMemberQuery, { id: args.adminId })
        .then(async (response) => {
          //Rearrange member object
          admin = rearrangeMemberObject(admin, response)
          errorHandling(admin)

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
                        throwErrorMsg('Error running cypher query', err)
                      )
                  })
                  .catch((err) => throwErrorMsg('Error Creating User', err))
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
                        throwErrorMsg('Error running cypher query', err)
                      )
                  })
                  .catch((error) =>
                    throwErrorMsg('getUserRoles Failed to Run', error)
                  )
              }
            })
            .catch((err) => {
              throwErrorMsg('There was an error obtaining the auth Id ', err)
            })
        })
        .catch((err) => throwErrorMsg('', err))

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
          errorHandling(admin)

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
              throwErrorMsg('getUserRoles Failed to Run', error)
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
                .catch((err) =>
                  throwErrorMsg(
                    'There was a problem connecting to the database',
                    err
                  )
                )
            )
        })
        .catch((err) => throwErrorMsg('', err))

      return admin
    },
    MakeTownAdmin: async (object, args, context) => {
      return MakeServant(
        context,
        args,
        ['adminFederal', 'adminBishop'],
        'Town',
        'Admin'
      )
    },
    RemoveTownAdmin: async (object, args, context) => {
      return RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop'],
        'Town',
        'Admin'
      )
    },
    MakeCampusAdmin: async (object, args, context) => {
      return MakeServant(
        context,
        args,
        ['adminFederal', 'adminBishop'],
        'Campus',
        'Admin'
      )
    },
    RemoveCampusAdmin: async (object, args, context) => {
      return RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop'],
        'Campus',
        'Admin'
      )
    },
    MakeBacentaLeader: async (object, args, context) => {
      return MakeServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminConstituency'],
        'Bacenta',
        'Leader'
      )
    },
    RemoveBacentaLeader: async (object, args, context) => {
      return RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminConstituency'],
        'Bacenta',
        'Leader'
      )
    },
    MakeSontaLeader: async (object, args, context) => {
      return MakeServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminConstituency'],
        'Sonta',
        'Leader'
      )
    },
    RemoveSontaLeader: (object, args, context) => {
      return RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminConstituency'],
        'Sonta',
        'Leader'
      )
    },
    MakeCentreLeader: async (object, args, context) => {
      MakeServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminConstituency'],
        'Centre',
        'Leader'
      )
    },
    RemoveCentreLeader: async (object, args, context) => {
      RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminConstituency'],
        'Centre',
        'Leader'
      )
    },
    MakeCampusLeader: async (object, args, context) => {
      return MakeServant(
        context,
        args,
        ['adminFederal', 'adminBishop'],
        'Campus',
        'Leader'
      )
    },
    RemoveCampusLeader: async (object, args, context) => {
      return RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop'],
        'Campus',
        'Leader'
      )
    },
    MakeTownLeader: async (object, args, context) => {
      return MakeServant(
        context,
        args,
        ['adminFederal', 'adminBishop'],
        'Town',
        'Leader'
      )
    },
    RemoveTownLeader: async (object, args, context) => {
      return RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop'],
        'Town',
        'Leader'
      )
    },
  },
}
