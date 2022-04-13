import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { throwErrorMsg } from 'global-utils'
import { parseDate } from 'date-utils'
import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { FELLOWSHIP_BANKING_SLIP_QUERIES } from '../../ServicesQueries'
import HeadingSecondary from 'components/HeadingSecondary'

const FellowshipSelfBanking = () => {
  const { fellowshipId, clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(FELLOWSHIP_BANKING_SLIP_QUERIES, {
    variables: { fellowshipId: fellowshipId },
  })
  const fellowship = data?.fellowships[0]
  const placeholder = ['', '', '']
  throwErrorMsg(error)

  return (
    <Container>
      <HeadingPrimary loading={loading}>
        {fellowship?.name} {fellowship?.__typename}
      </HeadingPrimary>
      <PlaceholderCustom as="p" loading={loading}>
        <p>Banking Code: {fellowship?.bankingCode}</p>
      </PlaceholderCustom>

      <HeadingSecondary loading={loading}>
        Please click to bank any of these services
      </HeadingSecondary>
      {data?.fellowships[0].services.map((service, index) => {
        if (service.noServiceReason || service.bankingSlip) {
          return null
        }

        return (
          <Card
            key={index}
            className="mb-2"
            onClick={() => {
              clickCard(service)
              navigate('/services/fellowship/self-banking/pay')
            }}
          >
            <Card.Header>
              <b>{parseDate(service.serviceDate.date)}</b>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <span>Offering: {service.income}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )
      })}

      {loading &&
        placeholder.map((service, index) => {
          return (
            <Card key={index} className="mb-2">
              <Card.Header>
                <PlaceholderCustom as="p" loading={loading}></PlaceholderCustom>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <PlaceholderCustom
                      as="span"
                      loading={loading}
                    ></PlaceholderCustom>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )
        })}
    </Container>
  )
}

export default FellowshipSelfBanking
