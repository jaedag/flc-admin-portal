import { addMinutes } from 'date-utils'
import { getTodayTime } from 'date-utils'
import { isToday } from 'date-utils'

export const MOBILE_NETWORK_OPTIONS = [
  { key: '', value: '' },
  { key: 'MTN', value: 'MTN' },
  { key: 'Vodafone', value: 'Vodafone' },
  { key: 'AirtelTigo', value: 'AirtelTigo' },
]

export const beforeCountingDeadline = (bussing, church) => {
  if (!bussing || !church) {
    return
  }

  const today = new Date()

  let arrivalEndTime, arrivalStartTime, countingEndTime
  if (church?.__typename === 'Bacenta') {
    arrivalStartTime = new Date(getTodayTime(church?.stream.arrivalStartTime))
    arrivalEndTime = new Date(getTodayTime(church?.stream.arrivalEndTime))
    countingEndTime = addMinutes(arrivalEndTime, 30)
  }

  if (
    isToday(bussing?.created_at) &&
    arrivalStartTime < today < countingEndTime
  ) {
    //If the record was created today
    //And if the time is less than the arrivals cutoff time
    return true
  }
  // return false
  return false
}

export const beforeArrivalDeadline = (bussing, church) => {
  if (!bussing || !church) {
    return
  }

  const today = new Date()

  let arrivalEndTime, arrivalStartTime
  if (church?.__typename === 'Bacenta') {
    arrivalStartTime = new Date(getTodayTime(church?.stream.arrivalStartTime))
    arrivalEndTime = new Date(getTodayTime(church?.stream.arrivalEndTime))
  }

  if (
    isToday(bussing?.created_at) &&
    arrivalStartTime < today < arrivalEndTime
  ) {
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

  const today = new Date()

  let mobilisationEndTime, mobilisationStartTime

  if (church?.__typename === 'Bacenta') {
    mobilisationStartTime = new Date(
      getTodayTime(church?.stream.mobilisationStartTime)
    )
    mobilisationEndTime = new Date(
      getTodayTime(church?.stream.mobilisationStartTime)
    )
  }

  if (!bussing && mobilisationStartTime < today < mobilisationEndTime) {
    return true
  }

  if (
    isToday(bussing?.created_at) &&
    mobilisationStartTime < today < mobilisationEndTime
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
