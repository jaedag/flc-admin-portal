import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import {
  GET_BISHOPS,
  CENTRE_DROPDOWN,
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
  GET_TOWNS,
  GET_CAMPUSES,
} from '../queries/ListQueries'
import { BISH_DASHBOARD_COUNTS } from '../queries/CountQueries'
import {
  UPDATE_TOWN_MUTATION,
  UPDATE_CAMPUS_MUTATION,
} from '../queries/UpdateMutations'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { ChurchContext } from '../contexts/ChurchContext'
import { DISPLAY_CAMPUS, DISPLAY_TOWN } from '../queries/DisplayQueries'
import PlusSign from '../components/PlusSign'
import MinusSign from '../components/MinusSign'
import {
  LOG_CAMPUS_HISTORY,
  LOG_CENTRE_HISTORY,
  LOG_TOWN_HISTORY,
} from '../queries/LogMutations'

export const UpdateTownCampus = () => {
  const {
    church,
    capitalise,
    parsePhoneNum,
    makeSelectOptions,
    phoneRegExp,
    campusId,
    townId,
    bishopId,
    setBishopId,
  } = useContext(ChurchContext)

  const {
    data: campusData,
    error: campusError,
    loading: campusLoading,
  } = useQuery(DISPLAY_CAMPUS, {
    variables: { id: campusId },
  })

  const { data: townData, error: townError, loading: townLoading } = useQuery(
    DISPLAY_TOWN,
    {
      variables: { id: townId },
    }
  )

  const history = useHistory()

  const initialValues = {
    campusTownName:
      church.church === 'campus'
        ? campusData?.displayCampus?.name
        : townData?.displayTown?.name,
    leaderName:
      church.church === 'campus'
        ? `${campusData?.displayCampus?.leader.firstName} ${campusData?.displayCampus?.leader.lastName} `
        : `${townData?.displayTown?.leader.firstName} ${townData?.displayTown?.leader.lastName} `,
    leaderWhatsapp:
      church.church === 'campus'
        ? `+${campusData?.displayCampus?.leader.whatsappNumber}`
        : `+${townData?.displayTown?.leader.whatsappNumber}`,
    bishopSelect:
      church.church === 'campus'
        ? campusData?.displayCampus?.bishop.id
        : townData?.displayTown?.bishop.id,
    centres:
      church.church === 'campus'
        ? campusData?.displayCampus?.centres
        : townData?.displayTown?.centres
        ? townData?.displayTown?.centres
        : [],
  }

  const validationSchema = Yup.object({
    campusTownName: Yup.string().required(
      `${capitalise(church.church)} Name is a required field`
    ),
    leaderWhatsapp: Yup.string().matches(
      phoneRegExp,
      `Phone Number must start with + and country code (eg. '+233')`
    ),
  })

  const [LogTownHistory] = useMutation(LOG_TOWN_HISTORY, {
    refetchQueries: [{ query: DISPLAY_TOWN, variables: { id: townId } }],
  })
  const [LogCampusHistory] = useMutation(LOG_CAMPUS_HISTORY, {
    refetchQueries: [{ query: DISPLAY_CAMPUS, variables: { id: campusId } }],
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

        //Log if the Leader Changes
        if (
          parsePhoneNum(newLeaderInfo.whatsappNumber) !==
          parsePhoneNum(initialValues.leaderWhatsapp)
        ) {
          LogTownHistory({
            variables: {
              townId: townId,
              leaderId: newLeaderInfo.id,
              oldLeaderId: townData?.displayTown.leader.id,
              oldBishopId: '',
              newBishopId: '',
              historyRecord: `${newLeaderInfo.firstName} ${newLeaderInfo.lastName} was transferred to become the new Town CO for ${initialValues.campusTownName} replacing ${townData?.displayTown?.leader.firstName} ${townData?.displayTown?.leader.lastName}`,
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
          variables: { id: townData?.displayTown?.bishop.id },
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

        //Log if the Leader Changes
        if (
          parsePhoneNum(newLeaderInfo.whatsappNumber) !==
          parsePhoneNum(initialValues.leaderWhatsapp)
        ) {
          LogCampusHistory({
            variables: {
              campusId: campusId,
              leaderId: newLeaderInfo.id,
              oldLeaderId: campusData?.displayCampus.leader.id,
              oldBishopId: '',
              newBishopId: '',
              historyRecord: `${newLeaderInfo.firstName} ${newLeaderInfo.lastName} was transferred to become the new Campu CO for ${initialValues.campusTownName}, replacing ${campusData?.displayCampus?.leader.firstName} ${campusData?.displayCampus?.leader.lastName}`,
            },
          })
        }
      },
    },
    {
      refetchQueries: [
        { query: DISPLAY_CAMPUS, variables: { id: campusId } },
        { query: GET_CAMPUS_CENTRES, variables: { id: campusId } },
        {
          query: GET_CAMPUS_CENTRES,
          variables: { id: campusData?.displayCampus?.id },
        },
        { query: GET_CAMPUSES, variables: { id: bishopId } },
        {
          query: GET_CAMPUSES,
          variables: { id: campusData?.displayCampus?.bishop.id },
        },
        { query: BISH_DASHBOARD_COUNTS, variables: { id: bishopId } },
      ],
    }
  )

  const {
    data: bishopData,
    loading: bishopLoading,
    error: bishopError,
  } = useQuery(GET_BISHOPS)

  if (bishopError || townError || campusError) {
    return <ErrorScreen />
  } else if (bishopLoading || townLoading || campusLoading) {
    return <LoadingScreen />
  } else {
    const bishopCampusOptions = makeSelectOptions(bishopData.bishopsListCampus)

    //Refactoring the Options into Something that can be read by my formik component
    const bishopTownOptions = makeSelectOptions(bishopData.bishopsListTown)

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setBishopId(values.bishopSelect)

      if (church.church === 'town') {
        UpdateTown({
          variables: {
            townId: townId,
            townName: values.campusTownName,
            lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
            bishopId: values.bishopSelect,
          },
        })

        //Log if Campus Name Changes
        if (values.campusTownName !== initialValues.campusTownName) {
          LogTownHistory({
            variables: {
              townId: townId,
              leaderId: '',
              oldLeaderId: '',
              oldBishopId: '',
              newBishopId: '',
              historyRecord: `The Town name has been changed from ${initialValues.campusTownName} to ${values.campusTownName}`,
            },
          })
        }

      //Log If The Bishop Changes
      if (values.bishopSelect !== initialValues.bishopSelect) {
        if (church.church === 'town') {
          RemoveTownBishop({
            variables: {
              townId: initialValues.bishopSelect,
              centreId: centreId,
            },
          })
          AddTownBishop({
            variables: {
              townId: values.bishopSelect,
              centreId: centreId,
            },
          })
        } else if (church.church === 'campus') {
          RemoveCampusBishop({
            variables: {
              campusId: initialValues.bishopSelect,
              centreId: centreId,
            },
          })
          AddCampusBishop({
            variables: {
              campusId: values.bishopSelect,
              centreId: centreId,
            },
          })
        }
      }

      } else if (church.church === 'campus') {
        // console.log("Form data",values);
        UpdateCampus({
          variables: {
            campusId: campusId,
            campusName: values.campusTownName,
            lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
            bishopId: values.bishopSelect,
          },
        })

        //Log if Town Name Changes
        if (values.campusTownName !== initialValues.campusTownName) {
          LogCampusHistory({
            variables: {
              campusId: campusId,
              leaderId: '',
              oldLeaderId: '',
              oldBishopId: '',
              newBishopId: '',
              historyRecord: `The Campus name has been changed from ${initialValues.campusTownName} to ${values.campusTownName}`,
            },
          })
        }
      }

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()

      history.push(`/${church.church}/displaydetails`)
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
              <div className="container infobar">{`Start a New ${capitalise(
                church.church
              )}`}</div>
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
                            className="form-control"
                            control="input"
                            name="leaderName"
                            placeholder={`Name of ${capitalise(
                              church.church
                            )} CO`}
                          />
                        </div>
                      </div>
                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="leaderWhatsapp"
                            placeholder="Enter Leader WhatsApp No"
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
                          if (!centres) {
                            return null
                          }

                          return (
                            <div>
                              {centres.map((centre, index) => (
                                <div key={index} className="form-row row-cols">
                                  <div className="col-9">
                                    <FormikControl
                                      control="combobox"
                                      name={`centres[${index}]`}
                                      placeholder={
                                        centre
                                          ? centre.name
                                          : 'Enter Centre Name'
                                      }
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
                                    <button
                                      className="plus-button rounded mr-2"
                                      type="button"
                                      onClick={() => push()}
                                    >
                                      <PlusSign />
                                    </button>
                                    {index > 0 && (
                                      <button
                                        className="plus-button rounded"
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <MinusSign />
                                      </button>
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
      </div>
    )
  }
}
