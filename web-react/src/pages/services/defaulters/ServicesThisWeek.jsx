import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'date-utils'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_SERVICES_LIST,
  COUNCIL_SERVICES_LIST,
  STREAM_SERVICES_LIST,
  GATHERINGSERVICE_SERVICES_LIST,
} from './DefaultersQueries'
import DefaulterCard from './DefaulterCard'
import useChurchLevel from 'hooks/useChurchLevel'
import BaseComponent from 'components/base-component/BaseComponent'
import PlaceholderDefaulterList from './PlaceholderDefaulterList'

const ServicesThisWeek = () => {
  const [constituencyServicesThisWeek] = useLazyQuery(
    CONSTITUENCY_SERVICES_LIST
  )
  const [councilServicesThisWeek] = useLazyQuery(COUNCIL_SERVICES_LIST)
  const [streamServicesThisWeek] = useLazyQuery(STREAM_SERVICES_LIST)
  const [gatheringServiceThisWeek] = useLazyQuery(
    GATHERINGSERVICE_SERVICES_LIST
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyServicesThisWeek,
    councilFunction: councilServicesThisWeek,
    streamFunction: streamServicesThisWeek,
    gatheringServiceFunction: gatheringServiceThisWeek,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary
          loading={!church}
        >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
        <HeadingSecondary>{`Forms Filled This Week (Week ${getWeekNumber()})`}</HeadingSecondary>

        <PlaceholderCustom as="h6" loading={!church?.servicesThisWeek.length}>
          <h6>{`Forms Filled This Week: ${church?.servicesThisWeek.length}`}</h6>
        </PlaceholderCustom>

        <Row>
          {church?.servicesThisWeek.map((service, i) => (
            <Col key={i} xs={12} className="mb-3">
              <DefaulterCard
                defaulter={service}
                link="/fellowship/service-details"
              />
            </Col>
          ))}
          {!church && <PlaceholderDefaulterList />}
        </Row>
      </Container>
    </BaseComponent>
  )
}

export default ServicesThisWeek
