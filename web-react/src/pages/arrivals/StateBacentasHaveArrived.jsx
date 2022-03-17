import { useMutation, useQuery } from '@apollo/client'
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
import { alertMsg, throwErrorMsg, transformCloudinaryImg } from 'global-utils'
import { getWeekNumber } from 'date-utils'
import PlaceholderMemberDisplay from 'pages/services/defaulters/PlaceholderDefaulter'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { RECORD_ARRIVAL_TIME, SEND_BUSSING_SUPPORT } from './arrivalsMutations'
import { CONSTITUENCY_BUSSING_DATA } from './arrivalsQueries'

const FormBacentasHaveArrived = () => {
  const { constituencyId, clickCard, isOpen, togglePopup } =
    useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const { bussingRecordId } = useContext(ServiceContext)
  const [isSubmitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(CONSTITUENCY_BUSSING_DATA, {
    variables: { id: constituencyId },
  })
  const [RecordArrivalTime] = useMutation(RECORD_ARRIVAL_TIME)
  const [SendBussingSupport] = useMutation(SEND_BUSSING_SUPPORT)
  const constituency = data?.constituencies[0]
  const initialValues = {
    bacentaSearch: '',
  }
  const bacentaDataLoaded = data ? constituency?.bacentas : null
  const [bacentaData, setBacentaData] = useState([])

  useEffect(() => {
    setBacentaData(bacentaDataLoaded)
  }, [data])

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    setBacentaData(
      constituency?.bacentas.filter((bacenta) =>
        bacenta.name.toLowerCase().includes(values.bacentaSearch.toLowerCase())
      )
    )
    onSubmitProps.setSubmitting(false)
  }

  return (
    <BaseComponent data={data} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>
          Bacentas That Have Been Counted
        </HeadingPrimary>
        <HeadingSecondary loading={!constituency?.name}>
          {constituency?.name} Constituency
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
              onClick={() => {
                setSubmitting(true)
                RecordArrivalTime({
                  variables: {
                    bussingRecordId: bussingRecordId,
                  },
                })
                  .then(() => {
                    return SendBussingSupport({
                      variables: {
                        bussingRecordId: bussingRecordId,
                      },
                    })
                      .then((res) => {
                        togglePopup()
                        alertMsg(
                          'Money Successfully Sent to ' +
                            res.data.SendBussingSupport.momoNumber
                        )
                        setSubmitting(false)
                      })
                      .catch((err) => {
                        setSubmitting(false)
                        throwErrorMsg(err)
                      })
                  })
                  .catch((error) => {
                    setSubmitting(false)
                    throwErrorMsg(
                      'There was an error recording the arrival time of this bacenta',
                      error
                    )
                  })
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

        {bacentaData?.map((bacenta, i) => {
          if (
            bacenta.bussing[0]?.week === getWeekNumber() &&
            bacenta.bussing[0]?.attendance
          ) {
            return (
              <Card className="mobile-search-card">
                <div
                  onClick={() => {
                    clickCard(bacenta)
                    clickCard(bacenta.bussing[0])
                    navigate('/bacenta/bussing-details')
                  }}
                  className="d-flex align-items-center"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-circle img-search"
                      src={transformCloudinaryImg(bacenta?.leader?.pictureUrl)}
                      alt={bacenta?.leader.fullName}
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
            )
          } else if (i === 0) {
            return (
              <Card>
                <Card.Body>There is no data to display for you</Card.Body>
              </Card>
            )
          }
        })}

        {!constituency?.bacentas.length && <PlaceholderMemberDisplay />}
      </Container>
    </BaseComponent>
  )
}

export default FormBacentasHaveArrived
