import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from '../../global-utils'
import FormikControl from '../../components/formik-components/FormikControl'
import {
  GET_CENTRE_BACENTAS,
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
  GET_TOWNS,
  GET_CAMPUSES,
  BISHOP_MEMBER_DROPDOWN,
} from '../../queries/ListQueries'
import {
  ADD_BACENTA_CENTRE,
  REMOVE_BACENTA_CENTRE,
  UPDATE_BACENTA,
} from '../../queries/UpdateMutations'
import { NavBar } from '../../components/nav/NavBar'
import { ErrorScreen, LoadingScreen } from '../../components/StatusScreens.jsx'
import { ChurchContext } from '../../contexts/ChurchContext'
import { DISPLAY_BACENTA } from '../../queries/ReadQueries'
import Spinner from '../../components/Spinner.jsx'
import { LOG_BACENTA_HISTORY } from '../../queries/LogMutations'
import { MemberContext } from '../../contexts/MemberContext'

export const UpdateBacenta = () => {
  const { church, bishopId, centreId, setCentreId, bacentaId } = useContext(
    ChurchContext
  )
  const { currentUser } = useContext(MemberContext)

  let townCampusIdVar

  const { data: bacentaData, loading: bacentaLoading } = useQuery(
    DISPLAY_BACENTA,
    {
      variables: { id: bacentaId },
    }
  )

  const history = useHistory()
  const [positionLoading, setPositionLoading] = useState(false)

  const initialValues = {
    bacentaName: bacentaData?.displayBacenta?.name,
    leaderSelect: bacentaData?.displayBacenta?.leader.id,
    leaderName: `${bacentaData?.displayBacenta?.leader.firstName} ${bacentaData?.displayBacenta?.leader.lastName} `,
    townCampusSelect:
      bacentaData?.displayBacenta?.centre?.town?.id ??
      bacentaData?.displayBacenta?.centre?.campus?.id,
    centreSelect: bacentaData?.displayBacenta?.centre?.id,
    meetingDay: bacentaData?.displayBacenta?.meetingDay?.day,
    venueLatitude: bacentaData?.displayBacenta?.location?.latitude ?? '',
    venueLongitude: bacentaData?.displayBacenta?.location?.longitude ?? '',
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
    leaderSelect: Yup.string().required(
      'Please select a leader from the dropdown'
    ),
  })

  const { data: townListData } = useQuery(GET_TOWNS, {
    variables: { id: bishopId },
  })
  const { data: campusListData } = useQuery(GET_CAMPUSES, {
    variables: { id: bishopId },
  })

  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY, {
    refetchQueries: [{ query: DISPLAY_BACENTA, variables: { id: bacentaId } }],
  })

  const [UpdateBacenta] = useMutation(UPDATE_BACENTA, {
    onCompleted: (updatedInfo) => {
      let newLeaderInfo = updatedInfo.UpdateBacenta?.leader
      //Log if the Leader Changes

      if (newLeaderInfo.id !== initialValues.leaderSelect) {
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            oldLeaderId: bacentaData?.displayBacenta?.leader.id,
            newLeaderId: newLeaderInfo.id,
            oldCentreId: '',
            newCentreId: '',
            loggedBy: currentUser.id,
            historyRecord: `${newLeaderInfo.firstName} ${newLeaderInfo.lastName} was transferred to become the new Bacenta Leader for ${initialValues.bacentaName} replacing ${bacentaData?.displayBacenta?.leader.firstName} ${bacentaData?.displayBacenta?.leader.lastName}`,
          },
        })
      }
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

  const [AddBacentaCentre] = useMutation(ADD_BACENTA_CENTRE, {
    onCompleted: (newCentre) => {
      if (initialValues.centreSelect) {
        //Remove Link to the old Bacenta
        RemoveBacentaCentre({
          variables: {
            centreId: initialValues.centreSelect,
            bacentaId: bacentaId,
          },
        })
      }

      //After Adding the bacenta to a centre, then you log that change.
      LogBacentaHistory({
        variables: {
          bacentaId: bacentaId,
          newLeaderId: '',
          oldLeaderId: '',
          newCentreId: newCentre.AddBacentaCentre.from
            ? newCentre.AddBacentaCentre.from.id
            : '',
          oldCentreId: bacentaData?.displayBacenta?.centre
            ? bacentaData?.displayBacenta?.centre.id
            : null,
          loggedBy: currentUser.id,
          historyRecord: `${initialValues.bacentaName} Bacenta has been moved from ${bacentaData?.displayBacenta?.centre.name} Centre to ${newCentre.AddBacentaCentre.from.name} Centre`,
        },
      })
    },
  })

  if (bacentaLoading) {
    return <LoadingScreen />
  } else if (bacentaData && campusListData && townListData) {
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
          leaderId: values.leaderSelect,
          meetingDay: values.meetingDay,
          venueLongitude: parseFloat(values.venueLongitude),
          venueLatitude: parseFloat(values.venueLongitude),
        },
      })

      //Log If The Centre Changes
      if (values.centreSelect !== initialValues.centreSelect) {
        AddBacentaCentre({
          variables: {
            centreId: values.centreSelect,
            bacentaId: bacentaId,
          },
        })
      }

      //Log if the Bacenta Name Changes
      if (values.bacentaName !== initialValues.bacentaName) {
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            newLeaderId: '',
            oldLeaderId: '',
            oldCentreId: '',
            newCentreId: '',
            loggedBy: currentUser.id,
            historyRecord: `The Bacenta name has been changed from ${initialValues.bacentaName} to ${values.bacentaName}`,
          },
        })
      }

      // Log if the Meeting Day Changes
      if (values.meetingDay !== initialValues.meetingDay) {
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            newLeaderId: '',
            oldLeaderId: '',
            oldCentreId: '',
            newCentreId: '',
            loggedBy: currentUser.id,
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
            newLeaderId: '',
            oldLeaderId: '',
            oldCentreId: '',
            newCentreId: '',
            loggedBy: currentUser.id,
            historyRecord: `${values.bacentaName} has changed their venue`,
          },
        })
      }

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      history.push(`/bacenta/displaydetails`)
    }

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
                              townOptions.length ? townOptions : campusOptions
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
                              townCampusIdVar ?? initialValues.townCampusSelect
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
                            control="combobox2"
                            name="leaderSelect"
                            initialValue={initialValues.leaderName}
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
                            error={formik.errors.leaderSelect}
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
      </>
    )
  } else {
    return <ErrorScreen />
  }
}
