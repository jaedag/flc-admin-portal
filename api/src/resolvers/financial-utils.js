import { throwErrorMsg } from './resolver-utils'

export const getMobileCode = (network) => {
  switch (network) {
    case 'MTN':
      return 'MTN'
    case 'Vodafone':
      return 'VDF'
    case 'AirtelTigo':
      return 'ATL'
    case 'Airtel':
      return 'ATL'
    case 'Tigo':
      return 'TGO'
    default:
      break
  }
}

export const padNumbers = (number) => {
  if (!number) {
    return
  }
  return number.toString().padStart(12, '0')
}
export const handlePaymentError = (paymentResponse) => {
  const code = paymentResponse.data.code

  switch (code.toString()) {
    case '105':
    case '101':
      throwErrorMsg('101 Payment Unsuccessful!')
      break
    case '100':
      throwErrorMsg('100 Transaction Failed or Declined')
      break
    case '102':
      throwErrorMsg('102 Number not registered for mobile money')
      break
    case '103':
      throwErrorMsg('103 Wrong PIN or transaction timed out')
      break
    case '104':
      throwErrorMsg('104 Transaction declined or terminated')
      break
    case '111':
      break
    case '107':
      throwErrorMsg('USSD is busy, please try againn later')
      break
    case '114':
      throwErrorMsg('Invalid Voucher Code')
      break
    case '200':
      throwErrorMsg('VBV Required')
      break
    case '600':
      throwErrorMsg('Access Denied')
      break
    case '979':
      throwErrorMsg('Access Denied. Invalid Credential')
      break
    case '909':
      throwErrorMsg('Duplicate Transaction ID. Transaction ID must be unique')
      break
    case '999':
      throwErrorMsg('Access Denied. Merchant ID is not set')
      break
  }
}
export const getStreamFinancials = (stream) => {
  let merchantId, auth, passcode

  switch (stream) {
    case 'Anagkazo':
      throwErrorMsg('Anagkazo has a different way of banking their offerings')
      break
    case 'Campus':
    case 'campus':
    case 'Town':
    case 'town':
      merchantId = process.env.PAYSWITCH_CAMPUS_MERCHANT_ID
      auth = process.env.PAYSWITCH_CAMPUS_AUTH
      passcode = process.env.PAYSWITCH_CAMPUS_PASSCODE
      break
    // case 'Town':
    //   merchantId = process.env.PAYSWITCH_TOWN_MERCHANT_ID
    //   auth = process.env.PAYSWITCH_TOWN_AUTH
    //   break
  }

  return { merchantId, auth, passcode }
}
