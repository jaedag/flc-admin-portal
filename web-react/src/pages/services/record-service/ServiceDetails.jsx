import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import SpinnerPage from 'components/SpinnerPage'
import TableFromArrays from 'components/TableFromArrays/TableFromArrays'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import './ServiceDetails.css'

const ServiceDetails = ({ service, church, loading }) => {
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!service) {
      navigate(-1)
    }
  }, [service])
  if (loading) {
    return <SpinnerPage />
  }

  const table = [
    ['Date of Service', new Date(service.serviceDate.date).toDateString()],
    ['Attendance', service.attendance],
    ['Income', service.income],
    ...service.treasurers.map((treasurer, i) => [
      `Treasurer ${i + 1}`,
      treasurer.fullName,
    ]),
  ]

  return (
    <Container>
      <PlaceholderCustom as="h3" loading={loading}>
        <HeadingPrimary>{`${church?.__typename} Service Details`}</HeadingPrimary>
      </PlaceholderCustom>
      <PlaceholderCustom as="h6" loading={loading}>
        <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>
        <p>{`Recorded by ${service?.created_by.fullName}`}</p>
        {service?.bankingSlipUploader && (
          <p className="fw-bold">{`Banking Slip Uploaded by ${service?.bankingSlipUploader.fullName}`}</p>
        )}
        {service?.offeringBankedBy && (
          <p className="fw-bold">{`Offering Banked by ${service?.offeringBankedBy.fullName}`}</p>
        )}
      </PlaceholderCustom>
      <Row>
        <Col>
          {service?.attendance && (
            <Row className="d-flex justify-content-center">
              <TableFromArrays tableArray={table} loading={loading} />
              <div className="text-center">
                <h6>Treasurer Selfie</h6>
                <div>
                  <PlaceholderCustom
                    className="report-picture placeholder"
                    xs={12}
                    loading={loading}
                  >
                    <img
                      className="report-picture"
                      src={service.treasurerSelfie}
                    />
                  </PlaceholderCustom>
                </div>
                <h6>Service Picture</h6>
                <div>
                  <PlaceholderCustom
                    loading={loading}
                    className="report-picture placeholder"
                    xs={12}
                  >
                    <img
                      className="report-picture"
                      src={service.servicePicture}
                    />
                  </PlaceholderCustom>
                </div>
                {service?.offeringBankedBy && (
                  <div className="mb-4">
                    {`${service?.offeringBankedBy.fullName} used the Self Banking Feature. Click this button to see
                    Details`}
                    <div>
                      <Button onClick={() => navigate('/self-banking/receipt')}>
                        View Banking Details
                      </Button>
                    </div>
                  </div>
                )}
                {service?.bankingSlip && (
                  <>
                    <h6>Banking Slip</h6>

                    <div>
                      <PlaceholderCustom
                        loading={loading}
                        className="report-picture placeholder"
                        xs={12}
                      >
                        <img
                          className="report-picture"
                          src={service.bankingSlip}
                        />
                      </PlaceholderCustom>
                    </div>
                  </>
                )}{' '}
                {!service?.bankingProof && (
                  <p className="fw-bold text-danger">
                    You Have Not Submitted Your Banking Slip!!!
                  </p>
                )}
                <div className="d-grid gap-2">
                  <Button
                    className={`btn-trends ${theme}`}
                    onClick={() => {
                      navigate(`/${church?.__typename.toLowerCase()}/reports`)
                    }}
                  >
                    View Trends
                  </Button>
                </div>
              </div>
            </Row>
          )}
          {service?.noServiceReason && (
            <>
              <div>{`No Service was held on ${new Date(
                service?.serviceDate.date
              ).toDateString()}`}</div>
              <div>{`Reason: ${service?.noServiceReason}`}</div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ServiceDetails
