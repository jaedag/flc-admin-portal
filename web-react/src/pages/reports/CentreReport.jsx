import React, { useContext } from 'react'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { CENTRE_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'

export const CentreReport = () => {
  const { centreId } = useContext(ChurchContext)

  const { data, loading } = useQuery(CENTRE_REPORT, {
    variables: { centreId: centreId },
  })

  if (loading) {
    return <LoadingScreen />
  } else if (data) {
    const { centres, centreMemberCount } = data
    const churchData = getServiceGraphData(centres[0])

    return (
      <>
        <NavBar />
        <div className="container">
          <div className=" my-3">
            <h5 className="mb-0">{`${centres[0].name} Centre`}</h5>{' '}
            <p>
              <span className="text-secondary font-weight-bold">Leader: </span>
              {`${centres[0].leader.fullName}`}
            </p>
          </div>

          <div className="row">
            <div className="col">
              <MembershipCard
                link="/centre/members"
                title="Membership"
                count={centreMemberCount}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <StatDisplay
                title="Avg Attendance"
                statistic={getMonthlyStatAverage(churchData, 'attendance')}
              />
            </div>

            <div className="col">
              <StatDisplay
                title="Avg Income"
                statistic={getMonthlyStatAverage(churchData, 'income')}
              />
            </div>
          </div>
          <ChurchGraph
            stat1="attendance"
            stat2="income"
            churchData={churchData}
          />
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default CentreReport
