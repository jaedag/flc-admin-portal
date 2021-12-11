import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import { isAuthorised } from 'global-utils'
import React, { useContext, useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { CONSTITUENCY_DEFAULTERS } from './DefaultersQueries'
import './Defaulters.css'
import PlaceholderCustom from 'components/Placeholder'
import { useHistory } from 'react-router'

const Defaulters = () => {
  const { currentUser } = useContext(MemberContext)
  const [constituencyDefaulters, { data }] = useLazyQuery(
    CONSTITUENCY_DEFAULTERS
  )
  const history = useHistory()
  useEffect(() => {
    if (
      isAuthorised(
        ['adminTown', 'leaderTown', 'adminCampus', 'leaderCampus'],
        currentUser.roles
      )
    ) {
      constituencyDefaulters({
        variables: {
          id: currentUser.constituency,
        },
      })
    }
  }, [currentUser.constituency])

  const constituency = data?.constituencies[0]

  const defaulters = [
    {
      title: 'Filled Forms',
      data: constituency?.servicesThisWeekCount || '0',
      color: constituency?.servicesThisWeekCount ? 'good' : 'bad',
      link: constituency?.servicesThisWeekCount
        ? '/services/filled-services'
        : '#',
    },
    {
      title: 'Canc. Service',
      data: constituency?.cancelledServicesThisWeekCount || '0',
      color: constituency?.cancelledServicesThisWeekCount ? 'bad' : 'good',
      link: constituency?.cancelledServicesThisWeekCount
        ? '/services/cancelled-services'
        : '#',
    },
    {
      title: 'Not Filled Forms',
      data: constituency?.formDefaultersThisWeekCount || '0',
      color: constituency?.formDefaultersThisWeekCount ? 'bad' : 'good',
      link: constituency?.formDefaultersThisWeekCount
        ? '/services/form-defaulters'
        : '#',
    },
    {
      title: 'Have Not Banked',
      data: constituency?.bankingDefaultersThisWeekCount || '0',
      color: constituency?.bankingDefaultersThisWeekCount ? 'bad' : 'good',
      link: constituency?.bankingDefaultersThisWeekCount
        ? '/services/banking-defaulters'
        : '#',
    },
  ]
  return (
    <Container>
      <HeadingPrimary
        loading={!constituency}
      >{`${constituency?.name} ${constituency?.__typename}`}</HeadingPrimary>
      <HeadingSecondary>Defaulters Page</HeadingSecondary>

      <PlaceholderCustom as="h6" loading={!constituency?.fellowshipCount}>
        <h6>{`Total Number of Fellowships: ${constituency?.fellowshipCount}`}</h6>
      </PlaceholderCustom>
      <Row>
        {defaulters.map((defaulter, i) => (
          <Col key={i} xs={6} className="mb-3">
            <Card
              className="text-center"
              onClick={() => history.push(defaulter.link)}
            >
              <Card.Header>{defaulter.title}</Card.Header>
              <PlaceholderCustom
                loading={!defaulter.data}
                className={`fw-bold large-number pb-3 ${defaulter.color}`}
              >
                <Card.Body
                  className={`fw-bold large-number ${defaulter.color}`}
                >
                  {defaulter.data}
                </Card.Body>
              </PlaceholderCustom>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Defaulters
