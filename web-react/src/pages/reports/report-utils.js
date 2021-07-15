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
    if (array[0]?.__typename === 'ComponentServiceAggregate') {
      array.map((record) => {
        data.push({
          date: parseNeoDate(record?.serviceDate),
          week: record.week.low,
          attendance: record.attendance?.low || record.attendance,
          income: record.income,
        })
      })

      return
    }

    array.map((record) => {
      data.push({
        date: record?.serviceDate?.date
          ? parseNeoDate(record?.serviceDate?.date)
          : record.date,
        week: record.week,
        attendance: record.attendance?.low || record.attendance,
        income: record.income,
      })
    })
  }

  if (church.__typename === 'Centre') {
    pushIntoData(church.bacentaServiceAggregate) //Push in Bacenta Service Aggregates
  }

  if (church.__typename === ('Campus' || 'Town')) {
    pushIntoData(church.componentServiceAggregate) //Push in Bacenta Service Aggregates
  }
  //Pushing in direct service data eg. Joint Services and Bacenta Services
  church.services.map((service) => {
    pushIntoData(service.serviceRecords)
  })

  data = data.sort(sortingFunction('week'))

  return data.slice(data.length - numberOfWeeks, data.length)
}
