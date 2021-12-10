import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import { isAuthorised } from 'global-utils'
import React, { useContext, useEffect } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { CONSTITUENCY_FORM_DEFAULTERS_LIST } from './DefaultersQueries'
import { useHistory } from 'react-router'

const FormDefaulters = () => {
  const { currentUser } = useContext(MemberContext)
  const { setFellowshipId } = useContext(ChurchContext)
  const [formDefaulters, { data }] = useLazyQuery(
    CONSTITUENCY_FORM_DEFAULTERS_LIST
  )
  const history = useHistory()

  useEffect(() => {
    if (
      isAuthorised(
        ['adminTown', 'leaderTown', 'adminCampus', 'leaderCampus'],
        currentUser.roles
      )
    ) {
      formDefaulters({
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
        Fellowships That Have Not Filled The Form This Week
      </HeadingSecondary>

      <PlaceholderCustom
        as="h6"
        loading={!constituency?.formDefaultersThisWeekCount}
      >
        <h6>{`Number of Defaulters: ${constituency?.formDefaultersThisWeekCount}`}</h6>
      </PlaceholderCustom>

      <Row>
        {constituency?.formDefaultersThisWeek.map((defaulter, i) => (
          <Col key={i} xs={12} className="mb-3">
            <Card>
              <PlaceholderCustom
                loading={!defaulter.name}
                className={`fw-bold large-number pb-3`}
              >
                <Card.Header
                  onClick={() => {
                    setFellowshipId(defaulter.id)
                    history.push('/fellowship/displaydetails')
                  }}
                  className="fw-bold"
                >
                  {defaulter.name}
                </Card.Header>
                <Card.Body>
                  <Card.Text>{defaulter.leader.fullName}</Card.Text>
                  <a href={`tel:${defaulter.leader?.phoneNumber}`}>
                    <Button variant="primary">
                      <TelephoneFill /> Call
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/${defaulter.leader?.whatsappNumber}`}
                    className="ms-3"
                  >
                    <Button variant="success">
                      <Whatsapp /> WhatsApp
                    </Button>
                  </a>
                </Card.Body>
                <Card.Footer className="text-muted">{`Meeting Day: ${defaulter.meetingDay.day}`}</Card.Footer>
              </PlaceholderCustom>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default FormDefaulters
