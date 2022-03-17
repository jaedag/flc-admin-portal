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

  SendBussingSupport: async (object, args, context) => {
    isAuth(permitArrivals('Council'), context.auth.roles)
    const session = context.driver.session()

    const transactionResponse = rearrangeCypherObject(
      await session.run(cypher.checkTransactionId, args)
    )

    if (transactionResponse?.transactionId) {
      throwErrorMsg('Money has already been sent to this bacenta')
    }

    const bussingRecordNode = rearrangeCypherObject(
      await session.run(cypher.getBussingRecord, args)
    )
    const bussingRecord = bussingRecordNode.record.properties

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

    const getStringNumbers = (number) => {
      const emptyStr = '000000000000'
      return emptyStr.slice(number.toString().length) + number
    }

    const sendBussingSupport = {
      method: 'post',
      url: `https://prod.theteller.net//v1.1/transaction/process`,
      headers: {
        'content-type': 'application/json',
        Authorization: process.env.PAYSWITCH_AUTH,
      },
      data: {
        merchant_id: process.env.PAYSWITCH_MERCHANT_ID,
        transaction_id: getStringNumbers(bussingRecord.transactionId),
        amount: getStringNumbers(bussingRecord.bussingTopUp * 100),
        processing_code: '404000',
        'r-switch': 'FLT',
        desc: 'Bussing Support',
        pass_code: process.env.PAYSWITCH_PASSCODE,
        account_number: bussingRecord.momoNumber,
        account_issuer: getMobileCode(bussingRecord.mobileNetwork),
      },
    }

    await axios(sendBussingSupport)
      .then((res) =>
        // eslint-disable-next-line no-console
        console.log(
          'Money Sent Successfully to',
          bussingRecord.momoNumber,
          res.data
        )
      )
      .catch((err) =>
        throwErrorMsg('There was a problem sending the money', err)
      )

    return bussingRecord
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
