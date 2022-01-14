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
import { transformCloudinaryImg } from 'global-utils'
import { useNavigate } from 'react-router'

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

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <Container>
        <PlaceholderCustom as="h3" loading={loading}>
          <HeadingPrimary>{`${church?.__typename} Bussing Details`}</HeadingPrimary>
        </PlaceholderCustom>
        <PlaceholderCustom as="h6" loading={loading}>
          <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>
          <p>{`Recorded by ${bussing?.created_by.fullName}`}</p>
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
                    <td>Bussing Cost</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {bussing?.bussingCost}
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
          <Button onClick={() => navigate('/arrivals')}>
            Back to Arrivals Home
          </Button>
        </div>
      </Container>
    </BaseComponent>
  )
}

export default BusFormDetails
