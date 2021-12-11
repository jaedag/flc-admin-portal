import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber, isAuthorised } from 'global-utils'
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CONSTITUENCY_SERVICES_LIST } from './DefaultersQueries'
import DefaulterCard from './DefaulterCard'

const ServicesThisWeek = () => {
  const { currentUser } = useContext(MemberContext)
  const [servicesThisWeek, { data }] = useLazyQuery(CONSTITUENCY_SERVICES_LIST)

  useEffect(() => {
    if (
      isAuthorised(
        ['adminTown', 'leaderTown', 'adminCampus', 'leaderCampus'],
        currentUser.roles
      )
    ) {
      servicesThisWeek({
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
      <HeadingSecondary>{`Services This Week (Week ${getWeekNumber()})`}</HeadingSecondary>

      <PlaceholderCustom
        as="h6"
        loading={!constituency?.servicesThisWeek.length}
      >
        <h6>{`Number of Services: ${constituency?.servicesThisWeek.length}`}</h6>
      </PlaceholderCustom>

      <Row>
        {constituency?.servicesThisWeek.map((service, i) => (
          <Col key={i} xs={12} className="mb-3">
            <DefaulterCard defaulter={service} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ServicesThisWeek
