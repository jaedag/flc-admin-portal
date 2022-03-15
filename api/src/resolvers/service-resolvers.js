import { permitLeaderAdmin } from './permissions'
import { isAuth, rearrangeCypherObject, throwErrorMsg } from './resolver-utils'

const serviceCypher = require('./cypher/service-cypher')
const cypher = require('./cypher/component-service-cypher')

const getComponentServiceAggregates = async (obj, args, context, church) => {
  let serviceAggregates = []

  const session = context.driver.session()
  const serviceAggregateResponse = await session.run(
    cypher[`component${church}ServiceAggregates`],
    { ...obj, ...args }
  )

  serviceAggregateResponse.records.map((record) => {
    let serviceAggregate = {}

    record.keys.forEach((key, i) => (serviceAggregate[key] = record._fields[i]))

    serviceAggregates.push(serviceAggregate)
  })

  return serviceAggregates
}

export const serviceMutation = {
  RecordService: async (object, args, context) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)
    const session = context.driver.session()

    const serviceCheck = rearrangeCypherObject(
      await session.run(serviceCypher.checkFormFilledThisWeek, args)
    )

    if (Object.keys(serviceCheck).length !== 0) {
      throwErrorMsg('You have already filled your service form this week!')
      return
    }

    const serviceDetails = rearrangeCypherObject(
      await session.run(serviceCypher.recordService, {
        ...args,
        auth: context.auth,
      })
    )
    console.log(serviceDetails)
    return serviceDetails.serviceRecord.properties
  },
}

export const serviceResolvers = {
  Bacenta: {
    componentServiceAggregate: async (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'Bacenta'),
  },
  Constituency: {
    componentServiceAggregate: (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'Constituency'),
  },
  Council: {
    componentServiceAggregate: (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'Council'),
  },
  Stream: {
    componentServiceAggregate: (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'Stream'),
  },
  GatheringService: {
    componentServiceAggregate: (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'GatheringService'),
  },
}
