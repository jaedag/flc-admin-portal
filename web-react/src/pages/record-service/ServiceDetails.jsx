import React from 'react'
import './ServiceDetails.css'

const ServiceDetails = ({ service, church }) => {
  return (
    <div className="py-4 container mt-2">
      <div className="container infobar">{`${church.__typename} Service Details`}</div>

      <div className="row">
        <div className="col mb-2">
          {service?.attendance ? (
            <div className="row d-flex justify-content-center">
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
            </div>
          ) : (
            <>
              <div>{`No Service was held on ${new Date(
                service?.serviceDate.date
              ).toDateString()}`}</div>
              <div>{`Reason: ${service.noServiceReason}`}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails
