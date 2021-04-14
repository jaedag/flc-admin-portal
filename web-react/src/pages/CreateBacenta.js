import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import {
  GET_CAMPUSES,
  GET_TOWN_CENTRES,
  GET_CAMPUS_CENTRES,
  GET_TOWNS,
} from '../queries/ListQueries'
import { CREATE_BACENTA_MUTATION } from '../queries/CreateMutations'
import { NavBar } from '../components/nav/NavBar'
import { ChurchContext } from '../contexts/ChurchContext'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import Spinner from '../components/Spinner'

export const CreateBacenta = () => {
  const initialValues = {
    bacentaName: '',
    leaderName: '',
    leaderWhatsapp: '',
    townSelect: '',
    centreSelect: '',
    meetingDay: '',
    venueLatitude: '',
    venueLongitude: '',
  }

  const {
    church,
    capitalise,
    makeSelectOptions,
    parsePhoneNum,
    bishopId,
    setBacentaId,
    phoneRegExp,
  } = useContext(ChurchContext)

  let townCampusIdVar
  const serviceDayOptions = [
    { key: 'Tuesday', value: 'Tuesday' },
    { key: 'Wednesday', value: 'Wednesday' },
    { key: 'Thursday', value: 'Thursday' },
    { key: 'Friday', value: 'Friday' },
    { key: 'Saturday', value: 'Saturday' },
  ]

  const validationSchema = Yup.object({
    bacentaName: Yup.string().required('Bacenta Name is a required field'),
    leaderName: Yup.string().required('This is a required field'),
    leaderWhatsapp: Yup.string()
      .matches(
        phoneRegExp,
        `Phone Number must start with + and country code (eg. '+233')`
      )
      .required('Phone Number is required'),
    meetingDay: Yup.string().required('Meeting Day is a required field'),
    venueLatitude: Yup.string().required('Please fill in your location info'),
    venueLongitude: Yup.string().required('Please fill in your location info'),
  })

  const history = useHistory()
  const [positionLoading, setPositionLoading] = useState(false)
  const [CreateBacenta] = useMutation(CREATE_BACENTA_MUTATION, {
    onCompleted: (newBacentaData) => {
      setBacentaId(newBacentaData.CreateBacenta.id)
      history.push('/bacenta/displaydetails')
    },
  })

  const { data: townListData, loading: townListLoading } = useQuery(GET_TOWNS, {
    variables: { id: bishopId },
  })
  const { data: campusListData, loading: campusListLoading } = useQuery(
    GET_CAMPUSES,
    {
      variables: { id: bishopId },
    }
  )

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    CreateBacenta({
      variables: {
        bacentaName: values.bacentaName,
        lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
        centreId: values.centreSelect,
        meetingDay: values.meetingDay,
        venueLongitude: parseFloat(values.venueLongitude),
        venueLatitude: parseFloat(values.venueLatitude),
      },
    })

    // console.log('Form data', values)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
  }

  if (townListLoading || campusListLoading) {
    return <LoadingScreen />
  } else if (townListData && campusListData) {
    const townOptions = townListData
      ? makeSelectOptions(townListData.townList)
      : []
    const campusOptions = campusListData
      ? makeSelectOptions(campusListData.campusList)
      : []

    return (
      <>
        <NavBar />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="body-card py-4 container mt-5">
              <div className="container infobar">Start a New Bacenta</div>
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
                            name="townSelect"
                            options={townOptions ?? campusOptions}
                            onChange={(e) => {
                              formik.setFieldValue('townSelect', e.target.value)
                              townCampusIdVar = e.target.value
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
                            varValue={townCampusIdVar}
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
      </>
    )
  } else {
    return <ErrorScreen />
  }
}
