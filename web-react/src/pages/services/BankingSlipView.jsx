import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import { ServiceContext } from 'contexts/ServiceContext'
import { parseDate } from 'global-utils'
import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'
import { BANKING_SLIP_QUERIES } from './ServicesQueries'

const BankingSlipView = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { setServiceRecordId } = useContext(ServiceContext)
  const history = useHistory()
  const { data } = useQuery(BANKING_SLIP_QUERIES, {
    variables: { bacentaId: bacentaId },
  })
  const bacenta = data?.bacentas[0]

  return (
    <Container>
      <HeadingPrimary>{bacenta?.name}</HeadingPrimary>
      <p>Banking Code: {bacenta?.bankingCode}</p>

      {data?.bacentas[0].services.map((service, index) => {
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
    </Container>
  )
}

export default BankingSlipView
