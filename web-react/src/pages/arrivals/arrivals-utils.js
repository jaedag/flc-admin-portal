import { parseDate } from 'date-utils'
import { setTime } from 'date-utils'

const CAMPUS_ARRIVALS_DEADLINE = [19, 45, 0]
const TOWN_ARRIVALS_DEADLINE = [13, 45, 0]
const GENERIC_ARRIVALS_DEADLINE = [20, 0, 0]
const CAMPUS_MOBILISATION_DEADLINE = [5, 0, 0]
const TOWN_MOBILISATION_DEADLINE = [10, 0, 0]
const GENERIC_MOBILISATION_DEADLINE = [19, 0, 0]
const CAMPUS_MOBILISATION_START_TIME = [4, 0, 0]
const TOWN_MOBILISATION_START_TIME = [9, 0, 0]
const GENERIC_MOBILISATION_START_TIME = [14, 0, 0]

export const MOBILE_NETWORK_OPTIONS = [
  { key: 'MTN', value: 'MTN' },
  { key: 'Vodafone', value: 'Vodafone' },
  { key: 'AirtelTigo', value: 'AirtelTigo' },
]

export const beforeArrivalDeadline = (bussing, church) => {
  if (!bussing || !church) {
    return
  }

  const today = new Date()

  let arrivalsDeadline = GENERIC_ARRIVALS_DEADLINE

  if (today.getDay() === 0 || today.getDay() === 6) {
    //If Today is Saturday or Sunday
    switch (church?.stream_name) {
      case 'campus':
        arrivalsDeadline = CAMPUS_ARRIVALS_DEADLINE
        break
      case 'town':
        arrivalsDeadline = TOWN_ARRIVALS_DEADLINE
        break
      case 'anagkazo':
        arrivalsDeadline
        break
      default:
        break
    }
  }

  arrivalsDeadline = setTime(arrivalsDeadline)

  if (parseDate(bussing?.created_at) === 'Today' && today < arrivalsDeadline) {
    //If the record was created today
    //And if the time is less than the arrivals cutoff time
    return true
  }
  // return false
  return false
}

export const beforeMobilisationDeadline = (bussing, church) => {
  if (!church) {
    return
  }

  if (!bussing) {
    return true
  }

  const today = new Date()

  let mobilisationDeadline = GENERIC_MOBILISATION_DEADLINE,
    mobilisationStartTime = GENERIC_MOBILISATION_START_TIME

  switch (church?.stream_name) {
    case 'campus':
      mobilisationDeadline = CAMPUS_MOBILISATION_DEADLINE
      mobilisationStartTime = CAMPUS_MOBILISATION_START_TIME
      break
    case 'town':
      mobilisationDeadline = TOWN_MOBILISATION_DEADLINE
      mobilisationStartTime = TOWN_MOBILISATION_START_TIME
      break
    case 'anagkazo':
      mobilisationDeadline
      break
    default:
      break
  }

  mobilisationDeadline = setTime(mobilisationDeadline)
  mobilisationStartTime = setTime(mobilisationStartTime)

  if (
    parseDate(bussing?.created_at) === 'Today' &&
    mobilisationStartTime < today < mobilisationDeadline
  ) {
    if (!bussing?.mobilisationPicture) {
      //If the record was created today
      //And if the time is less than the mobilisation cutoff time
      return true
    }
  }
  // return false
  return false
}
