//Global Constants
export const PHONE_NUM_REGEX_VALIDATION =
  /^[+][(]{0,1}[1-9]{1,4}[)]{0,1}[-\s/0-9]*$/
export const DECIMAL_NUM_REGEX = /^-?\d*\.{1}\d*$/
export const DECIMAL_NUM_REGEX_POSITIVE_ONLY = /^\d*\.{1}\d*$/
export const DEBOUNCE_TIMER = 500

export const GENDER_OPTIONS = [
  { key: 'Male', value: 'Male' },
  { key: 'Female', value: 'Female' },
]
export const MARITAL_STATUS_OPTIONS = [
  { key: 'Single', value: 'Single' },
  { key: 'Married', value: 'Married' },
]
export const VACATION_OPTIONS = [
  { key: 'Active', value: 'Active' },
  { key: 'Vacation', value: 'Vacation' },
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

export const throwErrorMsg = (message, error) => {
  if (!message && !error) {
    return
  }
  // eslint-disable-next-line no-console
  console.error(error || message)
  alert(message + ' ' + error)
}

export const alertMsg = (message) => {
  alert(message)
}

export const isAuthorised = (permittedRoles, userRoles) => {
  if (permittedRoles?.includes('all')) {
    return true
  }
  return permittedRoles?.some((r) => userRoles.includes(r))
}

export const authorisedLink = (currentUser, permittedRoles, link) => {
  if (isAuthorised(permittedRoles, currentUser.roles)) {
    return link
  }
  return '#'
}

export const transformCloudinaryImg = (url, size) => {
  if (size === 'large') {
    return url?.replace(
      'https://res.cloudinary.com/firstlovecenter/image/upload/',
      'https://res.cloudinary.com/firstlovecenter/image/upload/c_fill,g_face,h_300,w_300/'
    )
  }

  return url?.replace(
    'https://res.cloudinary.com/firstlovecenter/image/upload/',
    'https://res.cloudinary.com/firstlovecenter/image/upload/c_thumb,g_face,h_150,w_150,z_0.7/'
  )
}
export const capitalise = (str) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1)
}
export const plural = (church) => {
  switch (church) {
    case 'stream':
      return 'streams'
    case 'Stream':
      return 'Streams'
    case 'council':
      return 'councils'
    case 'Council':
      return 'Councils'
    case 'town':
      return 'towns'
    case 'Town':
      return 'Towns'
    case 'campus':
      return 'campuses'
    case 'Campus':
      return 'Campuses'
    case 'Constituency':
      return 'Constituencies'
    case 'senior high school':
      return 'senior high schools'
    case 'Senior High School':
      return 'Senior High Schools'
    case 'bacenta':
      return 'bacentas'
    case 'Bacenta':
      return 'Bacentas'
    case 'sonta':
      return 'sontas'
    case 'Sonta':
      return 'Sontas'
    case 'fellowship':
      return 'fellowships'
    case 'Fellowship':
      return 'Fellowships'
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

export const repackDecimals = (decimal) => {
  if (decimal === 0) {
    return '0.0'
  } else return parseFloat(decimal)
}

export const makeSelectOptions = (data) => {
  if (!data) {
    return null
  }

  return data.map((data) => ({
    value: data.id,
    key: data.name ? data.name : data.firstName + ' ' + data.lastName,
  }))
}

export const parseNeoTime = (time) => {
  if (!time) {
    return
  }
  let data = new Date(time)
  let hrs = data.getHours()
  let mins = data.getMinutes()
  if (hrs <= 9) hrs = '0' + hrs
  if (mins < 10) mins = '0' + mins
  const postTime = hrs + ':' + mins
  return postTime
}

export const parseDate = (date) => {
  //Receives the current date and returns text "Today, Yesterday,etc"

  // Get today's date
  let todaysDate = new Date()

  // Create date from input value
  let inputDate = new Date(date)

  // To calculate the time difference of two dates
  const differenceInTime = todaysDate.getTime() - inputDate.getTime()

  // To calculate the no. of days between two dates
  const differenceInDays = differenceInTime / (1000 * 3600 * 24)

  // call setHours to take the time out of the comparison
  if (inputDate.toDateString() === todaysDate.toDateString()) {
    // Date equals today's date
    return 'Today'
  } else if (Math.floor(differenceInDays) === 1) {
    // Date equals yesterday's date
    return 'Yesterday'
  } else if (Math.floor(differenceInDays) < 7) {
    // Date equals yesterday's date
    return Math.floor(differenceInDays) + ' days ago'
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
  if (!member) {
    return null
  }
  let displayName = {
    name: `${member.fullName}`,
    title: '',
  }

  if (member.titleConnection.edges?.length) {
    if (member.gender.gender === 'Female') {
      switch (member.titleConnection.edges[0].node.title) {
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
      displayName.title = member.titleConnection.edges[0].node.title
    }

    return `${displayName.title} ${displayName.name}`
  } else {
    return displayName.name
  }
}

export const getHumanReadableDate = (date) => {
  if (!date) {
    return
  }
  return new Date(date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const getMemberDob = (displayMember) => {
  if (!displayMember) {
    return
  }
  if (displayMember.dob?.date) {
    return getHumanReadableDate(displayMember.dob?.date)
  } else return null
}

export const average = (array) => {
  var i = 0,
    sum = 0,
    len = array.length
  while (i < len) {
    sum = sum + array[i++]
  }
  return sum / len
}

export const parseMemberCount = (number) => {
  if (number === 1) {
    return number + ' Member'
  }
  return number + ' Members'
}
export const getMemberCount = (servant) => {
  if (!servant?.memberCount) {
    return
  }
  return (
    parseMemberCount(servant?.memberCount) +
    ', ' +
    servant?.basontaMembershipCount +
    ' in Ministries'
  )
}
export const getChurchCount = (servant) => {
  let churchesCount = ''

  if (servant?.leadsGatheringServiceCount) {
    if (churchesCount) {
      churchesCount = churchesCount + ','
    }

    if (servant.leadsGatheringServiceCount === 1) {
      churchesCount = servant.leadsGatheringServiceCount + ' Gathering Service'
    } else {
      churchesCount = servant.leadsGatheringServiceCount + ' Gathering Services'
    }
  }

  if (servant?.leadsCouncilCount) {
    if (churchesCount) {
      churchesCount = churchesCount + ','
    }

    if (servant.leadsCouncilCount === 1) {
      churchesCount =
        churchesCount + ' ' + servant.leadsCouncilCount + ' Council'
    } else {
      churchesCount =
        churchesCount + ' ' + servant.leadsCouncilCount + ' Councils'
    }
  }

  if (servant?.leadsConstituencyCount) {
    if (churchesCount) {
      churchesCount = churchesCount + ','

      if (servant.leadsConstituencyCount === 1) {
        churchesCount =
          churchesCount + ' ' + servant.leadsConstituencyCount + ' Constituency'
      } else {
        churchesCount =
          churchesCount +
          ' ' +
          servant.leadsConstituencyCount +
          ' Constituencies'
      }
    } else if (servant.leadsConstituencyCount === 1) {
      churchesCount = servant.leadsConstituencyCount + ' Constituency'
    } else {
      churchesCount = servant.leadsConstituencyCount + ' Constituencies'
    }
  }

  if (servant?.leadsBacentaCount) {
    if (churchesCount) {
      churchesCount = churchesCount + ','

      if (servant.leadsBacentaCount === 1) {
        churchesCount =
          churchesCount + ' ' + servant.leadsBacentaCount + ' Bacenta'
      } else {
        churchesCount =
          churchesCount + ' ' + servant.leadsBacentaCount + ' Bacentas'
      }
    } else if (servant.leadsBacentaCount === 1) {
      churchesCount = servant.leadsBacentaCount + ' Bacenta'
    } else {
      churchesCount = servant.leadsBacentaCount + ' Bacentas'
    }
  }

  if (servant?.leadsFellowshipCount) {
    if (churchesCount) {
      churchesCount = churchesCount + ','

      if (servant.leadsFellowshipCount === 1) {
        churchesCount =
          churchesCount + ' ' + servant.leadsFellowshipCount + ' Fellowship'
      } else {
        churchesCount =
          churchesCount + ' ' + servant.leadsFellowshipCount + ' Fellowships'
      }
    } else if (servant.leadsFellowshipCount === 1) {
      churchesCount = servant.leadsFellowshipCount + ' Fellowship'
    } else {
      churchesCount = servant.leadsFellowshipCount + ' Fellowships'
    }
  }

  return churchesCount
}

export const getWeekNumber = (date) => {
  const currentdate = date ? new Date(date) : new Date()
  const oneJan = new Date(currentdate.getFullYear(), 0, 1)
  const adjustedForMonday = 8 - oneJan.getDay() //Checking the number of days till Monday when the week starts
  oneJan.setDate(oneJan.getDate() + adjustedForMonday)
  const numberOfDays = Math.floor(
    (currentdate - oneJan) / (24 * 60 * 60 * 1000)
  )

  const result = Math.ceil(numberOfDays / 7)

  return result
}
