import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber } from 'global-utils'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_CANCELLED_SERVICES_LIST,
  COUNCIL_CANCELLED_SERVICES_LIST,
  STREAM_CANCELLED_SERVICES_LIST,
  GATHERINGSERVICE_CANCELLED_SERVICES_LIST,
} from './DefaultersQueries'
import DefaulterCard from './DefaulterCard'
import PlaceholderDefaulter from './PlaceholderDefaulter'

const CancelledServicesThisWeek = () => {
  const { currentUser } = useContext(MemberContext)
  const [church, setChurch] = useState(null)
  const [constituencyCancelledServices, { data: constituencyData }] =
    useLazyQuery(CONSTITUENCY_CANCELLED_SERVICES_LIST)
  const [councilCancelledServices, { data: councilData }] = useLazyQuery(
    COUNCIL_CANCELLED_SERVICES_LIST
  )
  const [streamCancelledServices, { data: streamData }] = useLazyQuery(
    STREAM_CANCELLED_SERVICES_LIST
  )
  const [gatheringServiceCancelledServices, { data: gatheringServiceData }] =
    useLazyQuery(GATHERINGSERVICE_CANCELLED_SERVICES_LIST)

  useEffect(() => {
    if (currentUser.currentChurch.__typename === 'Constituency') {
      constituencyCancelledServices({
        variables: {
          id: currentUser.constituency,
        },
      })
      setChurch(constituencyData?.constituencies[0])
    }
    if (currentUser.currentChurch.__typename === 'Council') {
      councilCancelledServices({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(councilData?.councils[0])
    }
    if (currentUser.currentChurch.__typename === 'Stream') {
      streamCancelledServices({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(streamData?.streams[0])
    }
    if (currentUser.currentChurch.__typename === 'GatheringService') {
      gatheringServiceCancelledServices({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(gatheringServiceData?.gatheringServices[0])
    }
  }, [
    currentUser.constituency,
    constituencyData,
    councilData,
    streamData,
    gatheringServiceData,
  ])

  return (
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
  )
}

export default CancelledServicesThisWeek
