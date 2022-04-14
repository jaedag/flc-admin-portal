import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { throwErrorMsg } from 'global-utils'
import { parseDate } from 'date-utils'
import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { FELLOWSHIP_BANKING_SLIP_QUERIES } from '../../ServicesQueries'
import BaseComponent from 'components/base-component/BaseComponent'

const FellowshipBankingSlipView = () => {
  const { clickCard, fellowshipId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(FELLOWSHIP_BANKING_SLIP_QUERIES, {
    variables: { fellowshipId: fellowshipId },
  })
  const fellowship = data?.fellowships[0]
  const placeholder = ['', '', '']
  throwErrorMsg(error)

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>{fellowship?.name}</HeadingPrimary>
        <PlaceholderCustom as="p" loading={loading}>
          <p>Banking Code: {fellowship?.bankingCode}</p>
        </PlaceholderCustom>

        {data?.fellowships[0]?.services.map((service, index) => {
          if (service.noServiceReason) {
            return null
          }

          return (
            <Card
              key={index}
              className="mb-2"
              onClick={() => {
                clickCard(service)
                !service.bankingProof
                  ? navigate('/fellowship/banking-slip/submission')
                  : navigate('/fellowship/service-details')
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
                    {service?.bankingProof ? (
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
                  <PlaceholderCustom
                    as="p"
                    loading={loading}
                  ></PlaceholderCustom>
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
    </BaseComponent>
  )
}

export default FellowshipBankingSlipView
