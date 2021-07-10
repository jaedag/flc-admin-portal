import { average, parseNeoDate } from 'global-utils'

const numberOfWeeks = 4
export const getMonthlyStatAverage = (data, stat) => {
  const statArray = data.map((service) => service[`${stat}`])
  //Calculate average of the last four weeks of service
  return average(statArray.slice(-numberOfWeeks)).toFixed(2)
}

export const sortingFunction = (key, order = 'asc') => {
  //used for sorting services data according to date
  return function innerSort(a, b) {
    // eslint-disable-next-line no-prototype-builtins
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      //property doesn't exist on either object
      return 0
    }

    const varA = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key]
    const varB = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}

export const getServiceGraphData = (church) => {
  let data = []

  const pushIntoData = (array) => {
    array.map((record) => {
      data.push({
        date: record?.serviceDate?.date
          ? parseNeoDate(record?.serviceDate?.date)
          : record.date,
        attendance: record.attendance,
        income: record.income,
      })
    })
  }

  if (church.__typename === 'Centre') {
    church.services.map((service) => {
      pushIntoData(service.serviceRecords) //if there was a centre joint
      // console.log(data)
      pushIntoData(combineSameDayServices(service.centreBacentaRecords))
      // console.log(data)
    })
  }

  if (church.__typename === 'Bacenta') {
    church.services.map((service) => {
      pushIntoData(service.serviceRecords)
    })
  }
  data = data.sort(sortingFunction('date'))

  return data.slice(0, numberOfWeeks)
}

//Helper Functions
const combineSameDayServices = (servicesArray) => {
  let servicesOnDate = []

  //Code to Obtain the Unique Dates from the Bacenta Services under a Centre
  //Since many bacentas could have had service on the same day, the date would be repeated
  let dates = servicesArray.map((bacentaServices) => {
    if (!bacentaServices?.serviceDate.date) {
      return null
    }
    return parseNeoDate(bacentaServices.serviceDate.date)
  })

  const uniqueDates = [...new Set(dates)]

  for (let i = 0; i < uniqueDates.length; i++) {
    //Loops through the unique dates to find the services that happened on that day
    //and extract them into a variable called 'addingServices'

    let addingServices = { attendance: 0, income: 0, date: '' }
    servicesArray.map((bacentaService) => {
      if (parseNeoDate(bacentaService?.serviceDate.date) === uniqueDates[i]) {
        //if the service is seen to have happened on date i...
        addingServices.date = uniqueDates[i]
        addingServices.attendance += bacentaService.attendance
        addingServices.income += bacentaService.income
      }
    })
    if (addingServices.date !== '') servicesOnDate.push(addingServices)
  }

  return servicesOnDate
}
