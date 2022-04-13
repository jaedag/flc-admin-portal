import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { ServiceContext } from 'contexts/ServiceContext'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { DISPLAY_BUSSING_RECORDS } from './arrivalsQueries'
import '../services/record-service/ServiceDetails.css'
import { useNavigate } from 'react-router'
import RoleView from 'auth/RoleView'
import { permitAdminArrivals, permitArrivalsCounter } from 'permission-utils'
import { parseNeoTime } from 'date-utils'
import CloudinaryImage from 'components/CloudinaryImage'
import { beforeCountingDeadline } from './arrivals-utils'
import usePopup from 'hooks/usePopup'
import Popup from 'components/Popup/Popup'

const BusFormDetails = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const { bussingRecordId } = useContext(ServiceContext)
  const { isOpen, togglePopup } = usePopup()
  const [picturePopup, setPicturePopup] = useState('')
  const { data, loading, error } = useQuery(DISPLAY_BUSSING_RECORDS, {
    variables: { bussingRecordId: bussingRecordId, bacentaId: bacentaId },
  })
  const navigate = useNavigate()
  const bussing = data?.bussingRecords[0]
  const church = data?.bacentas[0]

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <Container>
        <PlaceholderCustom as="h3" loading={loading}>
          <HeadingPrimary>{`${church?.__typename} Bussing Details`}</HeadingPrimary>
        </PlaceholderCustom>
        <PlaceholderCustom as="h6" loading={loading}>
          <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>
          <p>{`Recorded by ${bussing?.created_by.fullName}`}</p>

          {bussing?.confirmed_by && (
            <p>
              {`Confirmed`}
              <RoleView roles={permitAdminArrivals('Stream')}>
                {` by `}
                <span className="fw-bold good">
                  {bussing?.confirmed_by.fullName}
                </span>
              </RoleView>
            </p>
          )}
        </PlaceholderCustom>

        <Row>
          <Col>
            <Row className="d-flex justify-content-center">
              <Table variant={theme} striped bordered>
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
                        {new Date(bussing?.serviceDate.date).toDateString()}
                      </td>
                    </PlaceholderCustom>
                  </tr>
                  <tr>
                    <td>Mobilisation Picture</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        <span
                          className="text-primary"
                          onClick={() =>
                            navigate('/arrivals/mobilisation-picture')
                          }
                        >
                          <u>Click Here To View</u>
                        </span>
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  <tr>
                    <td>Leader Declaration</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {bussing?.leaderDeclaration}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  <tr>
                    <td>Attendance</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {bussing?.attendance}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  <tr>
                    <td>Bussing Cost</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {bussing?.bussingCost}
                      </PlaceholderCustom>
                    </td>
                  </tr>

                  <tr>
                    <td>Bussing Top Up</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {bussing?.bussingTopUp}
                      </PlaceholderCustom>
                    </td>
                  </tr>

                  <tr>
                    <td>Number of Busses</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {bussing?.numberOfBusses}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  {bussing?.numberOfCars ? (
                    <tr>
                      <td>Number of Cars</td>
                      <td>
                        <PlaceholderCustom loading={loading}>
                          {bussing?.numberOfCars}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  ) : null}
                  {bussing?.mobileNetwork && (
                    <tr>
                      <td>Mobile Network</td>
                      <td>
                        <PlaceholderCustom loading={loading}>
                          {bussing?.mobileNetwork}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}
                  {bussing?.momoNumber && (
                    <tr>
                      <td>Momo Number</td>
                      <td>
                        <PlaceholderCustom loading={loading}>
                          {bussing?.momoNumber}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}
                  {bussing?.momoName && (
                    <tr>
                      <td>Momo Name</td>
                      <td>
                        <PlaceholderCustom loading={loading}>
                          {bussing?.momoName}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}
                  {bussing?.comments && (
                    <tr>
                      <td>Comments</td>
                      <td>
                        <i>
                          <PlaceholderCustom loading={loading}>
                            {bussing?.comments}
                          </PlaceholderCustom>
                        </i>
                      </td>
                    </tr>
                  )}
                  {bussing?.arrivalTime && (
                    <tr>
                      <td>Arrival Time</td>
                      <td className="fw-bold good">
                        <PlaceholderCustom loading={loading}>
                          {parseNeoTime(bussing?.arrivalTime)}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Row className="text-center">
                {isOpen && (
                  <Popup handleClose={togglePopup}>
                    <CloudinaryImage
                      src={picturePopup}
                      className="full-width"
                      size="fullWidth"
                    />
                  </Popup>
                )}
                <h6>Bussing Pictures</h6>
                <div className="container card-button-row">
                  <table>
                    <tbody>
                      <tr>
                        {bussing?.bussingPictures?.map((picture, index) => (
                          <td
                            onClick={() => {
                              setPicturePopup(picture)
                              togglePopup()
                            }}
                            key={index}
                          >
                            <CloudinaryImage
                              className="report-picture"
                              src={picture}
                              size="large"
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Row>
            </Row>
          </Col>
        </Row>

        <div className="d-grid gap-2">
          <RoleView roles={permitArrivalsCounter('Stream')}>
            {beforeCountingDeadline(bussing, church) && (
              <>
                {' '}
                <Button
                  variant="success"
                  onClick={() => navigate('/arrivals/submit-bus-attendance')}
                >
                  Confirm Attendance
                </Button>
                <Button
                  variant="danger"
                  onClick={() => navigate('/arrivals/bacentas-to-count')}
                >
                  Continue Counting
                </Button>
              </>
            )}
          </RoleView>
          <Button onClick={() => navigate('/arrivals')}>
            Back to Arrivals Home
          </Button>
        </div>
      </Container>
    </BaseComponent>
  )
}

export default BusFormDetails
