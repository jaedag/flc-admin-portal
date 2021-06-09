//Global Constants
export const PHONE_NUM_REGEX_VALIDATION =
  /^[+][(]{0,1}[1-9]{1,4}[)]{0,1}[-\s/0-9]*$/
export const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

export const GENDER_OPTIONS = [
  { key: 'Male', value: 'Male' },
  { key: 'Female', value: 'Female' },
]
export const MARITAL_STATUS_OPTIONS = [
  { key: 'Single', value: 'Single' },
  { key: 'Married', value: 'Married' },
]

export const TITLE_OPTIONS = [
  { key: 'Pastor', value: 'Pastor' },
  { key: 'Reverend', value: 'Reverend' },
  { key: 'Bishop', value: 'Bishop' },
]

export const SERVICE_DAY_OPTIONS = [
  { key: 'Tuesday', value: 'Tuesday' },
  { key: 'Wednesday', value: 'Wednesday' },
  { key: 'Thursday', value: 'Thursday' },
  { key: 'Friday', value: 'Friday' },
  { key: 'Saturday', value: 'Saturday' },
]

export const isAuthorised = (roles, userRoles) => {
  if (roles.includes('all')) {
    return true
  }
  return roles.some((r) => userRoles.includes(r))
}
export const capitalise = (str) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1)
}
export const plural = (church) => {
  switch (church) {
    case 'town':
      return 'towns'
    case 'campus':
      return 'campuses'
    case 'senior high school':
      return 'senior high schools'
    default:
      return
  }
}

export const parsePhoneNum = (phoneNumber) => {
  return phoneNumber
    .replace(/\s/g, '')
    .replace('+', '')
    .replace('(', '')
    .replace(')', '')
}

export const makeSelectOptions = (data) => {
  return data.map((data) => ({
    value: data.id,
    key: data.name ? data.name : data.firstName + ' ' + data.lastName,
  }))
}

export const parseDate = (date) => {
  //Receives the current date and returns text "Today, Yesterday,etc"

  // Get today's date
  let todaysDate = new Date()

  // Create date from input value
  let inputDate = new Date(date)

  // call setHours to take the time out of the comparison
  if (inputDate.toDateString() === todaysDate.toDateString()) {
    // Date equals today's date
    return 'Today'
  } else if (inputDate.getDate() === todaysDate.getDate() - 1) {
    // Date equals yesterday's date
    return 'Yesterday'
  }
  return inputDate.toDateString()
}

//debouncing function
export function debounce(func, wait) {
  let timerId
  return () => {
    clearTimeout(timerId)
    //Clears timer if code has not yet executed

    timerId = setTimeout(() => {
      timerId = null //Nullifies timer ID Not sure why?
      func.apply(this, arguments) //pass in the arguments to the function and the scope
    }, wait)
  }
}

export const getNameWithTitle = (member) => {
  let displayName = {
    name: `${member.fullName}`,
    title: '',
  }

  if (member.title.length) {
    if (member.gender.gender === 'Female') {
      switch (member.title[0].title) {
        case 'Pastor':
          displayName.title = 'Lady Pastor'
          break
        case 'Reverend':
          displayName.title = 'Lady Reverend'
          break
        case 'Bishop':
          displayName.title = 'Elect Mother'
          break
        default:
          break
      }
    } else {
      displayName.title = member.title[0].title
    }

    return `${displayName.title} ${displayName.name}`
  } else {
    return displayName.name
  }
}
