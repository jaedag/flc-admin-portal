import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from '../global-utils'
import FormikControl from '../components/formik-components/FormikControl.jsx'

import {
  GET_BISHOPS,
  CENTRE_DROPDOWN,
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
  GET_TOWNS,
  GET_CAMPUSES,
  BISHOP_MEMBER_DROPDOWN,
} from '../queries/ListQueries'
import { BISH_DASHBOARD_COUNTS } from '../queries/CountQueries'
import {
  UPDATE_TOWN_MUTATION,
  UPDATE_CAMPUS_MUTATION,
  ADD_TOWN_BISHOP,
  REMOVE_TOWN_BISHOP,
  ADD_CAMPUS_BISHOP,
  REMOVE_CAMPUS_BISHOP,
  REMOVE_CENTRE_CAMPUS,
  REMOVE_CENTRE_TOWN,
  ADD_CAMPUS_CENTRES,
  ADD_TOWN_CENTRES,
} from '../queries/UpdateMutations.js'
import { NavBar } from '../components/nav/NavBar.jsx'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { ChurchContext } from '../contexts/ChurchContext'
import { DISPLAY_CAMPUS, DISPLAY_TOWN } from '../queries/ReadQueries'
import PlusSign from '../components/buttons/PlusSign.jsx'
import MinusSign from '../components/buttons/MinusSign.jsx'
import {
  LOG_CAMPUSTOWN_HISTORY,
  LOG_CENTRE_HISTORY,
} from '../queries/LogMutations'
import { MemberContext } from '../contexts/MemberContext'

export const UpdateTownCampus = () => {
  const { church, campusId, townId, bishopId, setBishopId } = useContext(
    ChurchContext
  )
  const { currentUser } = useContext(MemberContext)

  const { data: campusData, loading: campusLoading } = useQuery(
    DISPLAY_CAMPUS,
    {
      variables: { id: campusId },
    }
  )

  const { data: townData, loading: townLoading } = useQuery(DISPLAY_TOWN, {
    variables: { id: townId },
  })

  const { data: bishopsData, loading: bishopsLoading } = useQuery(GET_BISHOPS)

  const history = useHistory()

  const campusTownData =
    church.church === 'campus'
      ? campusData?.displayCampus
      : townData?.displayTown

  const initialValues = {
    campusTownName: campusTownData?.name,
    leaderName:
      campusTownData?.leader &&
      `${campusTownData?.leader?.firstName} ${campusTownData?.leader?.lastName} `,
    leaderSelect: campusTownData?.leader?.id,
    bishopSelect: campusTownData?.bishop?.id,
    centres: campusTownData?.centres?.length ? campusTownData.centres : [''],
  }

  const validationSchema = Yup.object({
    campusTownName: Yup.string().required(
      `${capitalise(church.church)} Name is a required field`
    ),
    leaderSelect: Yup.string().required(
      'Please select a leader from the dropdown'
    ),
    // centres: Yup.array().of(
    //   Yup.string().required('Please pick a centre from the dropdown')
    // ),
  })

  const [LogCampusTownHistory] = useMutation(LOG_CAMPUSTOWN_HISTORY, {
    refetchQueries: [
      { query: DISPLAY_CAMPUS, variables: { id: campusId } },
      { query: DISPLAY_TOWN, variables: { id: townId } },
    ],
  })
  const [LogCentreHistory] = useMutation(LOG_CENTRE_HISTORY, {
    refetchQueries: [
      { query: DISPLAY_CAMPUS, variables: { id: campusId } },
      { query: DISPLAY_TOWN, variables: { id: townId } },
    ],
  })

  const [UpdateTown] = useMutation(
    UPDATE_TOWN_MUTATION,
    {
      onCompleted: (updatedInfo) => {
        let newLeaderInfo = updatedInfo.UpdateTown?.leader
        let historyRecord
        if (townData?.displayTown?.leader) {
          historyRecord = `${newLeaderInfo.firstName} ${newLeaderInfo.lastName} was transferred to become the new Town CO for ${initialValues.campusTownName} replacing ${townData?.displayTown?.leader.firstName} ${townData?.displayTown?.leader.lastName}`
        }
        if (!townData?.displayTown?.leader) {
          historyRecord = `${newLeaderInfo.firstName} ${newLeaderInfo.lastName} was transferred to become the new Town CO for ${initialValues.campusTownName}`
        }

        //Log if the Leader Changes
        if (newLeaderInfo.id !== initialValues.leaderSelect) {
          LogCampusTownHistory({
            variables: {
              campusTownId: townId,
              newLeaderId: newLeaderInfo.id,
              oldLeaderId: townData?.displayTown?.leader
                ? townData.displayTown.leader?.id
                : '',
              oldBishopId: '',
              newBishopId: '',
              loggedBy: currentUser.id,
              historyRecord: historyRecord,
            },
          })
        }
      },
    },
    {
      refetchQueries: [
        { query: DISPLAY_TOWN, variables: { id: townId } },
        { query: GET_TOWN_CENTRES, variables: { id: townId } },
        { query: GET_TOWNS, variables: { id: bishopId } },
        {
          query: GET_TOWNS,
          variables: { id: initialValues.bishopSelect },
        },
        { query: BISH_DASHBOARD_COUNTS, variables: { id: bishopId } },
      ],
    }
  )

  const [UpdateCampus] = useMutation(
    UPDATE_CAMPUS_MUTATION,
    {
      onCompleted: (updatedInfo) => {
        let newLeaderInfo = updatedInfo.UpdateCampus?.leader
        let historyRecord
        if (campusData?.displayCampus?.leader) {
          historyRecord = `${newLeaderInfo.firstName} ${newLeaderInfo.lastName} was transferred to become the new Campus CO for ${initialValues.campusTownName} replacing ${campusData?.displayCampus?.leader.firstName} ${campusData?.displayCampus?.leader.lastName}`
        }
        if (!campusData?.displayCampus?.leader) {
          historyRecord = `${newLeaderInfo.firstName} ${newLeaderInfo.lastName} was transferred to become the new Campus CO for ${initialValues.campusTownName}`
        }
        //Log if the Leader Changes
        if (newLeaderInfo.id !== initialValues.leaderSelect) {
          LogCampusTownHistory({
            variables: {
              campusTownId: campusId,
              newLeaderId: newLeaderInfo.id,
              oldLeaderId: campusData?.displayCampus.leader
                ? campusData?.displayCampus.leader?.id
                : '',
              oldBishopId: '',
              newBishopId: '',
              loggedBy: currentUser.id,
              historyRecord: historyRecord,
            },
          })
        }
      },
    },
    {
      refetchQueries: [
        { query: DISPLAY_CAMPUS, variables: { id: campusId } },
        { query: GET_CAMPUS_CENTRES, variables: { id: campusId } },
        { query: GET_CAMPUSES, variables: { id: bishopId } },
        {
          query: GET_CAMPUSES,
          variables: { id: initialValues.bishopSelect },
        },
        { query: BISH_DASHBOARD_COUNTS, variables: { id: bishopId } },
      ],
    }
  )

  //Changes downwards. ie. Centre Changes underneath CampusTown
  const [AddCampusCentres] = useMutation(ADD_CAMPUS_CENTRES)
  const [AddTownCentres] = useMutation(ADD_TOWN_CENTRES)
  const [RemoveCentreCampus] = useMutation(REMOVE_CENTRE_CAMPUS, {
    onCompleted: (data) => {
      let prevCampus = data.RemoveCentreCampus?.from
      let newCampusId = ''
      let oldCampusId = ''
      let historyRecord

      if (data.RemoveCentreCampus.from.id === campusId) {
        //Centre has previous campus which is current campus and is going
        oldCampusId = campusId
        newCampusId = ''
        historyRecord = `${data.RemoveCentreCampus.to.name}
      Centre has been moved from ${initialValues.campusTownName} Campus`
      } else if (prevCampus.id !== campusId) {
        //Centre has previous campus which is not current campus and is joining
        oldCampusId = prevCampus.id
        newCampusId = campusId
        historyRecord = `${data.RemoveCentreCampus.to.name} 
      Centre has been moved to ${initialValues.campusTownName} Campus 
      from ${prevCampus.name} Town`
      }

      //After removing the centre from a campus, then you log that change.
      LogCentreHistory({
        variables: {
          centreId: data.RemoveCentreCampus?.to.id,
          newLeaderId: '',
          oldLeaderId: '',
          newCampusTownId: newCampusId,
          oldCampusTownId: oldCampusId,
          loggedBy: currentUser.id,
          historyRecord: historyRecord,
        },
      })
    },
  })
  const [RemoveCentreTown] = useMutation(REMOVE_CENTRE_TOWN, {
    onCompleted: (data) => {
      let prevTown = data.RemoveCentreTown?.from
      let newTownId = ''
      let oldTownId = ''
      let historyRecord

      if (data.RemoveCentreTown.from.id === townId) {
        //Centre has previous town which is current town and is going
        oldTownId = townId
        newTownId = ''
        historyRecord = `${data.RemoveCentreTown.to.name}
      Centre has been moved from ${initialValues.campusTownName} Town`
      } else if (prevTown.id !== townId) {
        //Centre has previous town which is not current town and is joining
        oldTownId = prevTown.id
        newTownId = townId
        historyRecord = `${data.RemoveCentreTown.to.name} 
      Centre has been moved to ${initialValues.campusTownName} Town 
      from ${prevTown.name} Town`
      }

      //After removing the centre from a town, then you log that change.
      LogCentreHistory({
        variables: {
          centreId: data.RemoveCentreTown?.to.id,
          newLeaderId: '',
          oldLeaderId: '',
          newCampusTownId: newTownId,
          oldCampusTownId: oldTownId,
          loggedBy: currentUser.id,
          historyRecord: historyRecord,
        },
      })
    },
  })

  //Changes upwards. it. Changes to the Bishop the Campus Town is under
  const [RemoveCampusBishop] = useMutation(REMOVE_CAMPUS_BISHOP)
  const [RemoveTownBishop] = useMutation(REMOVE_TOWN_BISHOP)
  const [AddCampusBishop] = useMutation(ADD_CAMPUS_BISHOP, {
    onCompleted: (data) => {
      if (!campusData?.displayCampus?.bishop.firstName) {
        //If There is no old Bishop
        let recordIfNoOldBishop = `${initialValues.campusTownName} Campus has been moved to Bishop ${data.AddCampusBishop.from.firstName} ${data.AddCampusBishop.from.firstName}`

        LogCampusTownHistory({
          variables: {
            campusTownId: campusId,
            newLeaderId: '',
            oldLeaderId: '',
            newBishopId: data.AddCampusBishop.from.id,
            oldBishopId: campusData?.displayCampus?.bishop.id,
            loggedBy: currentUser.id,
            historyRecord: recordIfNoOldBishop,
          },
        })
      } else {
        //If there is an old Bishop

        //Break Link to the Old Bishop
        RemoveCampusBishop({
          variables: {
            bishopId: initialValues.bishopSelect,
            campusId: campusId,
          },
        })

        let recordIfOldBishop = `${initialValues.campusTownName} Campus has been moved from Bishop ${campusData?.displayCampus?.bishop.firstName} ${campusData?.displayCampus?.bishop.lastName} 
        to Bishop ${data.AddCampusBishop.from.firstName} ${data.AddCampusBishop.from.lastName} `

        //After Adding the campus to a bishop, then you log that change.
        LogCampusTownHistory({
          variables: {
            campusTownId: campusId,
            newLeaderId: '',
            oldLeaderId: '',
            newBishopId: data.AddCampusBishop.from.id,
            oldBishopId: campusData?.displayCampus?.bishop.id,
            loggedBy: currentUser.id,
            historyRecord: recordIfOldBishop,
          },
        })
      }
    },
  })
  const [AddTownBishop] = useMutation(ADD_TOWN_BISHOP, {
    onCompleted: (data) => {
      if (!townData?.displayTown?.bishop.firstName) {
        //If There is no old Bishop
        let recordIfNoOldBishop = `${initialValues.campusTownName} Town has been moved to Bishop ${data.AddTownBishop.from.firstName} ${data.AddTownBishop.from.firstName}`

        LogCampusTownHistory({
          variables: {
            campusTownId: townId,
            newLeaderId: '',
            oldLeaderId: '',
            newBishopId: data.AddTownBishop.from.id,
            oldBishopId: townData?.displayTown?.bishop.id,
            loggedBy: currentUser.id,
            historyRecord: recordIfNoOldBishop,
          },
        })
      } else {
        //If there is an old Bishop

        //Break Link to the Old Bishop
        RemoveTownBishop({
          variables: {
            bishopId: initialValues.bishopSelect,
            townId: townId,
          },
        })

        let recordIfOldBishop = `${initialValues.campusTownName} Town has been moved from Bishop ${townData?.displayTown?.bishop.firstName} ${townData?.displayTown?.bishop.lastName} 
        to Bishop ${data.AddTownBishop.from.firstName} ${data.AddTownBishop.from.lastName} `

        //After Adding the campus to a bishop, then you log that change.
        LogCampusTownHistory({
          variables: {
            campusTownId: townId,
            newLeaderId: '',
            oldLeaderId: '',
            newBishopId: data.AddTownBishop.from.id,
            oldBishopId: townData?.displayTown?.bishop.id,
            loggedBy: currentUser.id,
            historyRecord: recordIfOldBishop,
          },
        })
      }
    },
  })

  if (bishopsLoading || townLoading || campusLoading) {
    return <LoadingScreen />
  } else if (bishopsData || townData || campusData) {
    //Refactoring the Options into Something that can be read by my formik component
    const bishopCampusOptions = makeSelectOptions(bishopsData.bishopsListCampus)
    const bishopTownOptions = makeSelectOptions(bishopsData.bishopsListTown)

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setBishopId(values.bishopSelect)

      if (church.church === 'campus') {
        UpdateCampus({
          variables: {
            campusId: campusId,
            campusName: values.campusTownName,
            leaderId: values.leaderSelect,
            bishopId: values.bishopSelect,
          },
        })

        //Log if Campus Name Changes
        if (values.campusTownName !== initialValues.campusTownName) {
          LogCampusTownHistory({
            variables: {
              campusTownId: campusId,
              newLeaderId: '',
              oldLeaderId: '',
              oldBishopId: '',
              newBishopId: '',
              loggedBy: currentUser.id,
              historyRecord: `The Campus name has been changed from ${initialValues.campusTownName} to ${values.campusTownName}`,
            },
          })
        }

        //Log if Bishop Changes
        if (values.bishopSelect !== initialValues.bishopSelect) {
          RemoveCampusBishop({
            variables: {
              bishopId: initialValues.bishopSelect,
              campusId: campusId,
            },
          })
          AddCampusBishop({
            variables: {
              bishopId: values.bishopSelect,
              campusId: campusId,
            },
          })
        }
      } else if (church.church === 'town') {
        UpdateTown({
          variables: {
            townId: townId,
            townName: values.campusTownName,
            leaderId: values.leaderSelect,
            bishopId: values.bishopSelect,
          },
        })

        //Log if Town Name Changes
        if (values.campusTownName !== initialValues.campusTownName) {
          LogCampusTownHistory({
            variables: {
              campusTownId: townId,
              newLeaderId: '',
              oldLeaderId: '',
              oldBishopId: '',
              newBishopId: '',
              loggedBy: currentUser.id,
              historyRecord: `The Town name has been changed from ${initialValues.campusTownName} to ${values.campusTownName}`,
            },
          })
        }

        //Log If The Bishop Changes
        if (values.bishopSelect !== initialValues.bishopSelect) {
          RemoveTownBishop({
            variables: {
              bishopId: initialValues.bishopSelect,
              townId: townId,
            },
          })
          AddTownBishop({
            variables: {
              bishopId: values.bishopSelect,
              townId: townId,
            },
          })
        }
      }

      //For the Adding and Removing of Centres
      const oldCentreList = initialValues.centres.map((centre) => {
        return centre.id
      })

      const newCentreList = values.centres.map((centre) => {
        return centre.id ? centre.id : centre
      })

      const removeCentres = oldCentreList.filter(function (value) {
        return !newCentreList.includes(value)
      })

      const addCentres = values.centres.filter(function (value) {
        return !oldCentreList.includes(value.id)
      })

      removeCentres.forEach((centre) => {
        RemoveCentreCampus({
          variables: {
            campusId: campusId,
            centreId: centre,
          },
        })
        RemoveCentreTown({
          variables: {
            townId: townId,
            centreId: centre,
          },
        })
      })

      addCentres.forEach((centre) => {
        if (centre.campus) {
          RemoveCentreCampus({
            variables: {
              campusId: centre.campus.id,
              centreId: centre.id,
            },
          })
        } else if (centre.town) {
          RemoveCentreTown({
            variables: {
              townId: centre.town.id,
              centreId: centre.id,
            },
          })
        } else {
          //Centre has no previous campus and is now joining. ie. RemoveCentreCampus won't run
          LogCentreHistory({
            variables: {
              centreId: centre.id,
              newLeaderId: '',
              oldLeaderId: '',
              newCampusTownId: church.church === 'campus' ? campusId : townId,
              oldCampusTownId: '',
              historyRecord: `${centre.name} Centre has been moved to ${
                initialValues.campusTownName
              } ${capitalise(church.church)}`,
            },
          })
        }
        if (church.church === 'campus') {
          AddCampusCentres({
            variables: {
              campusId: campusId,
              centreId: centre.id,
            },
          })
        }
        if (church.church === 'town') {
          AddTownCentres({
            variables: {
              townId: townId,
              centreId: centre.id,
            },
          })
        }
      })

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      history.push(`/${church.church}/displaydetails`)
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
              <div className="container infobar">{`Update ${capitalise(
                church.church
              )} Form`}</div>
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
                            name="bishopSelect"
                            options={
                              church.church === 'campus'
                                ? bishopCampusOptions
                                : bishopTownOptions
                            }
                            defaultOption="Select a Bishop"
                          />
                        </div>
                      </div>

                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="campusTownName"
                            placeholder={`Name of ${capitalise(church.church)}`}
                          />
                        </div>
                      </div>
                      <div className="row d-flex align-items-center">
                        <div className="col">
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

                      <small className="pt-2">
                        {`Select any ${
                          church.church === 'town' ? 'Centres' : 'centres'
                        } that are being moved to this ${capitalise(
                          church.church
                        )}`}
                      </small>

                      <FieldArray name="centres">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps
                          const { values } = form
                          const { centres } = values

                          return (
                            <div>
                              {centres.map((centre, index) => (
                                <div key={index} className="form-row row-cols">
                                  <div className="col-9">
                                    <FormikControl
                                      control="combobox"
                                      name={`centres[${index}]`}
                                      initialValue={centre.name}
                                      placeholder="Enter Centre Name"
                                      setFieldValue={formik.setFieldValue}
                                      optionsQuery={CENTRE_DROPDOWN}
                                      queryVariable={`${church.subChurch}Name`}
                                      suggestionText="name"
                                      suggestionID="id"
                                      dataset={`${church.subChurch}Dropdown`}
                                      aria-describedby={`${capitalise(
                                        church.subChurch
                                      )} Name`}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col d-flex">
                                    <PlusSign onClick={() => push()} />
                                    {index >= 0 && (
                                      <MinusSign
                                        onClick={() => remove(index)}
                                      />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        }}
                      </FieldArray>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
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
