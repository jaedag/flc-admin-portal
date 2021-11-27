import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'
import { DISPLAY_BACENTA } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import { throwErrorMsg } from 'global-utils'

const DetailsBacenta = () => {
  const { bacentaId } = useContext(ChurchContext)

  const {
    data: bacentaData,
    loading: bacentaLoading,
    error: bacentaError,
  } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })
  throwErrorMsg(bacentaError)
  const bacenta = bacentaData?.bacentas[0]

  let breadcrumb = [
    bacenta?.centre?.town?.bishop ?? bacenta?.centre?.campus?.bishop,
    bacenta?.centre?.town ? bacenta?.centre?.town : bacenta?.centre?.campus,
    bacenta?.centre,
    bacenta,
  ]
  if (!bacenta?.centre) {
    breadcrumb = [bacenta]
  }
  const getWeekNumber = (date) => {
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

  const last3Weeks = [getWeekNumber(), getWeekNumber() - 1, getWeekNumber() - 2]
  const lastFilledServices = bacenta?.services[0]?.serviceRecords.map(
    (service) => service.week
  )

  const check = last3Weeks?.map((week) => {
    if (lastFilledServices?.includes(week)) {
      return { number: week, filled: true }
    } else {
      return {
        number: week,
        filled: false,
      }
    }
  })

  let bacentaType, vacation
  if (bacenta?.labels.includes('ActiveBacenta')) {
    bacentaType = 'Bacenta'
  }
  if (bacenta?.labels.includes('ChurchPlanter')) {
    bacentaType = 'IC'
  }
  if (bacenta?.labels.includes('Vacation')) {
    vacation = true
  }

  return (
    <DisplayChurchDetails
      loading={bacentaLoading}
      name={bacenta?.name}
      bankingCode={bacenta?.bankingCode}
      bacentaType={bacentaType}
      active={vacation ? 'Vacation' : 'Active'}
      leaderTitle="Bacenta Leader"
      leader={bacenta?.leader}
      location={bacenta?.location}
      membership={bacentaData?.bacentaMemberCount}
      churchHeading="Meeting Day"
      churchCount={bacenta?.meetingDay?.day}
      churchType="Bacenta"
      buttons={['']}
      editlink="/bacenta/editbacenta"
      editPermitted={[
        'leaderBacenta',
        'adminFederal',
        'adminTown',
        'adminCampus',
      ]}
      weekNumber={getWeekNumber()}
      last3Weeks={check}
      history={bacenta?.history.length !== 0 && bacenta?.history}
      breadcrumb={breadcrumb && breadcrumb}
    />
  )
}

export default DetailsBacenta
