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

  if (arrivalStartTime < today && today < countingEndTime) {
    if (isToday(bussing?.created_at)) {
      //If the record was created today
      //And if the time is less than the arrivals cutoff time
      return true
    }
  }

  // return false
  return false
}

export const beforeArrivalDeadline = (bussing, church) => {
  if (!church) {
    return
  }

  const today = new Date()

  let arrivalEndTime, arrivalStartTime
  if (church?.__typename === 'Bacenta') {
    arrivalStartTime = new Date(getTodayTime(church?.stream.arrivalStartTime))
    arrivalEndTime = new Date(getTodayTime(church?.stream.arrivalEndTime))
  }

  if (arrivalStartTime < today && today < arrivalEndTime) {
    if (!bussing) {
      return true
    }

    if (isToday(bussing?.created_at) && !bussing?.bussingPictures) {
      //If the record was created today
      //And if the time is less than the arrivals cutoff time
      return true
    }
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
      getTodayTime(church?.stream.mobilisationEndTime)
    )
  }

  if (mobilisationStartTime < today && today < mobilisationEndTime) {
    if (!bussing) {
      //If there is no bussing Record
      return true
    }

    if (!isToday(bussing?.created_at)) {
      return true
    }

    if (isToday(bussing?.created_at) && !bussing?.mobilisationPicture) {
      return true //Should Fill
    }
  }

  // return false
  return false
}
