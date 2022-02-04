const cypher = require('./cypher/resolver-cypher')

const getComponentServiceAggregates = async (obj, context) => {
  let serviceAggregates = []

  const session = context.driver.session()
  const serviceAggregateResponse = await session.run(
    cypher.componentServiceAggregates,
    obj
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
      return getComponentServiceAggregates(obj, context)
    },
  },
  Constituency: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, context)
    },
  },
  Council: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, context)
    },
  },
  Stream: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, context)
    },
  },
  GatheringService: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, context)
    },
  },
}
