import React, { useContext } from 'react'

import { ChurchContext } from '../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { TOWN_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'

export const TownReport = () => {
  const { townId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(TOWN_REPORT, {
    variables: { townId: townId },
  })

  const churchData = getServiceGraphData(data?.towns[0])

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <Container>
        <PlaceholderCustom loading={loading} as="h5" xs={10}>
          <h5 className="mb-0">{`${data?.towns[0].name} Town`}</h5>
        </PlaceholderCustom>
        <PlaceholderCustom loading={loading} as="span" xs={10}>
          <span className="text-secondary font-weight-bold">
            {`Leader: ${data?.towns[0].leader.fullName}`}
          </span>
        </PlaceholderCustom>

        <Row className="mt-3">
          <Col>
            <MembershipCard
              link="/town/members"
              title="Membership"
              count={data?.towns[0].memberCount}
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

export default TownReport
