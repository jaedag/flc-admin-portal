import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { ServiceContext } from 'contexts/ServiceContext'
import { parseDate, throwErrorMsg } from 'global-utils'
import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'
import { BANKING_SLIP_QUERIES } from './ServicesQueries'

const BankingSlipView = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { setServiceRecordId } = useContext(ServiceContext)
  const history = useHistory()
  const { data, loading, error } = useQuery(BANKING_SLIP_QUERIES, {
    variables: { fellowshipId: fellowshipId },
  })
  const fellowship = data?.fellowships[0]
  const placeholder = ['', '', '']
  throwErrorMsg(error)

  return (
    <Container>
      <HeadingPrimary loading={loading}>{fellowship?.name}</HeadingPrimary>
      <PlaceholderCustom as="p" loading={loading}>
        <p>Banking Code: {fellowship?.bankingCode}</p>
      </PlaceholderCustom>

      {data?.fellowships[0].services.map((service, index) => {
        if (service.noServiceReason) {
          return null
        }

        return (
          <Card
            key={index}
            className="mb-2"
            onClick={() => {
              setServiceRecordId(service.id)
              !service.bankingSlip && history.push('/banking-slip/submission')
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
                <Col className="col-auto">
                  {service.bankingSlip ? (
                    <span className="text-success fw-bold">
                      <CheckCircleFill color="green" size={35} /> Filled
                    </span>
                  ) : (
                    <span className="text-danger fw-bold">
                      <XCircleFill color="red" size={35} /> Not Filled
                    </span>
                  )}
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

export default BankingSlipView
