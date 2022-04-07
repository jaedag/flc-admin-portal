const {
  getMobileCode,
  padNumbers,
  getStreamFinancials,
} = require('../../resolvers/financial-utils')
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

    const { merchantId, auth } = getStreamFinancials(args.stream_name)

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

    axios(payOffering)
    return
  },
  ConfirmOfferingPayment: async (object, args, context) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)
    const session = context.driver.session()
    const { merchantId, auth } = getStreamFinancials(args.stream_name)

    const transactionResponse = rearrangeCypherObject(
      await session.run(cypher.checkTransactionId, args)
    )
    if (!transactionResponse?.transactionId) {
      throwErrorMsg('You cannot confirm what has never been sent')
    }

    const confirmPaymentBody = {
      method: 'get',
      url: `https://prod.theteller.net/v1.1/users/transactions/${transactionResponse.transactionId}/status`,
      headers: {
        'Content-Type': 'application/json',
        'Merchant-Id': merchantId,
        Authorization: auth,
      },
    }

    const confirmationResponse = await axios(confirmPaymentBody)

    try {
      if (confirmationResponse.data.code !== '000') {
        await session.run(cypher.removeServiceRecordTransactionId, args)
        throwErrorMsg(
          confirmationResponse.data.code +
            ' ' +
            confirmationResponse.data.reason
        )
      }
      // eslint-disable-next-line no-console
      console.log('Payment Verified Successfully!')
      return 'Payment Verified Successfully'
    } catch (error) {
      throwErrorMsg(error, 'Payment Unsuccessful!')
    }
  },
}
