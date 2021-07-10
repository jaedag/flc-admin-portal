import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from '../../global-utils'
import FormikControl from '../../components/formik-components/FormikControl'

import {
  GET_BISHOPS,
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
  GET_BISHOP_TOWNS,
  GET_BISHOP_CAMPUSES,
  BISHOP_MEMBER_DROPDOWN,
} from '../../queries/ListQueries'
import { BISH_DASHBOARD_COUNTS } from '../dashboards/DashboardQueries'
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
} from './UpdateMutations'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { ChurchContext } from '../../contexts/ChurchContext'
import { DISPLAY_CAMPUS, DISPLAY_TOWN } from '../display/ReadQueries'
import PlusSign from '../../components/buttons/PlusSign'
import MinusSign from '../../components/buttons/MinusSign'
import { LOG_CAMPUSTOWN_HISTORY, LOG_CENTRE_HISTORY } from './LogMutations'
import { BISHOP_CENTRE_DROPDOWN } from '../../components/formik-components/ComboboxQueries'
import { MAKE_CAMPUS_LEADER, MAKE_TOWN_LEADER } from './ChangeLeaderMutations'

const UpdateTownCampus = () => {
  const { church, campusId, townId, bishopId, setBishopId } = useContext(
    ChurchContext
  )
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
    church.church === 'campus' ? campusData?.campuses[0] : townData?.towns[0]

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
    centres: Yup.array().of(
      Yup.object().required('Please pick a centre from the dropdown')
    ),
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

  const [MakeTownLeader] = useMutation(MAKE_TOWN_LEADER)
  const [UpdateTown] = useMutation(UPDATE_TOWN_MUTATION, {
    refetchQueries: [
      { query: DISPLAY_TOWN, variables: { id: townId } },
      { query: GET_TOWN_CENTRES, variables: { id: townId } },
      { query: GET_BISHOP_TOWNS, variables: { id: bishopId } },
      {
        query: GET_BISHOP_TOWNS,
        variables: { id: initialValues.bishopSelect },
      },
      { query: BISH_DASHBOARD_COUNTS, variables: { id: bishopId } },
    ],
  })

  const [MakeCampusLeader] = useMutation(MAKE_CAMPUS_LEADER)
  const [UpdateCampus] = useMutation(UPDATE_CAMPUS_MUTATION, {
    refetchQueries: [
      { query: DISPLAY_CAMPUS, variables: { id: campusId } },
      { query: GET_CAMPUS_CENTRES, variables: { id: campusId } },
      { query: GET_BISHOP_CAMPUSES, variables: { id: bishopId } },
      {
        query: GET_BISHOP_CAMPUSES,
        variables: { id: initialValues.bishopSelect },
      },
      { query: BISH_DASHBOARD_COUNTS, variables: { id: bishopId } },
    ],
  })

  //Changes downwards. ie. Centre Changes underneath CampusTown
  const [AddCampusCentres] = useMutation(ADD_CAMPUS_CENTRES)
  const [AddTownCentres] = useMutation(ADD_TOWN_CENTRES)
  const [RemoveCentreCampus] = useMutation(REMOVE_CENTRE_CAMPUS, {
    onCompleted: (data) => {
      if (church.church === 'town') {
        return
      }
      const prevCampus = data.updateCampuses.campuses[0]
      const centre = data.updateCentres.centres[0]
      let newCampusId = ''
      let oldCampusId = ''
      let historyRecord

      if (prevCampus?.id === campusId) {
        //Centre has previous campus which is current campus and is going
        oldCampusId = campusId
        newCampusId = ''
        historyRecord = `${centre.name} Centre has been closed down under ${initialValues.campusTownName} Campus`
      } else if (prevCampus.id !== campusId) {
        //Centre has previous campus which is not current campus and is joining
        oldCampusId = prevCampus.id
        newCampusId = campusId
        historyRecord = `${centre.name} Centre has been moved to ${initialValues.campusTownName} Campus from ${prevCampus.name} Campus`
      }

      //After removing the centre from a campus, then you log that change.
      LogCentreHistory({
        variables: {
          centreId: centre.id,
          newLeaderId: '',
          oldLeaderId: '',
          newCampusTownId: newCampusId,
          oldCampusTownId: oldCampusId,
          historyRecord: historyRecord,
        },
      })
    },
  })
  const [RemoveCentreTown] = useMutation(REMOVE_CENTRE_TOWN, {
    onCompleted: (data) => {
      if (church.church === 'campus') {
        return
      }
      const prevTown = data.updateTowns.towns[0]
      const centre = data.updateCentres.centres[0]
      let newTownId = ''
      let oldTownId = ''
      let historyRecord

      if (prevTown.id === townId) {
        //Centre has previous town which is current town and is going
        oldTownId = townId
        newTownId = ''
        historyRecord = `${centre.name} Centre has been closed down under ${initialValues.campusTownName} Town`
      } else if (prevTown.id !== townId) {
        //Centre has previous town which is not current town and is joining
        oldTownId = prevTown.id
        newTownId = townId
        historyRecord = `${centre.name} Centre has been moved to ${initialValues.campusTownName} Town from ${prevTown.name} Town`
      }

      //After removing the centre from a town, then you log that change.
      LogCentreHistory({
        variables: {
          centreId: centre.id,
          newLeaderId: '',
          oldLeaderId: '',
          newCampusTownId: newTownId,
          oldCampusTownId: oldTownId,
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
      if (!campusTownData?.bishop.firstName) {
        //If There is no old Bishop
        let recordIfNoOldBishop = `${initialValues.campusTownName} Campus has been moved to Bishop ${data.AddCampusBishop.from.firstName} ${data.AddCampusBishop.from.firstName}`

        LogCampusTownHistory({
          variables: {
            campusTownId: campusId,
            newLeaderId: '',
            oldLeaderId: '',
            newBishopId: data.updateCampuses.campuses[0].bishop.id,
            oldBishopId: campusTownData?.bishop.id,
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

        let recordIfOldBishop = `${initialValues.campusTownName} Campus has been moved from Bishop ${campusTownData?.bishop.firstName} ${campusTownData?.bishop.lastName} 
        to Bishop ${data.updateCampuses.campuses[0].bishop.firstName} ${data.updateCampuses.campuses[0].bishop.lastName} `

        //After Adding the campus to a bishop, then you log that change.
        LogCampusTownHistory({
          variables: {
            campusTownId: campusId,
            newLeaderId: '',
            oldLeaderId: '',
            newBishopId: data.updateCampuses.campuses[0].bishop.id,
            oldBishopId: campusTownData?.bishop.id,
            historyRecord: recordIfOldBishop,
          },
        })
      }
    },
  })
  const [AddTownBishop] = useMutation(ADD_TOWN_BISHOP, {
    onCompleted: (data) => {
      const oldBishop = campusTownData?.bishop
      const newBishop = data.updateTowns.towns[0].bishop

      if (!campusTownData?.bishop.firstName) {
        //If There is no old Bishop
        let recordIfNoOldBishop = `${initialValues.campusTownName} Town has been moved to Bishop ${data.AddTownBishop.from.firstName} ${data.AddTownBishop.from.firstName}`

        LogCampusTownHistory({
          variables: {
            campusTownId: townId,
            newLeaderId: '',
            oldLeaderId: '',
            newBishopId: newBishop.id,
            oldBishopId: oldBishop.id,
            historyRecord: recordIfNoOldBishop,
          },
        })
      } else {
        //If there is an old Bishop

        //Break Link to the Old Bishop
        RemoveTownBishop({
          variables: {
            bishopId: oldBishop.id,
            townId: townId,
          },
        })

        let recordIfOldBishop = `${initialValues.campusTownName} Town has been moved from Bishop ${oldBishop.firstName} ${oldBishop.lastName} to Bishop ${newBishop.fullName} `

        //After Adding the campus to a bishop, then you log that change.
        LogCampusTownHistory({
          variables: {
            campusTownId: townId,
            newLeaderId: '',
            oldLeaderId: '',
            newBishopId: newBishop.id,
            oldBishopId: oldBishop.id,
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
    const bishopCampusOptions = makeSelectOptions(
      bishopsData.members.filter(
        (bishop) => bishop.campusBishop.length > 0 && bishop
      )
    )
    const bishopTownOptions = makeSelectOptions(
      bishopsData.members.filter(
        (bishop) => bishop.townBishop.length > 0 && bishop
      )
    )

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
              historyRecord: `Campus name has been changed from ${initialValues.campusTownName} to ${values.campusTownName}`,
            },
          })
        }

        //Log if the Leader Changes
        if (values.leaderSelect !== initialValues.leaderSelect) {
          MakeCampusLeader({
            variables: {
              leaderId: values.leaderSelect,
              campusId: campusId,
            },
          }).catch((err) => alert(err))
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
              historyRecord: `Town name has been changed from ${initialValues.campusTownName} to ${values.campusTownName}`,
            },
          })
        }

        //Log if the Leader Changes
        if (values.leaderSelect !== initialValues.leaderSelect) {
          MakeTownLeader({
            variables: {
              leaderId: values.leaderSelect,
              townId: townId,
            },
          }).catch((err) => alert(err))
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

      const removeCentres = oldCentreList.filter((value) => {
        return !newCentreList.includes(value)
      })

      const addCentres = values.centres.filter((value) => {
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
              historyRecord: `${
                centre.name
              } Centre has been started again under ${
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
                            label="Select a Bishop"
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
                            label={`Name of ${capitalise(church.church)}`}
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
                            placeholder="Start typing..."
                            label="Choose a CO"
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
                                      control="combobox2"
                                      name={`centres[${index}]`}
                                      initialValue={centre?.name}
                                      placeholder="Enter Centre Name"
                                      setFieldValue={formik.setFieldValue}
                                      optionsQuery={BISHOP_CENTRE_DROPDOWN}
                                      queryVariable1="id"
                                      variable1={bishopId}
                                      queryVariable2="nameSearch"
                                      suggestionText="name"
                                      suggestionID="id"
                                      church="constituency"
                                      aria-describedby={`${capitalise(
                                        church.subChurch
                                      )} Name`}
                                      returnObject={true}
                                      className="form-control"
                                      error={
                                        formik.errors.centres &&
                                        formik.errors.centres[index]
                                      }
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

export default UpdateTownCampus
