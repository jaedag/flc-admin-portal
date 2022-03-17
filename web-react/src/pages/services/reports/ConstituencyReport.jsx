import React, { useContext } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { CONSTITUENCY_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'

export const ConstituencyReport = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(CONSTITUENCY_REPORT, {
    variables: { id: constituencyId },
  })

  const churchData = getServiceGraphData(data?.constituencies[0])

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="container">
        <div className=" my-3">
          <h5 className="mb-0">{`${data?.constituencies[0].name} Constituency`}</h5>{' '}
          <p>
            <span className="text-secondary font-weight-bold">Leader: </span>
            {`${data?.constituencies[0].leader.fullName}`}
          </p>
        </div>

        <div className="row">
          <div className="col">
            <MembershipCard
              link="/constituency/members"
              title="Membership"
              count={data?.constituencies[0].memberCount}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <StatDisplay
              title="Avg Weekly Attendance"
              statistic={getMonthlyStatAverage(churchData, 'attendance')}
            />
          </div>

          <div className="col">
            <StatDisplay
              title="Avg Weekly Income"
              statistic={getMonthlyStatAverage(churchData, 'income')}
            />
          </div>
        </div>
        <ChurchGraph
          stat1="attendance"
          stat2="income"
          churchData={churchData}
          church="constituency"
        />
      </div>
    </BaseComponent>
  )
}

export default ConstituencyReport
