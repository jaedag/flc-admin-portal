import React, { useContext } from 'react'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import './Report.css'
import { useQuery } from '@apollo/client'

import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { BACENTA_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'

export const BacentaReport = () => {
  const { bacentaId } = useContext(ChurchContext)

  const { data, loading } = useQuery(BACENTA_REPORT, {
    variables: { bacentaId: bacentaId },
  })

  if (loading) {
    return <LoadingScreen />
  } else if (data) {
    const { bacentas, bacentaMemberCount } = data
    const serviceData = getServiceGraphData(bacentas[0])

    return (
      <>
        <NavBar />
        <div className="container">
          <div className=" my-3">
            <h5 className="mb-0">{`${bacentas[0].name} Bacenta`}</h5>{' '}
            <p>
              <span className="text-secondary font-weight-bold">Leader: </span>
              {`${bacentas[0].leader.fullName}`}
            </p>
          </div>

          <div className="row">
            <div className="col">
              <MembershipCard
                link="/bacenta/members"
                title="Membership"
                count={bacentaMemberCount}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <StatDisplay
                title="Avg Attendance"
                statistic={getMonthlyStatAverage(serviceData, 'attendance')}
              />
            </div>

            <div className="col">
              <StatDisplay
                title="Avg Income"
                statistic={getMonthlyStatAverage(serviceData, 'income')}
              />
            </div>
          </div>
          <ChurchGraph
            churchData={bacentas}
            stat1="attendance"
            stat2="income"
            serviceData={serviceData}
          />
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default BacentaReport
