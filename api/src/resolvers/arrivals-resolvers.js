import { permitAdmin, permitAdminArrivals, permitArrivals } from './permissions'
import { isAuth, rearrangeCypherObject, throwErrorMsg } from './resolver-utils'
import { MakeServant, RemoveServant } from './resolvers'
const cypher = require('./cypher/arrivals-cypher')
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

  SetBussingSupport: async (object, args, context) => {
    const session = context.driver.session()

    const response = rearrangeCypherObject(
      await session.run(cypher.getBussingRecordWithDate, args)
    )

    let bussingRecord

    if (response.dateLabels.includes('SwellDate')) {
      bussingRecord = rearrangeCypherObject(
        await session.run(cypher.setSwellBussingTopUp, args)
      )
    } else {
      bussingRecord = rearrangeCypherObject(
        await session.run(cypher.setNormalBussingTopUp, args)
      )
    }

    return bussingRecord.record.properties
  },
  SendBussingSupport: async (object, args, context) => {
    isAuth(permitArrivals('Council'), context.auth.roles)
    const session = context.driver.session()

    if (args.stream_name === 'Anagkazo') {
      throwErrorMsg(
        'Anagkazo is not entitled to bussing support using this application'
      )
    }
    const transactionResponse = rearrangeCypherObject(
      await session.run(cypher.checkTransactionId, args)
    )

    if (transactionResponse?.transactionId) {
      throwErrorMsg('Money has already been sent to this bacenta')
    }

    const cypherResponse = rearrangeCypherObject(
      await session.run(cypher.setBussingRecordTransactionId, args)
    )

    const bussingRecord = cypherResponse.record.properties

    const getMobileCode = (network) => {
      switch (network) {
        case 'MTN':
          return 'MTN'
        case 'Vodafone':
          return 'VDF'
        case 'Airtel':
          return 'ATL'
        case 'Tigo':
          return 'TGO'
        default:
          break
      }
    }

    const padNumbers = (number) => {
      return number.toString().padStart(12, '0')
    }

    const sendBussingSupport = {
      method: 'post',
      url: `https://prod.theteller.net/v1.1/transaction/process`,
      headers: {
        'content-type': 'application/json',
        Authorization: process.env.PAYSWITCH_AUTH,
      },
      data: {
        merchant_id: process.env.PAYSWITCH_MERCHANT_ID,
        transaction_id: padNumbers(bussingRecord.transactionId),
        amount: padNumbers(bussingRecord.bussingTopUp * 100),
        processing_code: '404000',
        'r-switch': 'FLT',
        desc: cypherResponse.bacentaName + ' ' + cypherResponse.date,
        pass_code: process.env.PAYSWITCH_PASSCODE,
        account_number: bussingRecord.momoNumber,
        account_issuer: getMobileCode(bussingRecord.mobileNetwork),
      },
    }
    try {
      const res = await axios(sendBussingSupport)

      if (res.data.code !== '000') {
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
