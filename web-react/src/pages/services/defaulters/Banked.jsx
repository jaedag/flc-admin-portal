import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber, isAuthorised } from 'global-utils'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DefaulterCard from './DefaulterCard'
import {
  CONSTITUENCY_BANKED_LIST,
  COUNCIL_BANKED_LIST,
} from './DefaultersQueries'

const Banked = () => {
  const { currentUser } = useContext(MemberContext)
  const [church, setChurch] = useState(null)
  const [constituencyBanked, { data: constituencyData }] = useLazyQuery(
    CONSTITUENCY_BANKED_LIST
  )
  const [councilBanked, { data: councilData }] =
    useLazyQuery(COUNCIL_BANKED_LIST)

  useEffect(() => {
    if (isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)) {
      councilBanked({
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
      constituencyBanked({
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
      <HeadingSecondary>
        {`Fellowships That Have Banked This Week (Week ${getWeekNumber()})`}
      </HeadingSecondary>

      <PlaceholderCustom as="h6" loading={!church?.bankedThisWeek.length}>
        <h6>{`Number Who Have Banked: ${church?.bankedThisWeek.length}`}</h6>
      </PlaceholderCustom>

      <Row>
        {church?.bankedThisWeek.map((defaulter, i) => (
          <Col key={i} xs={12} className="mb-3">
            <DefaulterCard
              defaulter={defaulter}
              link="/fellowship/service-details"
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Banked
