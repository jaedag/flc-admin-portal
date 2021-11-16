import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './ServiceDetails.css'

const ServiceDetails = ({ service, church }) => {
  return (
    <Container>
      <HeadingPrimary>{`${church.__typename} Service Details`}</HeadingPrimary>
      <HeadingSecondary>{`${church.name} ${church.__typename}`}</HeadingSecondary>
      <Row>
        <Col>
          {service?.attendance ? (
            <Row className="d-flex justify-content-center">
              <h5>{`${church.name} ${church.__typename}`}</h5>

              <table className="table table-dark table-striped">
                <tbody>
                  <tr>
                    <td>Date of Service</td>
                    <td>{new Date(service.serviceDate.date).toDateString()}</td>
                  </tr>
                  <tr>
                    <td>Attendance</td>
                    <td>{service.attendance}</td>
                  </tr>
                  <tr>
                    <td>Income</td>
                    <td>{service.income}</td>
                  </tr>
                  {service.treasurers.map((treasurer, i) => {
                    return (
                      <tr key={i}>
                        <td>Treasurer</td>
                        <td>{treasurer.fullName}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="text-center">
                <div>Treasurer Selfie</div>
                <div>
                  <img
                    className="report-picture"
                    src={service.treasurerSelfie}
                  />
                </div>

                <div>Service Picture</div>
                <div>
                  <img
                    className="report-picture"
                    src={service.servicePicture}
                  />
                </div>
              </div>
            </Row>
          ) : (
            <>
              <div>{`No Service was held on ${new Date(
                service?.serviceDate.date
              ).toDateString()}`}</div>
              <div>{`Reason: ${service.noServiceReason}`}</div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ServiceDetails
