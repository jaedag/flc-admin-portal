import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import SpinnerPage from 'components/SpinnerPage'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Col, Container, Row, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import './ServiceDetails.css'

const ServiceDetails = ({ service, church, loading }) => {
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  if (!service) {
    navigate(-1)
  }

  if (loading) {
    return <SpinnerPage />
  }

  return (
    <Container>
      <PlaceholderCustom as="h3" loading={loading}>
        <HeadingPrimary>{`${church?.__typename} Service Details`}</HeadingPrimary>
      </PlaceholderCustom>
      <PlaceholderCustom as="h6" loading={loading}>
        <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>
        <p>{`Recorded by ${service?.created_by.fullName}`}</p>
      </PlaceholderCustom>
      <Row>
        <Col>
          {service?.attendance && (
            <Row className="d-flex justify-content-center">
              <Table variant={theme} striperd bordered>
                <tbody>
                  <tr>
                    <td>Date of Service</td>
                    <PlaceholderCustom
                      as="td"
                      xs={12}
                      loading={loading}
                      className="td-placeholder"
                    >
                      <td>
                        {new Date(service.serviceDate.date).toDateString()}
                      </td>
                    </PlaceholderCustom>
                  </tr>
                  <tr>
                    <td>Attendance</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {service.attendance}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  <tr>
                    <td>Income</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {service.income}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  {service.treasurers.map((treasurer, i) => {
                    return (
                      <tr key={i}>
                        <td>{`Treasurer ${i + 1}`}</td>
                        <td>
                          <PlaceholderCustom loading={loading}>
                            {treasurer.fullName}
                          </PlaceholderCustom>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
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
                {service?.bankingSlip ? (
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
                ) : (
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
