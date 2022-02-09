import React, { useContext } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { GATHERINGSERVICE_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'

const GatheringServiceReport = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GATHERINGSERVICE_REPORT, {
    variables: { gatheringServiceId: gatheringServiceId },
  })

  const churchData = getServiceGraphData(data?.gatheringServices[0])

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <Container>
        <PlaceholderCustom loading={loading} as="h5" xs={10}>
          <h5 className="mb-0">{`${data?.gatheringServices[0]?.name} GatheringService`}</h5>
        </PlaceholderCustom>
        <PlaceholderCustom loading={loading} as="span" xs={10}>
          <span className="text-secondary font-weight-bold">
            {`Leader: ${data?.gatheringServices[0]?.leader.fullName}`}
          </span>
        </PlaceholderCustom>

        <Row className="mt-3">
          <Col>
            <MembershipCard
              link="/gatheringService/members"
              title="Membership"
              count={data?.gatheringServices[0]?.memberCount}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StatDisplay
              title="Avg Weekly Attendance"
              statistic={getMonthlyStatAverage(churchData, 'attendance')}
            />
          </Col>

          <Col>
            <StatDisplay
              title="Avg Weekly Income"
              statistic={getMonthlyStatAverage(churchData, 'income')}
            />
          </Col>
        </Row>
        <ChurchGraph
          loading={loading}
          stat1="attendance"
          stat2="income"
          churchData={churchData}
          church="gatheringservice"
        />
      </Container>
    </BaseComponent>
  )
}

export default GatheringServiceReport
