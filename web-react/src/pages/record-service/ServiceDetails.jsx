import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Col, Container, Row, Table, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import './ServiceDetails.css'

const ServiceDetails = ({ service, church }) => {
  const { theme } = useContext(MemberContext)
  const history = useHistory()
  return (
    <Container>
      <PlaceholderCustom as="h3">
        <HeadingPrimary>{`${church?.__typename} Service Details`}</HeadingPrimary>
      </PlaceholderCustom>
      <PlaceholderCustom as="h6">
        <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>
      </PlaceholderCustom>
      <Row>
        <Col>
          {service?.attendance ? (
            <Row className="d-flex justify-content-center">
              <Table variant={theme} striperd bordered>
                <tbody>
                  <tr>
                    <td>Date of Service</td>
                    <PlaceholderCustom
                      as="td"
                      xs={12}
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
                      <PlaceholderCustom>
                        {service.attendance}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  <tr>
                    <td>Income</td>
                    <td>
                      <PlaceholderCustom>{service.income}</PlaceholderCustom>
                    </td>
                  </tr>
                  {service.treasurers.map((treasurer, i) => {
                    return (
                      <tr key={i}>
                        <td>{`Treasurer ${i + 1}`}</td>
                        <td>
                          <PlaceholderCustom>
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
                    className="report-picture placeholder"
                    xs={12}
                  >
                    <img
                      className="report-picture"
                      src={service.servicePicture}
                    />
                  </PlaceholderCustom>
                </div>
                <h6>Banking Slip</h6>
                <div>
                  <PlaceholderCustom
                    className="report-picture placeholder"
                    xs={12}
                  >
                    <img className="report-picture" src={service.bankingSlip} />
                  </PlaceholderCustom>
                </div>
                <div className="d-grid gap-2">
                  <Button
                    className={`btn-trends ${theme}`}
                    onClick={() => {
                      history.push(
                        `/${church?.__typename.toLowerCase()}/reports`
                      )
                    }}
                  >
                    View Trends
                  </Button>
                </div>
              </div>
            </Row>
          ) : (
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
