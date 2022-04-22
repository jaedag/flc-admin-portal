const {
  getMobileCode,
  padNumbers,
  getStreamFinancials,
  handlePaymentError,
} = require('../financial-utils')
const { permitLeader } = require('../permissions')
const cypher = require('./banking-cypher')
const {
  isAuth,
  rearrangeCypherObject,
  throwErrorMsg,
} = require('../resolver-utils')
const axios = require('axios').default

export const bankingMutation = {
  BankServiceOffering: async (object, args, context) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)

    const session = context.driver.session()

    const { merchantId, auth } = getStreamFinancials(args.stream_name)

    // This code checks if there has already been a successful transaction
    const transactionResponse = rearrangeCypherObject(
      await session.run(cypher.checkTransactionId, args)
    )

    const transactionStatus =
      transactionResponse?.record.properties.transactionStatus
    if (transactionStatus === 'success') {
      throwErrorMsg('Banking has already been done for this service')
    }

    if (transactionStatus === 'pending') {
      throwErrorMsg(
        'Please confirm your initial payment before attempting another one'
      )
    }

    const cypherResponse = rearrangeCypherObject(
      await session.run(cypher.setServiceRecordTransactionId, {
        auth: context.auth,
        ...args,
      })
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
        desc: `${cypherResponse.churchName} ${cypherResponse.churchLevel} ${args.momoName}`,
        subscriber_number: args.mobileNumber,
        voucher: '',
      },
    }

    try {
      const paymentResponse = await axios(payOffering)

      handlePaymentError(paymentResponse)
    } catch (error) {
      throwErrorMsg(error)
    }

    return
  },

  ConfirmOfferingPayment: async (object, args, context) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)
    const session = context.driver.session()
    const { merchantId, auth } = getStreamFinancials(args.stream_name)

    const transactionResponse = rearrangeCypherObject(
      await session.run(cypher.checkTransactionId, args)
    )

    const record = transactionResponse?.record?.properties
    const banker = transactionResponse?.banker?.properties
    if (!record?.transactionId) {
      throwErrorMsg(
        'It looks like there was a problem. Please try sending again!'
      )
    }

    const paddedTransactionId = padNumbers(
      transactionResponse?.record.properties.transactionId
    )
    const confirmPaymentBody = {
      method: 'get',
      url: `https://prod.theteller.net/v1.1/users/transactions/${paddedTransactionId}/status`,
      headers: {
        'Content-Type': 'application/json',
        'Merchant-Id': merchantId,
        Authorization: auth,
      },
    }

    const confirmationResponse = await axios(confirmPaymentBody)

    if (confirmationResponse.data.code.toString() === '111') {
      return {
        id: record.id,
        transactionStatus: 'pending',
        income: record.income,
        offeringBankedBy: {
          id: banker.id,
          firstName: banker.firstName,
          lastName: banker.lastName,
          fullName: banker.firstName + ' ' + banker.fullName,
        },
      }
    }

    if (confirmationResponse.data.code.toString() === '104') {
      try {
        await session.run(cypher.setTransactionStatusFailed, args)
      } catch (error) {
        throwErrorMsg(error, 'Payment Unsuccessful!')
      }
    }

    if (!['000', '111'].includes(confirmationResponse.data.code.toString())) {
      try {
        await session.run(cypher.removeBankingRecordTransactionId, args)
      } catch (error) {
        throwErrorMsg(error)
      }

      throwErrorMsg(
        confirmationResponse.data.code + ' ' + confirmationResponse.data.reason
      )
    }

    if (confirmationResponse.data.code.toString() === '000') {
      try {
        await session.run(cypher.setTransactionStatusSuccess, args)
      } catch (error) {
        throwErrorMsg(error)
      }
    }

    // eslint-disable-next-line no-console
    console.log('Payment Verified Successfully!')

    return {
      id: record.id,
      income: record.income,
      offeringBankedBy: {
        id: banker.id,
        firstName: banker.firstName,
        lastName: banker.lastName,
        fullName: banker.firstName + ' ' + banker.fullName,
      },
    }
  },
}
