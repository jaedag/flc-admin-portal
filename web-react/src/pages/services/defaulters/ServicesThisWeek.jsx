import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber } from 'global-utils'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_SERVICES_LIST,
  COUNCIL_SERVICES_LIST,
  STREAM_SERVICES_LIST,
  GATHERINGSERVICE_SERVICES_LIST,
} from './DefaultersQueries'
import DefaulterCard from './DefaulterCard'
import PlaceholderDefaulter from './PlaceholderDefaulter'

const ServicesThisWeek = () => {
  const { currentUser } = useContext(MemberContext)
  const [church, setChurch] = useState(null)
  const [constituencyServicesThisWeek, { data: constituencyData }] =
    useLazyQuery(CONSTITUENCY_SERVICES_LIST)
  const [councilServicesThisWeek, { data: councilData }] = useLazyQuery(
    COUNCIL_SERVICES_LIST
  )
  const [streamServicesThisWeek, { data: streamData }] =
    useLazyQuery(STREAM_SERVICES_LIST)
  const [gatheringServiceThisWeek, { data: gatheringServiceData }] =
    useLazyQuery(GATHERINGSERVICE_SERVICES_LIST)

  useEffect(() => {
    if (currentUser.currentChurch.__typename === 'Constituency') {
      constituencyServicesThisWeek({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(constituencyData?.constituencies[0])
    }
    if (currentUser.currentChurch.__typename === 'Council') {
      councilServicesThisWeek({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(councilData?.councils[0])
    }
    if (currentUser.currentChurch.__typename === 'Stream') {
      streamServicesThisWeek({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(streamData?.streams[0])
    }
    if (currentUser.currentChurch.__typename === 'GatheringService') {
      gatheringServiceThisWeek({
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
        {!church && <PlaceholderDefaulter />}
      </Row>
    </Container>
  )
}

export default ServicesThisWeek
