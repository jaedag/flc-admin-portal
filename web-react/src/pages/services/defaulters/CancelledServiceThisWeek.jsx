import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber, isAuthorised } from 'global-utils'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_CANCELLED_SERVICES_LIST,
  COUNCIL_CANCELLED_SERVICES_LIST,
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

  useEffect(() => {
    if (
      isAuthorised(
        ['adminTown', 'leaderTown', 'adminCampus', 'leaderCampus'],
        currentUser.roles
      )
    ) {
      constituencyCancelledServices({
        variables: {
          id: currentUser.constituency,
        },
      })
      setChurch(constituencyData?.constituencies[0])
    }
    if (isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)) {
      councilCancelledServices({
        variables: {
          id: currentUser.council,
        },
      })
      setChurch(councilData?.councils[0])
    }
  }, [currentUser.constituency, constituencyData, councilData])

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
