import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber } from 'date-utils'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_FORM_DEFAULTERS_LIST,
  COUNCIL_FORM_DEFAULTERS_LIST,
  STREAM_FORM_DEFAULTERS_LIST,
  GATHERINGSERVICE_FORM_DEFAULTERS_LIST,
} from './DefaultersQueries'
import DefaulterCard from './DefaulterCard'
import PlaceholderDefaulter from './PlaceholderDefaulter'

const FormDefaulters = () => {
  const { currentUser } = useContext(MemberContext)
  const [church, setChurch] = useState(null)
  const [constituencyFormDefaulters, { data: constituencyData }] = useLazyQuery(
    CONSTITUENCY_FORM_DEFAULTERS_LIST
  )
  const [councilFormDefaulters, { data: councilData }] = useLazyQuery(
    COUNCIL_FORM_DEFAULTERS_LIST
  )
  const [streamFormDefaulters, { data: streamData }] = useLazyQuery(
    STREAM_FORM_DEFAULTERS_LIST
  )
  const [gatheringServiceFormDefaulters, { data: gatheringServiceData }] =
    useLazyQuery(GATHERINGSERVICE_FORM_DEFAULTERS_LIST)

  useEffect(() => {
    if (currentUser.currentChurch.__typename === 'Constituency') {
      constituencyFormDefaulters({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(constituencyData?.constituencies[0])
    }
    if (currentUser.currentChurch.__typename === 'Council') {
      councilFormDefaulters({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(councilData?.councils[0])
    }
    if (currentUser.currentChurch.__typename === 'Stream') {
      streamFormDefaulters({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(streamData?.streams[0])
    }
    if (currentUser.currentChurch.__typename === 'GatheringService') {
      gatheringServiceFormDefaulters({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(gatheringServiceData?.gatheringServices[0])
    }
  }, [
    currentUser.currentChurch,
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
      <HeadingSecondary>
        {`Fellowships That Have Not Filled The Form This Week (Week ${getWeekNumber()})`}
      </HeadingSecondary>

      <PlaceholderCustom
        as="h6"
        loading={!church?.formDefaultersThisWeek.length}
      >
        <h6>{`Number of Defaulters: ${church?.formDefaultersThisWeek.length}`}</h6>
      </PlaceholderCustom>

      <Row>
        {church?.formDefaultersThisWeek.map((defaulter, i) => (
          <Col key={i} xs={12} className="mb-3">
            <DefaulterCard defaulter={defaulter} />
          </Col>
        ))}
        {!church && <PlaceholderDefaulter />}
      </Row>
    </Container>
  )
}

export default FormDefaulters
