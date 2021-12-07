import React, { useContext } from 'react'

import { ChurchContext } from '../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { FELLOWSHIP_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'

export const FellowshipReport = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(FELLOWSHIP_REPORT, {
    variables: { fellowshipId: fellowshipId },
  })

  const serviceData = getServiceGraphData(data?.fellowships[0])

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="container">
        <div className=" my-3">
          <h5 className="mb-0">{`${data?.fellowships[0].name} Fellowship`}</h5>{' '}
          <p>
            <span className="text-secondary font-weight-bold">Leader: </span>
            {`${data?.fellowships[0].leader?.fullName}`}
          </p>
        </div>

        <div className="row">
          <div className="col">
            <MembershipCard
              link="/fellowship/members"
              title="Membership"
              count={data?.fellowships[0].memberCount}
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
          stat1="attendance"
          stat2="income"
          churchData={serviceData}
          church="fellowship"
        />
      </div>
    </BaseComponent>
  )
}

export default FellowshipReport
