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

export const UpdateBacenta = () => {
  const {
    church,
    parsePhoneNum,
    capitalise,
    phoneRegExp,
    townID,
    campusID,
    centreID,
    setCentreID,
    bacentaID,
  } = useContext(ChurchContext)

  const { data: bacentaData, loading: bacentaLoading } = useQuery(
    DISPLAY_BACENTA,
    {
      variables: { id: bacentaID },
    }
  )

  const history = useHistory()
  const [positionLoading, setPositionLoading] = useState(false)

  const initialValues = {
    bacentaName: bacentaData?.displayBacenta?.name,
    leaderName: `${bacentaData?.displayBacenta?.leader.firstName} ${bacentaData?.displayBacenta?.leader.lastName} `,
    leaderWhatsapp: `+${bacentaData?.displayBacenta?.leader.whatsappNumber}`,
    centreSelect: bacentaData?.displayBacenta?.centre?.id,
    meetingDay: bacentaData?.displayBacenta?.meetingDay?.day,
    venueLatitude: bacentaData?.displayBacenta?.location?.latitude,
    venueLongitude: bacentaData?.displayBacenta?.location?.longitude,
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

  const [UpdateBacenta] = useMutation(UPDATE_BACENTA, {
    refetchQueries: [
      { query: DISPLAY_BACENTA, variables: { id: bacentaID } },
      { query: GET_CENTRE_BACENTAS, variables: { id: centreID } },
      {
        query: GET_CENTRE_BACENTAS,
        variables: { id: initialValues.centreSelect },
      },
    ],
  })
  const [AddBacentaCentre] = useMutation(ADD_BACENTA_CENTRE)
  const [RemoveBacentaCentre] = useMutation(REMOVE_BACENTA_CENTRE)

  if (bacentaLoading) {
    return <LoadingScreen />
  } else if (bacentaData) {
    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setCentreID(values.centreSelect)
      UpdateBacenta({
        variables: {
          id: bacentaID,
          name: values.bacentaName,
          lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
          meetingDay: values.meetingDay,
          venueLongitude: parseFloat(values.venueLongitude),
          venueLatitude: parseFloat(values.venueLongitude),
        },
      })
      if (values.centreSelect !== initialValues.centreSelect) {
        console.log(bacentaData?.displayBacenta?.centre?.name)
        RemoveBacentaCentre({
          variables: {
            centreID: initialValues.centreSelect,
            bacentaID: bacentaID,
          },
        })
        AddBacentaCentre({
          variables: {
            centreID: values.centreSelect,
            bacentaID: bacentaID,
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
                              church.church === 'town' ? townID : campusID
                            }
                            defaultOption="Select a Centre"
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
                                  //console.log(formik.values)
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
