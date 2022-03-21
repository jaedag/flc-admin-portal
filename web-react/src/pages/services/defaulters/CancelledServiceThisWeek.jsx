import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'date-utils'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_CANCELLED_SERVICES_LIST,
  COUNCIL_CANCELLED_SERVICES_LIST,
  STREAM_CANCELLED_SERVICES_LIST,
  GATHERINGSERVICE_CANCELLED_SERVICES_LIST,
} from './DefaultersQueries'
import DefaulterCard from './DefaulterCard'
import PlaceholderDefaulter from './PlaceholderDefaulter'
import BaseComponent from 'components/base-component/BaseComponent'
import useChurchLevel from 'hooks/useChurchLevel'

const CancelledServicesThisWeek = () => {
  const [constituencyCancelledServices] = useLazyQuery(
    CONSTITUENCY_CANCELLED_SERVICES_LIST
  )
  const [councilCancelledServices] = useLazyQuery(
    COUNCIL_CANCELLED_SERVICES_LIST
  )
  const [streamCancelledServices] = useLazyQuery(STREAM_CANCELLED_SERVICES_LIST)
  const [gatheringServiceCancelledServices] = useLazyQuery(
    GATHERINGSERVICE_CANCELLED_SERVICES_LIST
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyCancelledServices,
    councilFunction: councilCancelledServices,
    streamFunction: streamCancelledServices,
    gatheringServiceFunction: gatheringServiceCancelledServices,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary
          loading={!church}
        >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
        <HeadingSecondary>{`Cancelled Services This Week (Week ${getWeekNumber()})`}</HeadingSecondary>

        <PlaceholderCustom
          as="h6"
          loading={!church?.cancelledServicesThisWeek.length}
        >
          <h6>{`Number of Cancelled Services: ${church?.cancelledServicesThisWeek.length}`}</h6>
        </PlaceholderCustom>

        <Row>
          {church?.cancelledServicesThisWeek.map((service, i) => (
            <Col key={i} xs={12} className="mb-3">
              <DefaulterCard defaulter={service} />
            </Col>
          ))}
          {!church && <PlaceholderDefaulter />}
        </Row>
      </Container>
    </BaseComponent>
  )
}

export default CancelledServicesThisWeek
