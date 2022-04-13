import { useLazyQuery, useMutation } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import 'components/card/MemberDisplayCard.css'
import FormikControl from 'components/formik-components/FormikControl'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import Popup from 'components/Popup/Popup'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { ServiceContext } from 'contexts/ServiceContext'
import { Form, Formik } from 'formik'
import { alertMsg, throwErrorMsg } from 'global-utils'
import PlaceholderMemberDisplay from 'pages/services/defaulters/PlaceholderDefaulter'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { RECORD_ARRIVAL_TIME, SEND_BUSSING_SUPPORT } from './arrivalsMutations'
import {
  CONFIRM_CONSTITUENCY_ARRIVALS,
  CONFIRM_COUNCIL_ARRIVALS,
  CONFIRM_GATHERINGSERVICE_ARRIVALS,
  CONFIRM_STREAM_ARRIVALS,
} from './arrivalsQueries'
import CloudinaryImage from 'components/CloudinaryImage'
import useChurchLevel from 'hooks/useChurchLevel'
import NoData from './CompNoData'
import usePopup from 'hooks/usePopup'

const ConfirmBacentaArrival = () => {
  const { clickCard } = useContext(ChurchContext)
  const { togglePopup, isOpen } = usePopup()
  const { theme } = useContext(MemberContext)
  const { bussingRecordId } = useContext(ServiceContext)
  const [isSubmitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const [confirmConstituencyArrivals] = useLazyQuery(
    CONFIRM_CONSTITUENCY_ARRIVALS
  )
  const [confirmCouncilArrivals] = useLazyQuery(CONFIRM_COUNCIL_ARRIVALS)
  const [confirmStreamArrivals] = useLazyQuery(CONFIRM_STREAM_ARRIVALS)
  const [confirmGatheringServiceArrivals] = useLazyQuery(
    CONFIRM_GATHERINGSERVICE_ARRIVALS
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: confirmConstituencyArrivals,
    councilFunction: confirmCouncilArrivals,
    streamFunction: confirmStreamArrivals,
    gatheringServiceFunction: confirmGatheringServiceArrivals,
  })
  const [RecordArrivalTime] = useMutation(RECORD_ARRIVAL_TIME)
  const [SendBussingSupport] = useMutation(SEND_BUSSING_SUPPORT)

  const initialValues = {
    bacentaSearch: '',
  }
  const bacentaDataLoaded = church ? church?.bacentasOnTheWay : []
  const [bacentaData, setBacentaData] = useState([])

  useEffect(() => {
    setBacentaData(bacentaDataLoaded)
  }, [church])

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    const searchTerm = values.bacentaSearch.toLowerCase()
    setBacentaData(
      church?.bacentasOnTheWay.filter((bacenta) => {
        if (bacenta.name.toLowerCase().includes(searchTerm)) {
          return true
        } else if (bacenta.leader.fullName.toLowerCase().includes(searchTerm)) {
          return true
        }

        return false
      })
    )

    onSubmitProps.setSubmitting(false)
  }

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>
          Confirm Bacenta Arrival
        </HeadingPrimary>
        <HeadingSecondary loading={!church?.name}>
          {church?.name} {church?.__typename}
        </HeadingSecondary>

        {isOpen && (
          <Popup handleClose={togglePopup}>
            Confirm This Bacenta Has Arrived
            <Button
              variant="primary"
              type="submit"
              size="lg"
              className={`btn-main ${theme}`}
              disabled={isSubmitting}
              onClick={async () => {
                setSubmitting(true)

                try {
                  const arrivalRes = await RecordArrivalTime({
                    variables: {
                      bussingRecordId: bussingRecordId,
                    },
                  })
                  const bussingData = arrivalRes.data.RecordArrivalTime
                  if (
                    !bussingData.bussingTopUp ||
                    church?.stream_name === 'Anagkazo'
                  ) {
                    //if there is no value for the bussing top up
                    return
                  }

                  if (bussingData.confirmed_by?.id) {
                    //If Attendance has been confrimed then send bussing support
                    try {
                      const supportRes = await SendBussingSupport({
                        variables: {
                          bussingRecordId: bussingRecordId,
                          stream_name: church?.stream_name,
                        },
                      })
                      togglePopup()
                      alertMsg(
                        'Money Successfully Sent to ' +
                          supportRes.data.SendBussingSupport.momoNumber
                      )
                    } catch (error) {
                      throwErrorMsg(error)
                    }
                  } else {
                    alertMsg(
                      'Money will be sent when attendance is counted and confirmed'
                    )
                  }

                  setSubmitting(false)
                  navigate('/bacenta/bussing-details')
                } catch (error) {
                  setSubmitting(false)
                  throwErrorMsg(
                    'There was an error recording the arrival time of this bacenta',
                    error
                  )
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <Spinner animation="grow" size="sm" />
                  <span> Submitting</span>
                </>
              ) : (
                `Yes, I'm sure`
              )}
            </Button>
            <Button
              variant="primary"
              className={`btn-secondary mt-2 ${theme}`}
              onClick={togglePopup}
            >
              No, take me back
            </Button>
          </Popup>
        )}

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div className="align-middle">
                <FormikControl
                  className="form-control member-search w-100"
                  control="input"
                  name="bacentaSearch"
                  placeholder="Search Bacentas"
                  aria-describedby="Bacenta Search"
                />
              </div>
            </Form>
          )}
        </Formik>

        {bacentaData?.map((bacenta, i) => (
          <Card key={i} className="mobile-search-card">
            <div
              onClick={() => {
                clickCard(bacenta)
                clickCard(bacenta.bussing[0])
                navigate('/bacenta/bussing-details')
              }}
              className="d-flex align-items-center"
            >
              <div className="flex-shrink-0">
                <CloudinaryImage
                  className="rounded-circle img-search"
                  src={bacenta?.leader?.pictureUrl}
                  alt={bacenta?.leader?.fullName}
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="fw-bold">{`${bacenta?.name} Bacenta`}</h6>
                <p className={`text-secondary mb-0 ${theme}`}>
                  <span>{bacenta?.leader?.fullName}</span>
                </p>
              </div>
            </div>

            <Card.Footer className="text-center">
              <Button
                onClick={() => {
                  clickCard(bacenta)
                  clickCard(bacenta.bussing[0])
                  togglePopup()
                }}
                variant="info"
              >
                Confirm Arrival
              </Button>
            </Card.Footer>
          </Card>
        ))}
        {!bacentaData?.length && (
          <NoData text="There is no data to display for you" />
        )}

        {loading && <PlaceholderMemberDisplay />}
      </Container>
    </BaseComponent>
  )
}

export default ConfirmBacentaArrival
