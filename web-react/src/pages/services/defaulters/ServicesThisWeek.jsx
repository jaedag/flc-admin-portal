import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber, isAuthorised } from 'global-utils'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_SERVICES_LIST,
  COUNCIL_SERVICES_LIST,
} from './DefaultersQueries'
import DefaulterCard from './DefaulterCard'

const ServicesThisWeek = () => {
  const { currentUser } = useContext(MemberContext)
  const [church, setChurch] = useState(null)
  const [constituencyServicesThisWeek, { data: constituencyData }] =
    useLazyQuery(CONSTITUENCY_SERVICES_LIST)
  const [councilServicesThisWeek, { data: councilData }] = useLazyQuery(
    COUNCIL_SERVICES_LIST
  )

  useEffect(() => {
    if (isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)) {
      councilServicesThisWeek({
        variables: {
          id: currentUser.council,
        },
      })
      setChurch(councilData?.councils[0])
    }
    if (
      isAuthorised(
        ['adminTown', 'leaderTown', 'adminCampus', 'leaderCampus'],
        currentUser.roles
      )
    ) {
      constituencyServicesThisWeek({
        variables: {
          id: currentUser.constituency,
        },
      })
      setChurch(constituencyData?.constituencies[0])
    }
  }, [currentUser.constituency, constituencyData, councilData])

  return (
    <Container>
      <HeadingPrimary
        loading={!church}
      >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
      <HeadingSecondary>{`Services This Week (Week ${getWeekNumber()})`}</HeadingSecondary>

      <PlaceholderCustom as="h6" loading={!church?.servicesThisWeek.length}>
        <h6>{`Number of Services: ${church?.servicesThisWeek.length}`}</h6>
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
        {!church &&
          [null, null, null].map((service, i) => (
            <Col key={i} xs={12} className="mb-3">
              <DefaulterCard
                defaulter={service}
                link="/fellowship/service-details"
              />
            </Col>
          ))}
      </Row>
    </Container>
  )
}

export default ServicesThisWeek
