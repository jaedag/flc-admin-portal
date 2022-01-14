import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber, isAuthorised } from 'global-utils'
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
    if (
      isAuthorised(
        ['adminConstituency', 'leaderConstituency'],
        currentUser.roles
      )
    ) {
      constituencyFormDefaulters({
        variables: {
          id: currentUser.constituency,
        },
      })
      setChurch(constituencyData?.constituencies[0])
    }
    if (isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)) {
      councilFormDefaulters({
        variables: {
          id: currentUser.council,
        },
      })
      setChurch(councilData?.councils[0])
    }
    if (isAuthorised(['adminStream', 'leaderStream'], currentUser.roles)) {
      streamFormDefaulters({
        variables: {
          id: currentUser.stream,
        },
      })
      setChurch(streamData?.streams[0])
    }
    if (
      isAuthorised(
        ['adminGatheringService', 'leaderGatheringService'],
        currentUser.roles
      )
    ) {
      gatheringServiceFormDefaulters({
        variables: {
          id: currentUser.gatheringService,
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
