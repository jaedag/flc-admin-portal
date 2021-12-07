import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'
import { DISPLAY_FELLOWSHIP } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import { throwErrorMsg } from 'global-utils'

const DetailsFellowship = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const {
    data: fellowshipData,
    loading: fellowshipLoading,
    error: fellowshipError,
  } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
  })
  throwErrorMsg(fellowshipError)
  const fellowship = fellowshipData?.fellowships[0]

  let breadcrumb = [
    fellowship?.bacenta?.town?.council ?? fellowship?.bacenta?.campus?.council,
    fellowship?.bacenta?.town
      ? fellowship?.bacenta?.town
      : fellowship?.bacenta?.campus,
    fellowship?.bacenta,
    fellowship,
  ]
  if (!fellowship?.bacenta) {
    breadcrumb = [fellowship]
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
  const lastFilledServices = fellowship?.serviceLogs[0]?.serviceRecords.map(
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

  let fellowshipType = 'Fellowship',
    vacation

  if (fellowship?.labels.includes('ChurchPlanter')) {
    fellowshipType = 'IC'
  }
  if (fellowship?.labels.includes('Vacation')) {
    vacation = true
  }

  const details = [
    {
      title: 'Status',
      number: vacation ? 'Vacation' : 'Active',
      link: '#',
      width: '',
    },
    {
      title: 'Type',
      number: fellowshipType,
      link: `#`,
      width: 'auto',
    },
    {
      title: 'Code',
      number: fellowship?.bankingCode,
      link: `#`,
      width: '',
    },
  ]

  return (
    <DisplayChurchDetails
      details={details}
      loading={fellowshipLoading}
      name={fellowship?.name}
      churchId={fellowshipId}
      leaderTitle="Fellowship Leader"
      leader={fellowship?.leader}
      location={fellowship?.location}
      membership={fellowship?.memberCount}
      churchHeading="Meeting Day"
      churchCount={fellowship?.meetingDay?.day}
      churchType="Fellowship"
      buttons={['']}
      editlink="/fellowship/editfellowship"
      editPermitted={[
        'leaderFellowship',
        'adminFederal',
        'adminCouncil',
        'adminTown',
        'adminCampus',
      ]}
      weekNumber={getWeekNumber()}
      last3Weeks={check}
      history={fellowship?.history.length !== 0 && fellowship?.history}
      breadcrumb={breadcrumb && breadcrumb}
    />
  )
}

export default DetailsFellowship
