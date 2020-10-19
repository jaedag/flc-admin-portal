import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import { GET_COMMUNITIES, GET_TOWNS } from '../queries/DropDownQueries'
import { CREATE_CENTRE_MUTATION } from '../queries/AdditionMutations'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { TownContext, CentreContext } from '../context/ChurchContext'

function AddCentre() {
  const initialValues = {
    centreName: '',
    centreLeaderFName: '',
    centreLeaderLName: '',
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

  const validationSchema = Yup.object({
    centreName: Yup.string().required('Centre Name is a required field'),
    centreLeaderFName: Yup.string().required('This is a required field'),
    centreLeaderLName: Yup.string().required('This is a required field'),
    meetingDay: Yup.string().required('Service Day is a required field'),
    venueLatitude: Yup.string().required('Service Day is a required field'),
    venueLongitude: Yup.string().required('Service Day is a required field'),
  })

  const { townID, setTownID } = useContext(TownContext)
  const { centreID, setCentreID } = useContext(CentreContext)
  const [StartCentre, { data: newCentreData }] = useMutation(
    CREATE_CENTRE_MUTATION,
    {
      onCompleted: (newCentreData) => {
        setCentreID(newCentreData.StartCentre.centreID)
      },
    }
  )
  console.log(newCentreData)
  const history = useHistory()

  const { data: townListData, loading: townListLoading } = useQuery(GET_TOWNS, {
    variables: { aFirstName: 'Frank', aLastName: 'Opoku' },
  })

  const { data: communityListData, loading: communityListLoading } = useQuery(
    GET_COMMUNITIES,
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
      console.log(values.townSelect)
      StartCentre({
        variables: {
          centreName: values.centreName,
          centreLeaderFName: values.centreLeaderFName,
          centreLeaderLName: values.centreLeaderLName,
          lWhatsappNumber: values.whatsappNumber,
          communityID: values.communitySelect,
          meetingDay: values.meetingDay,
          venueLongitude: parseFloat(values.venueLongitude),
          venueLatitude: parseFloat(values.venueLatitude),
        },
      })
      // console.log('Form data', values)
      onSubmitProps.setSubmitting(false)
      console.log('Centre ID', centreID)
      // onSubmitProps.resetForm()
      history.push('/centre/displaydetails')
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
              <div className="container infobar">Start a New Centre</div>
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
                            name="centreName"
                            placeholder="Name of Centre"
                          />
                          <FormikControl
                            className="form-control"
                            control="select"
                            name="meetingDay"
                            options={serviceDayOptions}
                            defaultOption="Pick a Service Day"
                          />
                        </div>
                      </div>
                      <div className="row row-cols-2 d-flex align-items-center">
                        <div className="col">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="centreLeaderFName"
                            placeholder="Leader First Name"
                          />
                        </div>
                        <div className="col">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="centreLeaderLName"
                            placeholder="Leader Last Name"
                          />
                        </div>
                      </div>
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
                              window.navigator.geolocation.getCurrentPosition(
                                (position) => {
                                  formik.values.venueLatitude =
                                    position.coords.latitude
                                  formik.values.venueLongitude =
                                    position.coords.longitude
                                  document
                                    .getElementById('venueLongitude')
                                    .focus()
                                  document
                                    .getElementById('venueLatitude')
                                    .focus()
                                  document
                                    .getElementById('venueLatitude')
                                    .blur()
                                  //console.log(formik.values)
                                }
                              )
                            }}
                          >
                            Locate Me Now
                          </button>
                        </div>
                      </div>
                      <small className="text-muted">
                        Click this button if you are currently at your centre
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
											moved to this Centre
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

export default AddCentre
