const cypher = require('./cypher/component-service-cypher')

const getComponentServiceAggregates = async (obj, args, context, church) => {
  let serviceAggregates = []

  const session = context.driver.session()
  const serviceAggregateResponse = await session.run(
    cypher[`component${church}ServiceAggregates`],
    { ...obj, ...args }
  )

  serviceAggregateResponse.records.map(record => {
    let serviceAggregate = {}

    record.keys.forEach((key, i) => (serviceAggregate[key] = record._fields[i]))

    serviceAggregates.push(serviceAggregate)
  })

  return serviceAggregates
}

export const serviceResolvers = {
  Bacenta: {
    componentServiceAggregate: async (obj, args, context) => {
      return getComponentServiceAggregates(obj, args, context, 'Bacenta')
    },
  },
  Constituency: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, args, context, 'Constituency')
    },
  },
  Council: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, args, context, 'Council')
    },
  },
  Stream: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(obj, args, context, 'Stream')
    },
  },
  GatheringService: {
    componentServiceAggregate: (obj, args, context) => {
      return getComponentServiceAggregates(
        obj,
        args,
        context,
        'GatheringService'
      )
    },
  },
}
