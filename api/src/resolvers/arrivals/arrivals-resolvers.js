/* eslint-disable no-console */
const {
  getMobileCode,
  padNumbers,
  getStreamFinancials,
} = require('../financial-utils')
const { createRole, deleteRole } = require('../auth0-utils')
const {
  permitAdmin,
  permitAdminArrivals,
  permitArrivals,
  permitArrivalsHelpers,
} = require('../permissions')
const {
  isAuth,
  noEmptyArgsValidation,
  rearrangeCypherObject,
  throwErrorMsg,
} = require('../resolver-utils')
const { MakeServant, RemoveServant } = require('../resolvers')
const cypher = require('./arrivals-cypher')
const axios = require('axios').default

export const arrivalsMutation = {
  MakeConstituencyArrivalsAdmin: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Constituency'), ...permitArrivals('Council')],
      'Constituency',
      'ArrivalsAdmin'
    ),
  RemoveConstituencyArrivalsAdmin: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Constituency'), ...permitArrivals('Council')],
      'Constituency',
      'ArrivalsAdmin'
    ),
  MakeCouncilArrivalsAdmin: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Council'), ...permitArrivals('Stream')],
      'Council',
      'ArrivalsAdmin'
    ),
  RemoveCouncilArrivalsAdmin: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Council'), ...permitArrivals('Stream')],
      'Council',
      'ArrivalsAdmin'
    ),
  MakeStreamArrivalsAdmin: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('GatheringService')],
      'Stream',
      'ArrivalsAdmin'
    ),
  RemoveStreamArrivalsAdmin: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('GatheringService')],
      'Stream',
      'ArrivalsAdmin'
    ),
  MakeGatheringServiceArrivalsAdmin: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('GatheringService'), ...permitArrivals('Denomination')],
      'GatheringService',
      'ArrivalsAdmin'
    ),
  RemoveGatheringServiceArrivalsAdmin: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('GatheringService'), ...permitArrivals('Denomination')],
      'GatheringService',
      'ArrivalsAdmin'
    ),

  //ARRIVALS HELPERS
  MakeStreamArrivalsCounter: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsCounter'
    ),
  RemoveStreamArrivalsCounter: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsCounter'
    ),

  MakeStreamArrivalsConfirmer: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsConfirmer'
    ),
  RemoveStreamArrivalsConfirmer: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsConfirmer'
    ),
  RemoveAllStreamArrivalsHelpers: async (object, args, context) => {
    isAuth(permitAdminArrivals('Stream'), context.auth.roles)
    noEmptyArgsValidation(['streamId'])

    const session = context.driver.session()

    try {
      await axios(deleteRole('arrivalsConfirmerStream'))
      await axios(deleteRole('arrivalsCounterStream'))

      // eslint-disable-next-line no-console
      console.log('Arrivals Helper Roles Deleted Successfully')
    } catch (error) {
      throwErrorMsg('There was an error deleting arrivals helper roles', error)
    }

    try {
      await axios(
        createRole(
          'arrivalsConfirmerStream',
          'A person who confirms the arrival of bacentas'
        )
      )
      await axios(
        createRole(
          'arrivalsCounterStream',
          'A person who confirms the attendance of bacentas'
        )
      )
      console.log('Arrivals Helper Roles Created Successfully')
    } catch (error) {
      throwErrorMsg('There was an error creating arrivals helper roles')
    }

    const stream = rearrangeCypherObject(
      await session.run(cypher.RemoveAllStreamArrivalsHelpers, {
        streamId: args?.streamId,
      })
    )

    return stream?.record.properties
  },
  SetBussingSupport: async (object, args, context) => {
    const session = context.driver.session()

    const response = rearrangeCypherObject(
      await session.run(cypher.getBussingRecordWithDate, args)
    )

    let bussingRecord = 0

    if (response.attendance >= 8) {
      if (response.dateLabels.includes('SwellDate')) {
        bussingRecord = rearrangeCypherObject(
          await session.run(cypher.setSwellBussingTopUp, args)
        )
      } else {
        bussingRecord = rearrangeCypherObject(
          await session.run(cypher.setNormalBussingTopUp, args)
        )
      }
    }

    return bussingRecord?.record.properties
  },
  SendBussingSupport: async (object, args, context) => {
    isAuth(permitArrivalsHelpers(), context.auth.roles)
    const session = context.driver.session()

    const { merchantId, auth, passcode } = getStreamFinancials(args.stream_name)
    const transactionResponse = rearrangeCypherObject(
      await session.run(cypher.checkTransactionId, args)
    )

    if (transactionResponse?.transactionId) {
      throwErrorMsg('Money has already been sent to this bacenta')
    } else if (!transactionResponse?.arrivalTime) {
      //If record has not been confirmed, it will return null
      throwErrorMsg('This bacenta is not eligible to receive money')
    }

    const cypherResponse = rearrangeCypherObject(
      await session.run(cypher.setBussingRecordTransactionId, args)
    )

    const bussingRecord = cypherResponse.record.properties

    const sendBussingSupport = {
      method: 'post',
      url: `https://prod.theteller.net/v1.1/transaction/process`,
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
      data: {
        merchant_id: merchantId,
        transaction_id: padNumbers(bussingRecord.transactionId),
        amount: padNumbers(bussingRecord.bussingTopUp * 100),
        processing_code: '404000',
        'r-switch': 'FLT',
        desc: `${cypherResponse.bacentaName} ${cypherResponse.leaderName} ${cypherResponse.date}`,
        pass_code: passcode,
        account_number: bussingRecord.momoNumber,
        account_issuer: getMobileCode(bussingRecord.mobileNetwork),
      },
    }

    try {
      const res = await axios(sendBussingSupport)

      if (res.data.code !== '000') {
        await session.run(cypher.removeBussingRecordTransactionId, args)
        throwErrorMsg(res.data.code + ' ' + res.data.reason)
      }
      // eslint-disable-next-line no-console
      console.log(
        'Money Sent Successfully to',
        bussingRecord.momoNumber,
        res.data
      )
      return bussingRecord
    } catch (error) {
      throwErrorMsg(error, 'Money could not be sent!')
    }
  },

  SetSwellDate: async (object, args, context) => {
    isAuth(permitAdminArrivals('GatheringService'), context.auth.roles)

    const session = context.driver.session()

    const cypherResponse = rearrangeCypherObject(
      await session.run(cypher.setSwellDate, args)
    )

    return cypherResponse
  },
}

export const arrivalsResolvers = {}
