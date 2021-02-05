import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import { GET_CENTRES, GET_TOWNS } from '../queries/ListQueries'
import { CREATE_BACENTA_MUTATION } from '../queries/AdditionMutations'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { ChurchContext } from '../contexts/ChurchContext'

export const AddBacenta = () => {
  const initialValues = {
    bacentaName: '',
    bacentaLeaderName: '',
    bacentaLeaderWhatsApp: '',
    whatsappNumber: '',
    meetingDay: '',
    venueLatitude: '',
    venueLongitude: '',
  }

  const serviceDayOptions = [
    { key: 'Tuesday', value: 'Tuesday' },
    { key: 'Wednesday', value: 'Wednesday' },
    { key: 'Thursday', value: 'Thursday' },
    { key: 'Friday', value: 'Friday' },
    { key: 'Saturday', value: 'Saturday' },
  ]

  const phoneRegExp = /^[+][(]{0,1}[1-9]{1,4}[)]{0,1}[-\s/0-9]*$/
  const validationSchema = Yup.object({
    bacentaName: Yup.string().required('Bacenta Name is a required field'),
    bacentaLeaderName: Yup.string().required('This is a required field'),
    bacentaLeaderWhatsApp: Yup.string().matches(
      phoneRegExp,
      `Phone Number must start with + and country code (eg. '+233')`
    ),
    meetingDay: Yup.string().required('Meeting Day is a required field'),
    venueLatitude: Yup.string().required('Please fill in your location info'),
    venueLongitude: Yup.string().required('Please fill in your location info'),
  })

  const { bishopID, townID, setTownID, bacentaID, setBacentaID } = useContext(
    ChurchContext
  )

  const [AddBacenta, { data: newBacentaData }] = useMutation(
    CREATE_BACENTA_MUTATION,
    {
      onCompleted: (newBacentaData) => {
        setBacentaID(newBacentaData.AddBacenta.bacentaID)
      },
    }
  )
  console.log(newBacentaData)
  const history = useHistory()

  const { data: townListData, loading: townListLoading } = useQuery(GET_TOWNS, {
    variables: { bishopID: bishopID },
  })

  const { data: communityListData, loading: communityListLoading } = useQuery(
    GET_CENTRES,
    {
      variables: { townID: townID },
    }
  )

  if (communityListData && townListData) {
    const communityOptions = communityListData.communityList.map((comm) => ({
      value: comm.communityID,
      key: comm.name,
    }))

    const townOptions = townListData.townList.map((town) => ({
      value: town.townID,
      key: town.name,
    }))
    // console.log('Data is here')

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      AddBacenta({
        variables: {
          bacentaName: values.bacentaName,
          bacentaLeaderFName: values.bacentaLeaderFName,
          bacentaLeaderLName: values.bacentaLeaderLName,
          lWhatsappNumber: values.whatsappNumber,
          communityID: values.communitySelect,
          meetingDay: values.meetingDay,
          venueLongitude: parseFloat(values.venueLongitude),
          venueLatitude: parseFloat(values.venueLatitude),
        },
      })
      // console.log('Form data', values)
      onSubmitProps.setSubmitting(false)
      console.log('Bacenta ID', bacentaID)
      // onSubmitProps.resetForm()
      history.push('/bacenta/displaydetails')
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
                            options={townOptions}
                            onChange={(e) => {
                              setTownID(e.target.value)
                            }}
                            defaultOption="Select a Town"
                          />
                          <FormikControl
                            className="form-control"
                            control="select"
                            name="communitySelect"
                            options={communityOptions}
                            defaultOption="Select a Community"
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
                            name="bacentaLeaderFName"
                            placeholder="Leader Name"
                          />
                        </div>
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="bacentaLeaderWhatsapp"
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
                        <div className="col mt-2">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              // setPositionLoading(true)
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
                                  // setPositionLoading(false)
                                  //console.log(formik.values)
                                }
                              )
                            }}
                          >
                            Locate Me Now
                          </button>

                          {/* {positionLoading ? (
														<span>
															<Spinner />
														</span>
													) : null} */}
                        </div>
                      </div>
                      <small className="text-muted">
                        Click this button if you are currently at your bacenta
                        location
                      </small>

                      {/* <div className="form-row row-cols-3">
											<div className="col-9">
											<FormikControl
													className="form-control"
													control="input"
													name="bacenta"
													placeholder="Bacenta"
												/>
											</div>
										</div>
										<small className="text-muted">
											List any Bacentas that are being
											moved to this Bacenta
										</small> 
										<div>
											<button
												type="submit"
												className="btn btn-primary">
												Add Bacenta
											</button>
										</div> */}
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
  } else if (townListLoading || communityListLoading) {
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  }
}
