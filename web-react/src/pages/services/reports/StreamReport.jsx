import React, { useContext } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './report-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { STREAM_REPORT } from './ReportQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'

const StreamReport = () => {
  const { streamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(STREAM_REPORT, {
    variables: { streamId: streamId },
  })

  const churchData = getServiceGraphData(data?.streams[0])

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <Container>
        <PlaceholderCustom loading={loading} as="h5" xs={10}>
          <h5 className="mb-0">{`${data?.streams[0]?.name} Stream`}</h5>
        </PlaceholderCustom>
        <PlaceholderCustom loading={loading} as="span" xs={10}>
          <span className="text-secondary font-weight-bold">
            {`Leader: ${data?.streams[0]?.leader.fullName}`}
          </span>
        </PlaceholderCustom>

        <Row className="mt-3">
          <Col>
            <MembershipCard
              link="/stream/members"
              title="Membership"
              count={data?.streams[0]?.memberCount}
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
          church="stream"
        />
      </Container>
    </BaseComponent>
  )
}

export default StreamReport
