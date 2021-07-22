import React, { useContext } from 'react'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import ErrorScreen from '../../components/base-component/ErrorScreen'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { SONTA_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'

export const SontaReport = () => {
  const { sontaId } = useContext(ChurchContext)

  const { data, loading } = useQuery(SONTA_REPORT, {
    variables: { sontaId: sontaId },
  })

  if (loading) {
    return <LoadingScreen />
  } else if (data) {
    const { sontas, sontaMemberCount } = data
    const churchData = getServiceGraphData(sontas[0])

    return (
      <>
        <NavBar />
        <div className="container">
          <div className=" my-3">
            <h5 className="mb-0">{`${sontas[0].name} Sonta`}</h5>{' '}
            <p>
              <span className="text-secondary font-weight-bold">Leader: </span>
              {`${sontas[0].leader.fullName}`}
            </p>
          </div>

          <div className="row">
            <div className="col">
              <MembershipCard
                link="/sonta/members"
                title="Membership"
                count={sontaMemberCount}
              />
            </div>
          </div>
          <div className="row row-cols-2 mt-3">
            <div className="col">
              <StatDisplay
                title="Avg Rehearsal Attendance"
                statistic={getMonthlyStatAverage(churchData, 'rehearsal')}
              />
            </div>

            <div className="col">
              <StatDisplay
                title="Avg Service Attendance"
                statistic={getMonthlyStatAverage(churchData, 'sunday')}
              />
            </div>
          </div>
          <ChurchGraph
            stat1="rehearsal"
            stat2="service"
            churchData={churchData}
          />
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default SontaReport
