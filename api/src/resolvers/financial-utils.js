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
