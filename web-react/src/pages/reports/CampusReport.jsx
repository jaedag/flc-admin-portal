import React, { useContext } from 'react'

import { ChurchContext } from '../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { CAMPUS_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'

export const CampusReport = () => {
  const { campusId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(CAMPUS_REPORT, {
    variables: { campusId: campusId },
  })

  const churchData = getServiceGraphData(data?.campuses[0])

  return (
    <BaseComponent loadingState={loading} errorState={error} data={data}>
      <div className="container">
        <div className=" my-3">
          <h5 className="mb-0">{`${data?.campuses[0].name} Campus`}</h5>{' '}
          <p>
            <span className="text-secondary font-weight-bold">Leader: </span>
            {`${data?.campuses[0].leader.fullName}`}
          </p>
        </div>

        <div className="row">
          <div className="col">
            <MembershipCard
              link="/campus/members"
              title="Membership"
              count={data?.campusMemberCount}
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
    </BaseComponent>
  )
}

export default CampusReport
