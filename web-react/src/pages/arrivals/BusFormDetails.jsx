import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { ServiceContext } from 'contexts/ServiceContext'
import React from 'react'
import { useContext } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { DISPLAY_BUSSING_RECORDS } from './arrivalsQueries'
import '../services/record-service/ServiceDetails.css'
import {
  ARRIVALS_CUTOFF,
  parseDate,
  setTime,
  transformCloudinaryImg,
} from 'global-utils'
import { useNavigate } from 'react-router'
import RoleView from 'auth/RoleView'

const BusFormDetails = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const { bussingRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_BUSSING_RECORDS, {
    variables: { bussingRecordId: bussingRecordId, bacentaId: bacentaId },
  })
  const navigate = useNavigate()
  const bussing = data?.bussingRecords[0]
  const church = data?.bacentas[0]

  const changeCondition = () => {
    const today = new Date()
    const arrivalsCutoff = setTime(ARRIVALS_CUTOFF)

    if (parseDate(bussing?.created_at) === 'Today' && today < arrivalsCutoff) {
      //If the record was created today
      //And if the time is less than the arrivals cutoff time
      return true
    }
    // return false
    return true
  }
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
              {`Confirmed by `}
              <span className="fw-bold good">
                {bussing?.confirmed_by.fullName}
              </span>
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

                  <tr>
                    <td>Bussing Top Up</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {bussing?.bussingTopUp}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  <tr>
                    <td>Offering Raised</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {bussing?.offeringRaised}
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
                  <tr>
                    <td>Number of Cars</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {bussing?.numberOfCars}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="text-center">
                <h6>Bussing Pictures</h6>
                {bussing?.bussingPictures.map((picture, index) => {
                  return (
                    <img
                      key={index}
                      className="report-picture"
                      src={transformCloudinaryImg(picture, 'large')}
                    />
                  )
                })}
              </div>
            </Row>
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <RoleView roles={['adminConstituencyArrivals']}>
            {changeCondition() && (
              <Button
                onClick={() => navigate('/arrivals/submit-bus-attendance')}
              >
                Enter Attendance
              </Button>
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
