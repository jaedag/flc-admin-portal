import React, { useContext } from 'react'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { SONTA_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'

export const SontaReport = () => {
  const { sontaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(SONTA_REPORT, {
    variables: { sontaId: sontaId },
  })

  const churchData = getServiceGraphData(data?.sontas[0])

  return (
    <BaseComponent loadingState={loading} errorState={error} data={data}>
      <NavBar />
      <div className="container">
        <div className=" my-3">
          <h5 className="mb-0">{`${data?.sontas[0].name} Sonta`}</h5>{' '}
          <p>
            <span className="text-secondary font-weight-bold">Leader: </span>
            {`${data?.sontas[0].leader.fullName}`}
          </p>
        </div>

        <div className="row">
          <div className="col">
            <MembershipCard
              link="/sonta/members"
              title="Membership"
              count={data?.sontaMemberCount}
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
          stat1="attendance"
          // stat2="service"
          churchData={churchData}
        />
      </div>
    </BaseComponent>
  )
}

export default SontaReport
