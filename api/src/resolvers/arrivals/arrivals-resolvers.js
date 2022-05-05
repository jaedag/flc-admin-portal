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
  permitArrivalsConfirmer,
} = require('../permissions')
const {
  isAuth,
  noEmptyArgsValidation,
  rearrangeCypherObject,
  throwErrorMsg,
} = require('../resolver-utils')
import { MakeServant, RemoveServant } from '../resolvers'
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
  UploadMobilisationPicture: async (object, args, context) => {
    const session = context.driver.session()
    isAuth(['leaderBacenta'], context.auth.roles)
    const checkBacentaMomo = rearrangeCypherObject(
      await session.run(cypher.checkBacentaMomoDetails, args)
    )

    if (
      !checkBacentaMomo.momoNumber &&
      (checkBacentaMomo.normalTopUp || checkBacentaMomo.swellTopUp)
    ) {
      throwErrorMsg('You need a mobile money number before filling this form')
    }

    const response = rearrangeCypherObject(
      await session.run(cypher.uploadMobilisationPicture, {
        ...args,
        auth: context.auth,
      })
    )

    const bacenta = response.bacenta.properties
    const bussingRecord = response.bussingRecord.properties
    const date = response.date.properties

    const returnToCache = {
      id: bussingRecord.id,
      attendance: bussingRecord.attendance,
      mobilisationPicture: bussingRecord.mobilisationPicture,
      serviceLog: {
        bacenta: [
          {
            id: bacenta.id,
            stream_name: response.stream_name,
            bussing: [
              {
                id: bussingRecord.id,
                serviceDate: {
                  date: date.date,
                },
                week: response.week,
                mobilisationPicture: bussingRecord.mobilisationPicture,
              },
            ],
          },
        ],
      },
    }

    return returnToCache
  },
  SetBussingSupport: async (object, args, context) => {
    const session = context.driver.session()
    try {
      const response = rearrangeCypherObject(
        await session.run(cypher.getBussingRecordWithDate, args)
      )

      let bussingRecord

      if (
        response.attendance < 8 ||
        (response.numberOfBusses === 0 && response.numberOfCars === 0)
      ) {
        try {
          rearrangeCypherObject(await session.run(cypher.noBussingTopUp, args))
        } catch (error) {
          console.log(error)
        } finally {
          throwErrorMsg("Today's Bussing doesn't merit a top up")
        }
      }

      if (response.attendance >= 8) {
        if (
          response.attendance >= response.target &&
          response.dateLabels.includes('SwellDate')
        ) {
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
    } catch (error) {
      throwErrorMsg(error)
    }
  },
  SendBussingSupport: async (object, args, context) => {
    isAuth(permitArrivalsHelpers(), context.auth.roles)
    const session = context.driver.session()

    const { merchantId, auth, passcode } = getStreamFinancials(args.stream_name)
    const recordResponse = rearrangeCypherObject(
      await session.run(cypher.checkTransactionId, args)
    )

    const transactionResponse = recordResponse.record.properties

    if (transactionResponse?.transactionId) {
      throwErrorMsg('Money has already been sent to this bacenta')
    } else if (
      !transactionResponse?.arrivalTime ||
      transactionResponse?.attendance < 8 ||
      !transactionResponse?.bussingTopUp
    ) {
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
        desc: `${cypherResponse.bacentaName} Bacenta ${bussingRecord.momoName}`,
        pass_code: passcode,
        account_number: bussingRecord.momoNumber,
        account_issuer: getMobileCode(bussingRecord.mobileNetwork),
      },
    }
    console.log(
      `${cypherResponse.bacentaName} Bacenta ${transactionResponse.momoName}`
    )
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
  RecordArrivalTime: async (object, args, context) => {
    isAuth(permitArrivalsConfirmer(), context.auth.roles)
    const session = context.driver.session()

    const recordResponse = rearrangeCypherObject(
      await session.run(cypher.checkTransactionId, args)
    )

    const stream = recordResponse.stream.properties
    const arrivalEndTime = new Date(
      new Date().toISOString().slice(0, 10) + stream.arrivalEndTime?.slice(10)
    )
    const today = new Date()

    if (today > arrivalEndTime) {
      throwErrorMsg('It is now past the time for arrivals. Thank you!')
    }

    const response = rearrangeCypherObject(
      await session.run(cypher.recordArrivalTime, {
        ...args,
        auth: context.auth,
      })
    )
    console.log(response)
    return response.bussingRecord
  },
  SetSwellDate: async (object, args, context) => {
    isAuth(permitAdminArrivals('GatheringService'), context.auth.roles)

    const session = context.driver.session()

    const cypherResponse = rearrangeCypherObject(
      await session.run(cypher.setSwellDate, args)
    )

    return cypherResponse
  },
  SendMobileVerificationNumber: async (object, args, context) => {
    isAuth(['leaderBacenta'], context.auth.roles)

    const sendMessage = {
      method: 'post',
      url: `https://api.mnotify.com/api/sms/quick?key=${process.env.MNOTIFY_KEY}`,
      headers: {
        'content-type': 'application/json',
      },
      data: {
        recipient: [args.phoneNumber],
        sender: 'FLC Admin',
        message: `Hi ${args.firstName},\n\nYour code is ${args.code}. Input this on the portal to verify your phone number.`,
        is_schedule: 'false',
        schedule_date: '',
      },
    }

    try {
      const res = await axios(sendMessage)

      if (res.data.code === '2000') {
        return 'Message sent successfully'
      }
      throwErrorMsg('There was a problem sending your message')
    } catch (error) {
      throwErrorMsg('There was a problem sending your message', error)
    }
  },
}

export const arrivalsResolvers = {}
