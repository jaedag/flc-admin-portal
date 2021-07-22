import React, { useContext } from 'react'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import ErrorScreen from '../../components/base-component/ErrorScreen'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { CAMPUS_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'

export const CampusReport = () => {
  const { campusId } = useContext(ChurchContext)

  const { data, loading } = useQuery(CAMPUS_REPORT, {
    variables: { campusId: campusId },
  })

  if (loading) {
    return <LoadingScreen />
  } else if (data) {
    const { campuses, campusMemberCount } = data
    const churchData = getServiceGraphData(campuses[0])

    return (
      <>
        <NavBar />
        <div className="container">
          <div className=" my-3">
            <h5 className="mb-0">{`${campuses[0].name} Campus`}</h5>{' '}
            <p>
              <span className="text-secondary font-weight-bold">Leader: </span>
              {`${campuses[0].leader.fullName}`}
            </p>
          </div>

          <div className="row">
            <div className="col">
              <MembershipCard
                link="/campus/members"
                title="Membership"
                count={campusMemberCount}
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

export default CampusReport
