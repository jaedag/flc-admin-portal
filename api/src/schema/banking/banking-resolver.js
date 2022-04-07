const { getMobileCode, padNumbers } = require('../../resolvers/financial-utils')
const { permitLeader } = require('../../resolvers/permissions')
const cypher = require('./banking-cypher')
const {
  isAuth,
  rearrangeCypherObject,
  throwErrorMsg,
} = require('../../resolvers/resolver-utils')
const axios = require('axios').default

export const bankingMutation = {
  BankServiceOffering: async (object, args, context) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)

    const session = context.driver.session()
    let merchantId, auth

    switch (args.stream_name) {
      case 'Anagkazo':
        throwErrorMsg(
          'Anagkazo is not entitled to bussing support using this application'
        )
        break
      case 'Campus':
      case 'Town':
        merchantId = process.env.PAYSWITCH_CAMPUS_MERCHANT_ID
        auth = process.env.PAYSWITCH_CAMPUS_AUTH
        break
      // case 'Town':
      //   merchantId = process.env.PAYSWITCH_TOWN_MERCHANT_ID
      //   auth = process.env.PAYSWITCH_TOWN_AUTH
      //   break
    }

    const transactionResponse = rearrangeCypherObject(
      await session.run(cypher.checkTransactionId, args)
    )

    if (transactionResponse?.transactionId) {
      throwErrorMsg('Banking has already been done for this service')
    }

    const cypherResponse = rearrangeCypherObject(
      await session.run(cypher.setServiceRecordTransactionId, args)
    )

    const serviceRecord = cypherResponse.record.properties

    const payOffering = {
      method: 'post',
      url: `https://prod.theteller.net/v1.1/transaction/process`,
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
      data: {
        transaction_id: padNumbers(serviceRecord.transactionId),
        merchant_id: merchantId,
        amount: padNumbers(serviceRecord?.income * 100),
        processing_code: '000200',
        'r-switch': getMobileCode(args.mobileNetwork),
        desc: cypherResponse.churchName + ' ' + cypherResponse.date,
        subscriber_number: args.mobileNumber,
        voucher: '',
      },
    }

    try {
      const paymentResponse = await axios(payOffering)

      if (paymentResponse.data.code !== '000') {
        await session.run(cypher.removeServiceRecordTransactionId, args)
        throwErrorMsg(
          paymentResponse.data.code + ' ' + paymentResponse.data.reason
        )
      }
      // eslint-disable-next-line no-console
      console.log(
        'Money Sent Successfully to',
        serviceRecord.mobileNumber,
        paymentResponse.data
      )
      return serviceRecord
    } catch (error) {
      throwErrorMsg(error, 'Payment Unsuccessful!')
    }
  },
}
