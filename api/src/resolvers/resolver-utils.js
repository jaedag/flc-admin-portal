export const isAuth = (permittedRoles, userRoles) => {
  if (!permittedRoles.some((r) => userRoles.includes(r))) {
    throw 'You are not permitted to run this mutation'
  }
}

const throwErrorMsg = (message, error) => {
  let errorVar = ''

  if (error) {
    errorVar = error
  }
  if (error?.response?.data?.message) {
    errorVar = error?.response?.data?.message
  }

  // eslint-disable-next-line no-console
  console.error(message, errorVar)
  throw `${message} ${errorVar}`
}

export const noEmptyArgsValidation = (args) => {
  if (!args.length) {
    throwErrorMsg('args must be passed in array')
  }

  args.map((argument, index) => {
    if (!argument) {
      throwErrorMsg(`${args[index - 1]} Argument Cannot Be Empty`)
    }
  })
}

export const errorHandling = (member) => {
  if (!member.email) {
    throw `${member.firstName} ${member.lastName} does not have a valid email address. Please add an email address and then try again`
  }
  return
}

export const rearrangeCypherObject = (response) => {
  let member = {}

  response.records[0]?.keys.forEach(
    (key, i) => (member[key] = response.records[0]._fields[i])
  )

  return member?.member || member
}
export const parseForCache = (servant, church, verb, role) => {
  //Returning the data such that it can update apollo cache
  servant[`${verb}`].push({
    id: church.id,
    name: church.name,
    [`${role}`]: {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    },
  })

  servant[`${verb}`].map((church) => {
    church[`${role}`] = {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    }
  })

  return servant
}
