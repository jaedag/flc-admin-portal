import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../../components/DisplayChurchDetails/DisplayChurchDetails'
import { DISPLAY_FELLOWSHIP, DISPLAY_FELLOWSHIP_HISTORY } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { throwErrorMsg } from 'global-utils'
import { last3Weeks, getWeekNumber } from 'date-utils'
import { permitAdmin } from 'permission-utils'

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

  const details = [
    {
      title: 'Status',
      number: fellowship?.vacationStatus,
      link: '#',
      width: '',
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
      editPermitted={permitAdmin('Constituency')}
      weekNumber={getWeekNumber()}
      last3Weeks={fellowship && check}
      vacation={fellowship?.vacationStatus && true}
      history={history?.history.length && history?.history}
      breadcrumb={breadcrumb && breadcrumb}
    />
  )
}

export default DetailsFellowship
