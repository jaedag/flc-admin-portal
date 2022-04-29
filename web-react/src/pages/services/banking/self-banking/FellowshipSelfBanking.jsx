import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { throwErrorMsg } from 'global-utils'
import { parseDate } from 'date-utils'
import React, { useContext, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { FELLOWSHIP_BANKING_SLIP_QUERIES } from '../../ServicesQueries'
import HeadingSecondary from 'components/HeadingSecondary'
import { capitalise } from 'global-utils'
import usePopup from 'hooks/usePopup'
import Popup from 'components/Popup/Popup'
import ConfirmPaymentButton from './components/button/ConfirmPayment'

const FellowshipSelfBanking = () => {
  const { fellowshipId, clickCard } = useContext(ChurchContext)
  const { isOpen, togglePopup } = usePopup()
  const [confirmService, setConfirmService] = useState(null)
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useQuery(
    FELLOWSHIP_BANKING_SLIP_QUERIES,
    {
      variables: { fellowshipId: fellowshipId },
    }
  )
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

      {isOpen && (
        <Popup handleClose={togglePopup}>
          <div>
            Your transaction status is pending please press this button to
            confirm the status
          </div>
          <div className="d-grid gap-2">
            <ConfirmPaymentButton service={confirmService} refetch={refetch} />
          </div>
        </Popup>
      )}

      {data?.fellowships[0].services.map((service, index) => {
        if (service.noServiceReason || service.bankingSlip) {
          return null
        }

        return (
          <>
            <Card
              key={index}
              className="mb-2"
              onClick={() => {
                setConfirmService(service)
                clickCard(service)
                if (service?.transactionStatus === 'pending') {
                  togglePopup()
                  return
                }

                if (service?.transactionStatus === 'success') {
                  return
                }
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
                    <div
                      className={`${
                        service?.transactionStatus === 'pending' && 'yellow'
                      } ${service?.transactionStatus === 'success' && 'good'} ${
                        service?.transactionStatus === 'failed' && 'bad'
                      }`}
                    >
                      {service?.transactionStatus &&
                        `Transaction Status: ${capitalise(
                          service?.transactionStatus
                        )}`}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        )
      })}

      {loading &&
        placeholder.map((service, index) => (
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
        ))}
    </Container>
  )
}

export default FellowshipSelfBanking
