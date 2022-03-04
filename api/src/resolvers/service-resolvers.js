const cypher = require('./cypher/resolver-cypher')

const getComponentServiceAggregates = async (obj, args, context) => {
  let serviceAggregates = []

  const session = context.driver.session()
  const serviceAggregateResponse = await session.run(
    cypher.componentServiceAggregates,
    { ...obj, ...args }
  )

  serviceAggregateResponse.records.map((record) => {
    let serviceAggregate = {}

    record.keys.forEach((key, i) => (serviceAggregate[key] = record._fields[i]))

    serviceAggregates.push(serviceAggregate)
  })

  return serviceAggregates
}

export const serviceResolvers = {
  Bacenta: {
    componentServiceAggregate: async (obj, args, context) => {
      return getComponentServiceAggregates(obj, args, context)
    },
  },
  Constituency: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, args, context)
    },
  },
  Council: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, args, context)
    },
  },
  Stream: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, args, context)
    },
  },
  GatheringService: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, args, context)
    },
  },
}
