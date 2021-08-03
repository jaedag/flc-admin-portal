import React, { useContext } from 'react'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { BACENTA_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'

export const BacentaReport = () => {
  const { bacentaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(BACENTA_REPORT, {
    variables: { bacentaId: bacentaId },
  })

  const serviceData = getServiceGraphData(data?.bacentas[0])

  return (
    <BaseComponent loadingState={loading} errorState={error} data={data}>
      <NavBar />
      <div className="container">
        <div className=" my-3">
          <h5 className="mb-0">{`${data?.bacentas[0].name} Bacenta`}</h5>{' '}
          <p>
            <span className="text-secondary font-weight-bold">Leader: </span>
            {`${data?.bacentas[0].leader?.fullName}`}
          </p>
        </div>

        <div className="row">
          <div className="col">
            <MembershipCard
              link="/bacenta/members"
              title="Membership"
              count={data?.bacentaMemberCount}
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
        />
      </div>
    </BaseComponent>
  )
}

export default BacentaReport
