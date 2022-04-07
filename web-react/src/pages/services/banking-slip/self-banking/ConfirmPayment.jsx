import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import Popup from 'components/Popup/Popup'
import { ChurchContext } from 'contexts/ChurchContext'
import { ServiceContext } from 'contexts/ServiceContext'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { DISPLAY_OFFERING_DETAILS } from './bankingQueries'
import './ConfirmPayment.css'
import ManualApprovalSteps from './ManualApprovalSteps'

const ConfirmPayment = () => {
  const { togglePopup, isOpen } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_OFFERING_DETAILS, {
    variables: { serviceRecordId: serviceRecordId },
  })
  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    // const timerId = setInterval(
    //   () => setCountdown((oldCount) => oldCount - 1),
    //   1000
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000)

    // eslint-disable-next-line
  }, [countdown])

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container className="vertically-center d-flex align-items-center px-3 text-center">
        <Row>
          <Col>
            <Spinner animation="border" className="big-spinner" />
            <HeadingPrimary className="mt-3">Processing!</HeadingPrimary>
            <div className="mt-2">
              Your transaction is currently being processed. Please wait for the
              prompt to authorize the transaction
            </div>
            <div className="d-grid gap-2">
              <Button
                variant="secondary"
                size="lg"
                disabled={countdown > 0}
                className="p-3 mt-5"
              >
                Confirm Transaction
              </Button>
              {countdown > 0 ? (
                <div>{`Confirm in ${countdown}`}</div>
              ) : (
                <div className="text-secondary" onClick={() => togglePopup()}>
                  <u>Prompt not received?</u>
                </div>
              )}

              {isOpen && (
                <Popup handleClose={togglePopup}>
                  <ManualApprovalSteps close={togglePopup} />
                </Popup>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </BaseComponent>
  )
}

export default ConfirmPayment
