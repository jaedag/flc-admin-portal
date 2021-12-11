import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber, isAuthorised } from 'global-utils'
import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DefaulterCard from './DefaulterCard'
import { CONSTITUENCY_BANKING_DEFAULTERS_LIST } from './DefaultersQueries'

const BankingDefaulters = () => {
  const { currentUser } = useContext(MemberContext)

  const [bankingDefaulters, { data }] = useLazyQuery(
    CONSTITUENCY_BANKING_DEFAULTERS_LIST
  )

  useEffect(() => {
    if (
      isAuthorised(
        ['adminTown', 'leaderTown', 'adminCampus', 'leaderCampus'],
        currentUser.roles
      )
    ) {
      bankingDefaulters({
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
      <HeadingSecondary>
        {`Fellowships That Have Not Banked This Week Despite Having Service (Week ${getWeekNumber()})`}
      </HeadingSecondary>

      <PlaceholderCustom
        as="h6"
        loading={!constituency?.bankingDefaultersThisWeek.length}
      >
        <h6>{`Number of Defaulters: ${constituency?.bankingDefaultersThisWeek.length}`}</h6>
      </PlaceholderCustom>

      <Row>
        {constituency?.bankingDefaultersThisWeek.map((defaulter, i) => (
          <Col key={i} xs={12} className="mb-3">
            <DefaulterCard defaulter={defaulter} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default BankingDefaulters
