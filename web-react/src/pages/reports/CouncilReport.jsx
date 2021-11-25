import React, { useContext } from 'react'

import { ChurchContext } from '../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { COUNCIL_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'

const CouncilReport = () => {
  const { councilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(COUNCIL_REPORT, {
    variables: { councilId: councilId },
  })

  const churchData = getServiceGraphData(data?.councils[0])

  return (
    <BaseComponent
      loadingState={loading}
      errorState={error}
      data={data}
      placeholder
    >
      <Container>
        <PlaceholderCustom loading={loading} as="h5" xs={10}>
          <h5 className="mb-0">{`${data?.councils[0]?.name} Council`}</h5>
        </PlaceholderCustom>
        <PlaceholderCustom loading={loading} as="span" xs={10}>
          <span className="text-secondary font-weight-bold">
            {`Leader: ${data?.councils[0]?.leader.fullName}`}
          </span>
        </PlaceholderCustom>

        <Row className="mt-3">
          <Col>
            <MembershipCard
              link="/town/members"
              title="Membership"
              count={data?.councils[0]?.memberCount}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StatDisplay
              title="Avg Attendance"
              statistic={getMonthlyStatAverage(churchData, 'attendance')}
            />
          </Col>

          <Col>
            <StatDisplay
              title="Avg Income"
              statistic={getMonthlyStatAverage(churchData, 'income')}
            />
          </Col>
        </Row>
        <ChurchGraph
          loading={loading}
          stat1="attendance"
          stat2="income"
          churchData={churchData}
        />
      </Container>
    </BaseComponent>
  )
}

export default CouncilReport
