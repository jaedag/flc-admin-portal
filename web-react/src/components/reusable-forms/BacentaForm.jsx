import { useMutation, useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import NavBar from 'components/nav/NavBar'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
  capitalise,
  DECIMAL_NUM_REGEX,
  makeSelectOptions,
  SERVICE_DAY_OPTIONS,
} from 'global-utils'
import {
  BISHOP_MEMBER_DROPDOWN,
  GET_BISHOP_CAMPUSES,
  GET_BISHOP_TOWNS,
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
} from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import FormikControl from 'components/formik-components/FormikControl'
import Spinner from 'components/Spinner'
import { MAKE_BACENTA_INACTIVE } from 'pages/update/CloseChurchMutations'
import { useHistory } from 'react-router'
import Popup from 'components/Popup/Popup'

const BacentaForm = ({
  initialValues,
  onSubmit,
  title,
  loadingState,
  newBacenta,
}) => {
  const {
    church,
    clickCard,
    isOpen,
    togglePopup,
    bacentaId,
    bishopId,
  } = useContext(ChurchContext)
  const history = useHistory()

  const {
    data: townListData,
    loading: townListLoading,
    error: townListError,
  } = useQuery(GET_BISHOP_TOWNS, {
    variables: { id: bishopId },
  })
  const {
    data: campusListData,
    loading: campusListLoading,
    error: campusListError,
  } = useQuery(GET_BISHOP_CAMPUSES, {
    variables: { id: bishopId },
  })
  const [MakeBacentaInactive] = useMutation(MAKE_BACENTA_INACTIVE)

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

  const [positionLoading, setPositionLoading] = useState(false)

  const townOptions = townListData
    ? makeSelectOptions(townListData.members[0]?.isBishopForTown)
    : []
  const campusOptions = campusListData
    ? makeSelectOptions(campusListData.members[0]?.isBishopForCampus)
    : []
  let townCampusIdVar =
    church.church === 'town' ? townOptions[0]?.value : campusOptions[0]?.value

  return (
    <BaseComponent
      loadingState={townListLoading || campusListLoading || loadingState}
      errorState={townListError || campusListError}
    >
      <NavBar />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="body-card py-4 container mt-5">
            <div className="container infobar">{title}</div>
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
                          varValue={
                            townCampusIdVar || initialValues.townCampusSelect
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
                          options={SERVICE_DAY_OPTIONS}
                          defaultOption="Pick a Service Day"
                        />
                      </div>
                      <div className="col-9">
                        <FormikControl
                          control="combobox2"
                          name="leaderId"
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
                                document.getElementById('venueLatitude').focus()
                                document.getElementById('venueLatitude').blur()
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
            {isOpen && (
              <Popup handleClose={togglePopup}>
                Are you sure you want to close down this bacenta?
                <div
                  className="btn btn-primary"
                  onClick={() => {
                    MakeBacentaInactive({
                      variables: {
                        bacentaId: bacentaId,
                      },
                    })
                      .then((res) => {
                        clickCard(res.data.MakeBacentaInactive.centre)
                        togglePopup()
                        history.push('/centre/displaydetails')
                      })
                      .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.error(error)
                        alert(
                          'There was an error closing down this bacenta',
                          error
                        )
                      })
                  }}
                >
                  {`Yes, I'm sure`}
                </div>
                <div className="btn btn-primary" onClick={togglePopup}>
                  No, take me back
                </div>
              </Popup>
            )}

            {!newBacenta && (
              <div className="btn btn-primary" onClick={togglePopup}>
                Close Down Bacenta
              </div>
            )}
          </div>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default BacentaForm
