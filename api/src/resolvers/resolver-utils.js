const servantCypher = require('./cypher/servant-cypher')

export const isAuth = (permittedRoles, userRoles) => {
  if (!permittedRoles.some(r => userRoles.includes(r))) {
    throw 'You are not permitted to run this mutation'
  }
}

export const throwErrorMsg = (message, error) => {
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

export const noEmptyArgsValidation = args => {
  if (!args.length) {
    throwErrorMsg('args must be passed in array')
  }

  args.map((argument, index) => {
    if (!argument) {
      throwErrorMsg(`${args[index - 1]} Argument Cannot Be Empty`)
    }
  })
}

export const errorHandling = member => {
  if (!member.email) {
    throw `${member.firstName} ${member.lastName} does not have a valid email address. Please add an email address and then try again`
  }
  return
}

export const rearrangeCypherObject = response => {
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

  servant[`${verb}`].map(church => {
    church[`${role}`] = {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    }
  })

  return servant
}
export const parseForCache_Removal = (servant, removedChurch, verb, role) => {
  //Returning the data such that it can update apollo cache
  servant[`${verb}`] = servant[`${verb}`].filter(church => {
    if (church.id === removedChurch.id) {
      return false
    }
    return true
  })

  servant[`${verb}`].map(church => {
    church[`${role}`] = {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    }
  })

  return servant
}

export const nextHigherChurch = churchLevel => {
  switch (churchLevel) {
    case 'Fellowship':
      return 'Bacenta'
    case 'Bacenta':
      return 'Constituency'
    case 'Constituency':
      return 'Council'
    case 'Council':
      return 'Stream'
    case 'Stream':
      return 'Gathering Service'
    default:
      break
  }
}

export const churchInEmail = church => {
  if (church.type[0] === 'ClosedFellowship') {
    return `${church.name} Fellowship which has been closed`
  }

  if (church.type[0] === 'ClosedBacenta') {
    return `${church.name} Bacenta which has been closed`
  }

  return `${church.name} ${church.type[0]}`
}
export const servantInEmail = servant => {
  return servant
}

export const historyRecordString = ({
  servant,
  oldServant,
  church,
  churchType,
  servantType,
  removed,
  args,
  higherChurch,
}) => {
  if (removed) {
    return `${servant.firstName} ${servant.lastName} was removed as the ${churchType} ${servantType} for  ${church.name} ${churchType}`
  }

  if (args.oldLeaderId || args.oldAdminId) {
    return `${servant.firstName} ${servant.lastName} became the ${servantType} of ${church.name} ${churchType} replacing ${oldServant.firstName} ${oldServant.lastName}`
  }

  if (args.adminId) {
    return `${servant.firstName} ${servant.lastName} became the admin for ${church.name} ${churchType}`
  }

  return `${servant.firstName} ${servant.lastName} started ${church.name} ${churchType} under ${higherChurch.name} ${higherChurch.type}`
}

export const makeServantCypher = async (
  context,
  args,
  churchType,
  servantType,
  servant,
  oldServant,
  church
) => {
  let servantLower = servantType.toLowerCase()
  if (servantType === 'ArrivalsAdmin') {
    servantLower = 'arrivalsAdmin'
  }
  const session = context.driver.session()
  //Connect Leader to Church

  const connectedChurchRes = rearrangeCypherObject(
    await session.run(servantCypher[`connectChurch${servantType}`], {
      [`${servantLower}Id`]: servant.id,
      churchId: church.id,
      auth_id: servant.auth_id,
      auth: context.auth,
    })
  )

  const historyRecordStringArgs = {
    servant: servant,
    servantType: servantType,
    oldServant: oldServant,
    church: church,
    churchType: churchType,
    removed: false,
    args: args,
    higherChurch: {
      type: nextHigherChurch(churchType),
      name: connectedChurchRes?.higherChurchName,
    },
  }

  const serviceLogRes = rearrangeCypherObject(
    await session.run(servantCypher.createServiceLog, {
      id: servant.id,
      churchType: churchType,
      historyRecord: historyRecordString(historyRecordStringArgs),
    })
  )

  await session.run(servantCypher.connectServiceLog, {
    churchId: church.id,
    servantId: servant.id,
    oldServantId: oldServant.id ?? '',
    logId: serviceLogRes.id,
    auth: context.auth,
  })

  //Run Cypher to Connect the History
  if (churchType === 'Fellowship' && servantType === 'Leader') {
    await session.run(servantCypher.connectFellowshipHistory, {
      churchId: church.id,
    })
  } else if (churchType === 'GatheringService' && servantType === 'Leader') {
    await session.run(servantCypher.connectGatheringServiceHistory, {
      churchId: church.id,
    })
  } else if (servantType === 'Leader') {
    await session.run(servantCypher.connectChurchHistory, {
      churchId: church.id,
    })
  }
}

export const removeServantCypher = async (
  context,
  churchType,
  servantType,
  servant,
  church
) => {
  const servantLower = servantType.toLowerCase()
  const session = context.driver.session()

  //Disconnect him from the Church
  await session.run(servantCypher[`disconnectChurch${servantType}`], {
    [`${servantLower}Id`]: servant.id,
    churchId: church.id,
    auth_id: servant.auth_id,
    auth: context.auth,
  })

  const historyRecordStringArgs = {
    servant: servant,
    church: church,
    churchType: churchType,
    servantType: servantType,
    removed: true,
  }

  const historyLogRes = rearrangeCypherObject(
    await session.run(servantCypher.createHistoryLog, {
      id: servant.id,
      churchType: churchType,
      historyRecord: historyRecordString(historyRecordStringArgs),
    })
  )

  await session.run(servantCypher.connectHistoryLog, {
    churchId: church.id,
    servantId: servant.id,
    logId: historyLogRes.id,
    auth: context.auth,
  })
}
