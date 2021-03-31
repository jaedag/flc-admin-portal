import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import {
  GET_CENTRE_BACENTAS,
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
  GET_TOWNS,
  GET_CAMPUSES,
} from '../queries/ListQueries'
import {
  ADD_BACENTA_CENTRE,
  REMOVE_BACENTA_CENTRE,
  UPDATE_BACENTA,
} from '../queries/UpdateMutations'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { ChurchContext } from '../contexts/ChurchContext'
import { DISPLAY_BACENTA } from '../queries/DisplayQueries'
import Spinner from '../components/Spinner'
import { LOG_BACENTA_HISTORY } from '../queries/LogMutations'

export const UpdateBacenta = () => {
  const {
    church,
    makeSelectOptions,
    parsePhoneNum,
    capitalise,
    phoneRegExp,
    bishopId,
    centreId,
    setCentreId,
    bacentaId,
  } = useContext(ChurchContext)

  let townCampusIdVar

  const { data: bacentaData, loading: bacentaLoading } = useQuery(
    DISPLAY_BACENTA,
    {
      variables: { id: bacentaId },
    }
  )

  const [newLeaderInfo, setNewLeaderInfo] = useState({})

  const history = useHistory()
  const [positionLoading, setPositionLoading] = useState(false)

  const initialValues = {
    bacentaName: bacentaData?.displayBacenta?.name,
    leaderName: `${bacentaData?.displayBacenta?.leader.firstName} ${bacentaData?.displayBacenta?.leader.lastName} `,
    leaderWhatsapp: `+${bacentaData?.displayBacenta?.leader.whatsappNumber}`,

    townCampusSelect:
      church.church === 'town'
        ? bacentaData?.displayBacenta?.centre?.town?.id
        : bacentaData?.displayBacenta?.centre?.campus?.id,
    centreSelect: bacentaData?.displayBacenta?.centre.id,
    meetingDay: bacentaData?.displayBacenta?.meetingDay?.day,
    venueLatitude: bacentaData?.displayBacenta?.location?.latitude
      ? bacentaData?.displayBacenta?.location?.latitude
      : '',
    venueLongitude: bacentaData?.displayBacenta?.location?.longitude
      ? bacentaData?.displayBacenta?.location?.longitude
      : '',
  }

  const serviceDayOptions = [
    { key: 'Tuesday', value: 'Tuesday' },
    { key: 'Wednesday', value: 'Wednesday' },
    { key: 'Thursday', value: 'Thursday' },
    { key: 'Friday', value: 'Friday' },
    { key: 'Saturday', value: 'Saturday' },
  ]

  const validationSchema = Yup.object({
    bacentaName: Yup.string().required(
      `${capitalise(church.subChurch)} Name is a required field`
    ),
    leaderWhatsapp: Yup.string().matches(
      phoneRegExp,
      `Phone Number must start with + and country code (eg. '+233')`
    ),
  })

  const { data: townListData } = useQuery(GET_TOWNS, {
    variables: { id: bishopId },
  })
  const { data: campusListData } = useQuery(GET_CAMPUSES, {
    variables: { id: bishopId },
  })

  const [UpdateBacenta] = useMutation(UPDATE_BACENTA, {
    onCompleted: (updatedInfo) => {
      setNewLeaderInfo(updatedInfo.UpdateBacenta?.leader)
    },
    refetchQueries: [
      { query: GET_CENTRE_BACENTAS, variables: { id: centreId } },
      {
        query: GET_CENTRE_BACENTAS,
        variables: { id: initialValues.centreSelect },
      },
    ],
  })

  const [RemoveBacentaCentre] = useMutation(REMOVE_BACENTA_CENTRE)
  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY, {
    onCompleted: (newLog) => {
      newLog.LogBacentaHistory.history.map((history) =>
        console.log('History ', history.HistoryLog)
      )
    },
    refetchQueries: [{ query: DISPLAY_BACENTA, variables: { id: bacentaId } }],
  })

  const [AddBacentaCentre] = useMutation(ADD_BACENTA_CENTRE, {
    onCompleted: (newCentre) => {
      //After Adding the bacenta to a centre, then you log that change.
      LogBacentaHistory({
        variables: {
          bacentaId: bacentaId,
          leaderId: '',
          newCentreId: newCentre.AddBacentaCentre.from.id,
          oldCentreId: bacentaData?.displayBacenta?.centre.id,
          historyRecord: `${initialValues.bacentaName} has been moved from ${bacentaData?.displayBacenta?.centre.name} Centre to ${newCentre.AddBacentaCentre.from.name} Centre`,
        },
      })
    },
  })

  if (bacentaLoading) {
    return <LoadingScreen />
  } else if (bacentaData) {
    const townOptions = townListData
      ? makeSelectOptions(townListData.townList)
      : []
    const campusOptions = campusListData
      ? makeSelectOptions(campusListData.campusList)
      : []

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setCentreId(values.centreSelect)

      UpdateBacenta({
        variables: {
          id: bacentaId,
          name: values.bacentaName,
          lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
          meetingDay: values.meetingDay,
          venueLongitude: parseFloat(values.venueLongitude),
          venueLatitude: parseFloat(values.venueLongitude),
        },
      })

      //Log If The Centre Changes
      if (values.centreSelect !== initialValues.centreSelect) {
        RemoveBacentaCentre({
          variables: {
            centreId: initialValues.centreSelect,
            bacentaId: bacentaId,
          },
        })
        AddBacentaCentre({
          variables: {
            centreId: values.centreSelect,
            bacentaId: bacentaId,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderWhatsapp !== initialValues.leaderWhatsapp) {
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            leaderId: newLeaderInfo.id,
            historyRecord: `${newLeaderInfo.firstName} ${newLeaderInfo.lastName} was transferred to become the new Bacenta Leader for ${values.bacentaName}`,
          },
        })
      }

      //Log if the Bacenta Name Changes
      if (values.bacentaName !== initialValues.bacentaName) {
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            leaderId: '',
            historyRecord: `The Bacenta name has been changed from ${initialValues.bacentaName} to ${values.bacentaName}`,
          },
        })
      }

      // Log if the Meeting Day Changes
      if (values.meetingDay !== initialValues.meetingDay) {
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            leaderId: '',
            historyRecord: `${values.bacentaName} has changed their meeting day from ${initialValues.meetingDay} to ${values.meetingDay}`,
          },
        })
      }

      //Log if the Venue Changes
      if (
        values.venueLongitude !== initialValues.venueLongitude ||
        values.venueLatitude !== initialValues.venueLatitude
      ) {
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            leaderId: '',
            historyRecord: `${values.bacentaName} has changed their venue`,
          },
        })
      }

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      history.push(`/bacenta/displaydetails`)
    }

    return (
      <div>
        <NavBar />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="body-card py-4 container mt-5">
              <div className="container infobar">Bacenta Update Form</div>
              <Form>
                <div className="form-group">
                  <div className="row row-cols-1 row-cols-md-2">
                    {/* <!-- Basic Info Div --> */}
                    <div className="col mb-2">
                      <div className="form-row row-cols-2">
                        <div className="col-8">
                          <FormikControl
                            className="form-control"
                            control="select"
                            name="townCampusSelect"
                            label={`Select a ${capitalise(church.church)}`}
                            options={
                              church.church === 'town'
                                ? townOptions
                                : campusOptions
                            }
                            onChange={(e) => {
                              formik.setFieldValue(
                                'townCampusSelect',
                                e.target.value
                              )
                              townCampusIdVar = e.target.value
                              //Set centreSelect to empty string so that the value is set back to the default option when a user changes the townCampus var
                              formik.setFieldValue('centreSelect', '')
                            }}
                            defaultOption={`Select a ${capitalise(
                              church.church
                            )}`}
                          />
                          <FormikControl
                            className="form-control"
                            control="selectWithQuery"
                            name="centreSelect"
                            optionsQuery={
                              church.church === 'town'
                                ? GET_TOWN_CENTRES
                                : GET_CAMPUS_CENTRES
                            }
                            queryVariable="id"
                            dataset={
                              church.church === 'town'
                                ? 'townCentreList'
                                : 'campusCentreList'
                            }
                            varValue={
                              townCampusIdVar
                                ? townCampusIdVar
                                : initialValues.townCampusSelect
                            }
                            onChange={(e) => {
                              formik.setFieldValue(
                                'centreSelect',
                                e.target.value
                              )
                            }}
                            defaultOption="Select a Centre"
                            label="Select a Centre"
                          />
                        </div>
                      </div>

                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="bacentaName"
                            placeholder="Name of Bacenta"
                          />
                        </div>
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="select"
                            name="meetingDay"
                            options={serviceDayOptions}
                            defaultOption="Pick a Service Day"
                          />
                        </div>
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="leaderName"
                            placeholder="Leader Name"
                          />
                        </div>
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="leaderWhatsapp"
                            placeholder="Leader WhatsApp No."
                          />
                        </div>
                      </div>
                      <div className="row row-cols-2 d-flex align-items-center" />
                      <small className="text-muted">Enter Your Location</small>
                      <div className="row row-cols-2 d-flex align-items-center">
                        <div className="col">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="venueLatitude"
                            placeholder="Latitude"
                          />
                        </div>
                        <div className="col">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="venueLongitude"
                            placeholder="Longitude"
                          />
                        </div>
                        <div className="col-auto mt-2">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              setPositionLoading(true)

                              window.navigator.geolocation.getCurrentPosition(
                                (position) => {
                                  formik.setFieldValue(
                                    'venueLatitude',
                                    position.coords.latitude
                                  )
                                  formik.setFieldValue(
                                    'venueLongitude',
                                    position.coords.longitude
                                  )
                                  document
                                    .getElementById('venueLongitude')
                                    .focus()
                                  document
                                    .getElementById('venueLatitude')
                                    .focus()
                                  document
                                    .getElementById('venueLatitude')
                                    .blur()
                                  setPositionLoading(false)
                                }
                              )
                            }}
                          >
                            Locate Me Now
                          </button>

                          {positionLoading ? (
                            <span className="mx-3">
                              <Spinner />
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <small className="text-muted">
                        Click this button if you are currently at your bacenta
                        location
                      </small>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center m">
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="btn btn-primary px-5 py-3"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    )
  } else {
    return <ErrorScreen />
  }
}
