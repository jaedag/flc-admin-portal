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

export const getStreamFinancials = (stream) => {
  let merchantId, auth

  switch (stream) {
    case 'Anagkazo':
      throwErrorMsg('Anagkazo has a different way of banking their offerings')
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

  return { merchantId, auth }
}
