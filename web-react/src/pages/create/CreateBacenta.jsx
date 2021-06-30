import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  capitalise,
  DECIMAL_NUM_REGEX,
  makeSelectOptions,
  SERVICE_DAY_OPTIONS,
} from '../../global-utils'
import FormikControl from '../../components/formik-components/FormikControl'

import {
  GET_BISHOP_CAMPUSES,
  GET_TOWN_CENTRES,
  GET_CAMPUS_CENTRES,
  GET_BISHOP_TOWNS,
  BISHOP_MEMBER_DROPDOWN,
} from '../../queries/ListQueries'
import { CREATE_BACENTA_MUTATION } from './CreateMutations'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import Spinner from '../../components/Spinner.jsx'

const CreateBacenta = () => {
  const initialValues = {
    bacentaName: '',
    leaderId: '',
    townSelect: '',
    centreSelect: '',
    meetingDay: '',
    venueLatitude: '',
    venueLongitude: '',
  }

  const { church, bishopId, setBacentaId } = useContext(ChurchContext)

  let townCampusIdVar

  const validationSchema = Yup.object({
    bacentaName: Yup.string().required('Bacenta Name is a required field'),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    meetingDay: Yup.string().required('Meeting Day is a required field'),
    venueLatitude: Yup.string()
      .required('Please fill in your location info')
      .test('is-decimal', 'Please enter valid coordinates', (value) =>
        (value + '').match(DECIMAL_NUM_REGEX)
      ),
    venueLongitude: Yup.string()
      .required('Please fill in your location info')
      .test('is-decimal', 'Please enter valid coordinates', (value) =>
        (value + '').match(DECIMAL_NUM_REGEX)
      ),
  })

  const history = useHistory()
  const [positionLoading, setPositionLoading] = useState(false)
  const [CreateBacenta] = useMutation(CREATE_BACENTA_MUTATION, {
    onCompleted: (newBacentaData) => {
      setBacentaId(newBacentaData.CreateBacenta.id)
      history.push('/bacenta/displaydetails')
    },
  })

  const { data: townListData, loading: townListLoading } = useQuery(
    GET_BISHOP_TOWNS,
    {
      variables: { id: bishopId },
    }
  )
  const { data: campusListData, loading: campusListLoading } = useQuery(
    GET_BISHOP_CAMPUSES,
    {
      variables: { id: bishopId },
    }
  )

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    CreateBacenta({
      variables: {
        bacentaName: values.bacentaName,
        leaderId: values.leaderId,
        centreId: values.centreSelect,
        meetingDay: values.meetingDay,
        venueLongitude: parseFloat(values.venueLongitude),
        venueLatitude: parseFloat(values.venueLatitude),
      },
    }).then(() => {
      // console.log('Form data', values)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
    })
  }

  if (townListLoading || campusListLoading) {
    return <LoadingScreen />
  } else if (townListData && campusListData) {
    const townOptions = townListData
      ? makeSelectOptions(townListData.members[0]?.townBishop)
      : []
    const campusOptions = campusListData
      ? makeSelectOptions(campusListData.members[0]?.campusBishop)
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
                            options={
                              church.church === 'town'
                                ? townOptions
                                : campusOptions
                            }
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
                            dataset="centres"
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
                            options={SERVICE_DAY_OPTIONS}
                            defaultOption="Pick a Service Day"
                          />
                        </div>
                        <div className="col-9">
                          <FormikControl
                            control="combobox2"
                            name="leaderId"
                            placeholder="Select a Leader"
                            setFieldValue={formik.setFieldValue}
                            optionsQuery={BISHOP_MEMBER_DROPDOWN}
                            queryVariable1="id"
                            variable1={bishopId}
                            queryVariable2="nameSearch"
                            suggestionText="name"
                            suggestionID="id"
                            dataset="bishopMemberDropdown"
                            aria-describedby="Bishop Member List"
                            className="form-control"
                            error={formik.errors.leaderId}
                          />
                        </div>
                      </div>
                      <small className="text-muted">
                        Enter The Coordinates for the Service Venue
                      </small>

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
                        service venue
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

export default CreateBacenta
