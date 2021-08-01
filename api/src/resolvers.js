const dotenv = require('dotenv')
const axios = require('axios').default
const cypher = require('./resolver-queries')

dotenv.config()

let authToken
let authRoles = {}

const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

const notifyMember = (
  member,
  subject,
  body,
  whatsapp_template,
  whatsapp_placeholders
) => {
  if (whatsapp_template) {
    //Send WhatsApp or Not
    const sendWhatsAppConfig = {
      method: 'post',
      baseURL: process.env.INFOBIP_BASE_URL,
      url: `/whatsapp/1/message/template`,
      headers: {
        Authorization: `App ${process.env.INFOBIP_API_KEY}`,
      },
      data: {
        messages: [
          {
            from: '233508947494', //First Love Number
            to: member.whatsappNumber, //Member's Number
            content: {
              templateName: whatsapp_template,
              templateData: {
                body: {
                  placeholders: whatsapp_placeholders,
                },
              },
              language: 'en_GB',
            },
            // callbackData: 'Callback data',
          },
        ],
      },
    }

    axios(sendWhatsAppConfig)
      .then(() =>
        console.log(
          'WhatsApp Message Sending to',
          member.firstName + ' ' + member.lastName
        )
      )
      .catch((error) => throwErrorMsg('WhatsApp Message Failed to Send', error))
  }

  mg.messages
    .create('mg.firstlovecenter.com', {
      from: 'FL Accra Admin <no-reply@firstlovecenter.org>',
      to: [member.email, 'jaedagy@gmail.com'],
      subject: subject,
      text: body,
      // html: '<h1>Testing some Mailgun awesomness!</h1>', //HTML Version of the Message for Better Styling
    })
    .then((msg) => console.log('Mailgun API response', msg)) // logs response data
    .catch((err) => console.log('Mailgun API error', err)) // logs any error
}

const isAuth = (permittedRoles, userRoles) => {
  if (!permittedRoles.some((r) => userRoles.includes(r))) {
    throw 'You are not permitted to run this mutation'
  }
}
const noEmptyArgsValidation = (args) => {
  if (!args.length) {
    throwErrorMsg('args must be passed in array')
  }
  args.map((argument) => {
    if (!argument) {
      throwErrorMsg('Argument Cannot Be Empty')
    }
  })
}
const throwErrorMsg = (message, error) => {
  console.error(message, error?.response?.data ?? error)
  throw message
}
const errorHandling = (member) => {
  if (!member.email) {
    throw `${member.firstName} ${member.lastName} does not have a valid email address. Please add an email address and then try again`
  }
  return
  // else if (!member.pictureUrl) {
  //   throw `${member.firstName} ${member.lastName} does not have a valid picture`
  // }
}
const rearrangeMemberObject = (member, response) => {
  response.records[0].keys.forEach(
    (key, i) => (member[key] = response.records[0]._fields[i])
  )

  return member?.member || member
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
      baseURL: process.env.AUTH0_BASE_URL,
      url: `/api/v2/roles`,
      headers: {
        autho: '',
        Authorization: `Bearer ${authToken}`,
      },
    }
    console.log('auth token obtained')

    axios(getRolesConfig)
      .then((res) => {
        res.data.forEach(
          (role) =>
            (authRoles[role.name] = {
              id: role.id,
              name: role.name,
              description: role.description,
            })
        )
      })
      .catch((err) =>
        console.error('There was an error obtaining roles', err?.data ?? err)
      )
  })
  .catch((err) =>
    console.error('There was an error obtaining auth token', err?.data ?? err)
  )

const createAuthUserConfig = (member) => ({
  method: 'post',
  baseURL: process.env.AUTH0_BASE_URL,
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
    picture:
      member.pictureUrl ??
      'https://raw.githubusercontent.com/jaedag/fl-admin-portal/deploy/web-react/src/img/user.png',
    user_id: member.id,
    password: 'rAndoMLetteRs',
  },
})

const updateAuthUserConfig = (member) => ({
  method: 'patch',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${member.auth_id}`,
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
    picture:
      member.pictureUrl ??
      'https://raw.githubusercontent.com/jaedag/fl-admin-portal/deploy/web-react/src/img/user.png',
  },
})

const changePasswordConfig = (member) => ({
  method: 'post',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/tickets/password-change`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },

  data: {
    connection_id: 'con_dxnSvYK6VptkEBL0',
    email: member.email,
    mark_email_as_verified: true,
  },
})

const deleteAuthUserConfig = (memberId) => ({
  method: 'delete',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${memberId}`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
})

const getAuthIdConfig = (member) => ({
  method: 'get',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users-by-email?email=${member.email}`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
})
const getUserRoles = (memberId) => ({
  method: 'get',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${memberId}/roles`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
})
const setUserRoles = (memberId, roles) => ({
  method: 'post',
  baseURL: process.env.AUTH0_BASE_URL,
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
  baseURL: process.env.AUTH0_BASE_URL,
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
  const userRoleIds = userRoles.map((role) => authRoles[role].id)
  const nameOfRoles = Object.entries(authRoles)
    .map((role) => {
      if (rolesToAssign[0] === role[1].id) {
        return role[1].name
      }
    })
    .filter((role) => role)

  if (userRoleIds.includes(rolesToAssign[0])) {
    console.log('User already has the role ', nameOfRoles[0])
    return
  }

  //An assign roles function to simplify assigning roles with an axios request
  if (!userRoleIds.includes(rolesToAssign[0])) {
    axios(setUserRoles(userId, rolesToAssign))
      .then(console.log(nameOfRoles[0], ' Role successfully added to user'))
      .catch((err) => throwErrorMsg('There was an error assigning role', err))
  }
}
const removeRoles = (userId, userRoles, rolesToRemove) => {
  const userRoleIds = userRoles.map((role) => authRoles[role].id)

  //A remove roles function to simplify removing roles with an axios request
  if (userRoleIds.includes(rolesToRemove)) {
    axios(deleteUserRoles(userId, [rolesToRemove]))
      .then(console.log('User Role successfully removed'))
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
  const churchLower = churchType.toLowerCase()
  const servantLower = servantType.toLowerCase()
  isAuth(permittedRoles, context.auth.roles)
  noEmptyArgsValidation([args[`${churchLower}Id`], args[`${servantLower}Id`]])
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
    .run(cypher.matchChurchQuery, { id: args[`${churchLower}Id`] })
    .then(async (response) => {
      church = rearrangeMemberObject(church, response)
    })

  await session
    .run(cypher.matchMemberQuery, { id: args[`${servantLower}Id`] })
    .then(async (response) => {
      // Rearrange  member object
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
                axios(changePasswordConfig(servant)).then((res) => {
                  // Send Mail to the Person after Password Change Ticket has been generated
                  notifyMember(
                    servant,
                    'Your account has been created on the FL Admin Portal',
                    `Hi ${servant.firstName}\nYour account has just been created on the First Love Church Administrative Portal. Please set up your password by clicking ${res.data.ticket}. If you feel this is a mistake please contact your bishops admin.
          
                  Afterwards, you can login by clicking https://flcadmin.netlify.app/\n\nRegards\nThe Administrator\nFirst Love Center\nAccra`,
                    'servant_account_created',
                    [servant.firstName, res?.data?.ticket]
                  )
                })

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
                  .run(cypher[`make${churchType}${servantType}`], {
                    [`${servantLower}Id`]: servant.id,
                    [`${churchLower}Id`]: church.id,
                    auth_id: servant.auth_id,
                    auth: context.auth,
                  })
                  .then(
                    console.log(
                      `make${churchType}${servantType}`,
                      'Cypher Query Executed Successfully'
                    )
                  )
                  .catch((err) =>
                    throwErrorMsg('Error running cypher query', err)
                  )
              })
              .catch((err) => throwErrorMsg('Error Creating User', err))
          } else if (servant.auth_id) {
            //Update a user's Auth Profile with Picture and Name Details
            axios(updateAuthUserConfig(servant))
              .then(() => {
                console.log(
                  `${servant.firstName} ${servant.lastName} Auth Account Details Updated`
                )
              })
              .catch((error) =>
                throwErrorMsg(
                  `There was an error updating ${servant.firstName} ${servant.lastName}'s auth account`,
                  error
                )
              )

            //Check auth0 roles and add roles 'leaderCentre'
            axios(getUserRoles(servant.auth_id))
              .then((res) => {
                const roles = res.data.map((role) => role.name)

                assignRoles(servant.auth_id, roles, [
                  authRoles[`${servantLower}${churchType}`].id,
                ])

                const churchInEmail = church.name
                  ? `${church.name} ${church.type[0]}`
                  : `Bishop ${church.firstName} ${church.lastName}`

                //Send Email Using Mailgun
                notifyMember(
                  servant,
                  'Servanthood Status Update',
                  `Hi ${servant.firstName}\nCongratulations! You have just been made a ${churchType} ${servantType} for ${churchInEmail}.If you feel this is a mistake, please contact your bishop's admin\n\nRegards,\nThe Administrator,\nFirst Love Centre,\nAccra.`,
                  'servant_status_update',
                  [
                    servant.firstName,
                    churchType,
                    servantType,
                    church.name ?? `Bishop`,
                    church.type[0] !== 'Member'
                      ? church.type[0]
                      : `${church.firstName} ${church.lastName}`,
                  ]
                )

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
                throwErrorMsg(
                  `Unable to access the roles of the user ${servant.firstName} ${servant.lastName}`,
                  error
                )
              )
          }
        })
        .catch((err) =>
          throwErrorMsg('There was an error obtaining the auth Id ', err)
        )
    })
    .catch((err) => throwErrorMsg('', err))

  errorHandling(servant)

  //Returning the data such that it can update apollo cache
  servant[`${verb}`]?.push({
    id: church.id,
    leader: {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    },
  })

  servant[`${verb}`].map((church) => {
    church[`${servantLower}`] = {
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
  const churchLower = churchType.toLowerCase()
  const servantLower = servantType.toLowerCase()
  isAuth(permittedRoles, context.auth.roles)
  noEmptyArgsValidation([args[`${churchLower}Id`], args[`${servantLower}Id`]])

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
    .run(cypher.matchChurchQuery, { id: args[`${churchLower}Id`] })
    .then(async (response) => {
      church = rearrangeMemberObject(church, response)
    })

  await session
    .run(cypher.matchMemberQuery, { id: args[`${servantLower}Id`] })
    .then(async (response) => {
      // Rearrange member object
      servant = rearrangeMemberObject(servant, response)

      if (servant[`${verb}`].length > 1) {
        //If he leads more than one Church don't touch his Auth0 roles
        console.log(
          `${servant.firstName} ${servant.lastName} leads more than one ${churchType}`
        )
        return
      }

      if (!servant.auth_id) {
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

                //Send a Mail to That Effect
                notifyMember(
                  servant,
                  'Your Servant Account Has Been Deleted',
                  `Hi ${servant.firstName}\nYour account has been deleted from our portal. You will no longer have access to any data.\nThis is due to the fact that you have been removed as a ${churchType} ${servantType} for ${church.name} ${church.type[0]}.\nIf you feel that this is a mistake, please contact your bishops admin.\nThank you\nRegards\nThe Administrator\nFirst Love Center\nAccra`,
                  'servant_account_deleted',
                  [
                    servant.firstName,
                    churchType,
                    servantType,
                    church.name,
                    church.type[0],
                  ]
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

            //Send Email Using Mailgun
            notifyMember(
              servant,
              'ServantHood Status Update',
              `Hi ${servant.firstName}\nUnfortunately You have just been removed as a ${churchType} ${servantType} for ${church.name} ${church.type[0]}.\nRegards,\nThe Administrator,\nFirst Love Centre,\nAccra.`
            )
          }
        })
        .catch((error) => {
          throwErrorMsg(
            `Unable to access the roles of the user ${servant.firstName} ${servant.lastName}`,
            error
          )
        })
      //Relationship in Neo4j will be removed when the replacement leader is being added
    })
    .catch((err) => throwErrorMsg('', err))

  errorHandling(servant)

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
      return MakeServant(context, args, ['adminFederal'], 'Bishop', 'Admin')
    },
    RemoveBishopAdmin: async (object, args, context) => {
      return RemoveServant(context, args, ['adminFederal'], 'Bishop', 'Admin')
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
        ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
        'Bacenta',
        'Leader'
      )
    },
    RemoveBacentaLeader: async (object, args, context) => {
      return RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
        'Bacenta',
        'Leader'
      )
    },
    MakeSontaLeader: async (object, args, context) => {
      return MakeServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
        'Sonta',
        'Leader'
      )
    },
    RemoveSontaLeader: (object, args, context) => {
      return RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
        'Sonta',
        'Leader'
      )
    },
    MakeCentreLeader: async (object, args, context) => {
      return MakeServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
        'Centre',
        'Leader'
      )
    },
    RemoveCentreLeader: async (object, args, context) => {
      return RemoveServant(
        context,
        args,
        ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
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
