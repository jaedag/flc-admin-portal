import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber, isAuthorised } from 'global-utils'
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CONSTITUENCY_CANCELLED_SERVICES_LIST } from './DefaultersQueries'
import DefaulterCard from './DefaulterCard'

const CancelledServicesThisWeek = () => {
  const { currentUser } = useContext(MemberContext)
  const [cancelledServicesThisWeek, { data }] = useLazyQuery(
    CONSTITUENCY_CANCELLED_SERVICES_LIST
  )

  useEffect(() => {
    if (
      isAuthorised(
        ['adminTown', 'leaderTown', 'adminCampus', 'leaderCampus'],
        currentUser.roles
      )
    ) {
      cancelledServicesThisWeek({
        variables: {
          id: currentUser.constituency,
        },
      })
    }
  }, [currentUser.constituency])

  const constituency = data?.constituencies[0]

  return (
    <Container>
      <HeadingPrimary
        loading={!constituency}
      >{`${constituency?.name} ${constituency?.__typename}`}</HeadingPrimary>
      <HeadingSecondary>{`Cancelled Services This Week (Week ${getWeekNumber()})`}</HeadingSecondary>

      <PlaceholderCustom
        as="h6"
        loading={!constituency?.cancelledServicesThisWeek.length}
      >
        <h6>{`Number of Services: ${constituency?.cancelledServicesThisWeek.length}`}</h6>
      </PlaceholderCustom>

      <Row>
        {constituency?.cancelledServicesThisWeek.map((service, i) => (
          <Col key={i} xs={12} className="mb-3">
            <DefaulterCard defaulter={service} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default CancelledServicesThisWeek
