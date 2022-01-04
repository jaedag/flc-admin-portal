import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../../components/DisplayChurchDetails/DisplayChurchDetails'
import { DISPLAY_FELLOWSHIP, DISPLAY_FELLOWSHIP_HISTORY } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { getWeekNumber, last3Weeks, throwErrorMsg } from 'global-utils'

const DetailsFellowship = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const {
    data: fellowshipData,
    loading: fellowshipLoading,
    error: fellowshipError,
  } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
  })
  const { data: historyData } = useQuery(DISPLAY_FELLOWSHIP_HISTORY, {
    variables: { id: fellowshipId },
  })
  throwErrorMsg(fellowshipError)
  const fellowship = fellowshipData?.fellowships[0]
  const history = historyData?.fellowships[0]

  let breadcrumb = [
    fellowship?.bacenta?.constituency?.council,
    fellowship?.bacenta?.constituency,
    fellowship?.bacenta,
    fellowship,
  ]
  if (!fellowship?.bacenta) {
    breadcrumb = [fellowship]
  }

  const lastFilledServices = history?.services.map((service) => service.week)
  const lastFilledBanking = history?.services.map(
    (service) => service.bankingSlip
  )

  const check = last3Weeks()?.map((week, i) => {
    if (lastFilledServices?.includes(week)) {
      return {
        number: week,
        filled: true,
        banked:
          lastFilledBanking?.length && (lastFilledBanking[i] ? true : false),
      }
    } else {
      return {
        number: week,
        filled: false,
        banked: null,
      }
    }
  })

  let fellowshipType = fellowshipData && 'Fellowship',
    vacation = fellowshipData && 'Active'

  if (fellowship?.labels.includes('ChurchPlanter')) {
    fellowshipType = 'IC'
  }
  if (fellowship?.labels.includes('Vacation')) {
    vacation = 'Vacation'
  }

  const details = [
    {
      title: 'Status',
      number: vacation,
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
        'adminGatheringService',
        'adminCouncil',
        'adminConstituency',
      ]}
      weekNumber={getWeekNumber()}
      last3Weeks={fellowship && check}
      history={history?.history.length && history?.history}
      breadcrumb={breadcrumb && breadcrumb}
    />
  )
}

export default DetailsFellowship
