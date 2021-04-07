import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import { BACENTA_DROPDOWN, GET_TOWN_CENTRES } from '../queries/ListQueries'
import {
  ADD_CENTRE_BACENTAS,
  REMOVE_BACENTA_CENTRE,
  ADD_CENTRE_TOWN,
  ADD_CENTRE_CAMPUS,
  REMOVE_CENTRE_TOWN,
  REMOVE_CENTRE_CAMPUS,
  UPDATE_CENTRE_MUTATION,
} from '../queries/UpdateMutations'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { ChurchContext } from '../contexts/ChurchContext'
import { DISPLAY_CENTRE } from '../queries/DisplayQueries'
import {
  LOG_CENTRE_HISTORY,
  LOG_BACENTA_HISTORY,
} from '../queries/LogMutations'
import PlusSign from '../components/PlusSign'
import MinusSign from '../components/MinusSign'

export const UpdateCentre = () => {
  const {
    church,
    parsePhoneNum,
    capitalise,
    phoneRegExp,
    townId,
    centreId,
    setBishopId,
  } = useContext(ChurchContext)

  const { data: centreData, loading: centreLoading } = useQuery(
    DISPLAY_CENTRE,
    {
      variables: { id: centreId },
    }
  )

  const history = useHistory()

  const initialValues = {
    centreName: centreData?.displayCentre?.name,
    leaderName: `${centreData?.displayCentre?.leader.firstName} ${centreData?.displayCentre?.leader.lastName} `,
    leaderWhatsapp: `+${centreData?.displayCentre?.leader.whatsappNumber}`,
    townCampusSelect:
      church.church === 'town'
        ? centreData?.displayCentre?.town?.id
        : centreData?.displayCentre?.campus?.id,
    bacentas: centreData?.displayCentre?.bacentas,
  }

  const validationSchema = Yup.object({
    centreName: Yup.string().required(
      `${capitalise(church.subChurch)} Name is a required field`
    ),
    leaderWhatsapp: Yup.string().matches(
      phoneRegExp,
      `Phone Number must start with + and country code (eg. '+233')`
    ),
  })

  const [LogCentreHistory] = useMutation(LOG_CENTRE_HISTORY, {
    refetchQueries: [{ query: DISPLAY_CENTRE, variables: { id: centreId } }],
  })

  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY, {
    refetchQueries: [{ query: DISPLAY_CENTRE, variables: { id: centreId } }],
  })

  const [UpdateCentre] = useMutation(UPDATE_CENTRE_MUTATION, {
    onCompleted: (updatedInfo) => {
      let newLeaderInfo = updatedInfo.UpdateCentre?.leader
      //Log if the Leader Changes

      if (
        parsePhoneNum(newLeaderInfo.whatsappNumber) !==
        parsePhoneNum(initialValues.leaderWhatsapp)
      ) {
        LogCentreHistory({
          variables: {
            centreId: centreId,
            leaderId: newLeaderInfo.id,
            oldLeaderId: centreData?.displayCentre?.leader.id,
            oldCampusTownId: '',
            newCampusTownId: '',
            historyRecord: `${newLeaderInfo.firstName} ${newLeaderInfo.lastName} was transferred to become the new Centre Leader for ${initialValues.centreName}, replacing ${centreData?.displayCentre?.leader.firstName} ${centreData?.displayCentre?.leader.lastName}`,
          },
        })
      }
    },
    refetchQueries: [
      { query: DISPLAY_CENTRE, variables: { id: centreId } },
      { query: GET_TOWN_CENTRES, variables: { id: townId } },
      {
        query: GET_TOWN_CENTRES,
        variables: { id: initialValues.townCampusSelect },
      },
    ],
  })

  const [AddCentreBacentas] = useMutation(ADD_CENTRE_BACENTAS, {
    onCompleted: (data) => {
      //After removing the bacenta from a centre, then you log that change.
      LogBacentaHistory({
        variables: {
          bacentaId: data.AddCentreBacentas.to.id,
          leaderId: '',
          oldLeaderId: '',
          newCentreId: centreId,
          oldCentreId: '',
          historyRecord: `${data.AddCentreBacentas.to.name} Bacenta has been moved to ${data.AddCentreBacentas.from.name} Centre`,
        },
      })
    },
  })
  const [RemoveBacentaCentre] = useMutation(REMOVE_BACENTA_CENTRE, {
    onCompleted: (data) => {
      console.log(data)
      //After removing the bacenta from a centre, then you log that change.
      LogBacentaHistory({
        variables: {
          bacentaId: data.RemoveBacentaCentre.to.id,
          leaderId: '',
          oldLeaderId: '',
          newCentreId: '',
          oldCentreId: centreId,
          historyRecord: `${data.RemoveBacentaCentre.to.name} Bacenta has been moved from ${initialValues.centreName} Centre`,
        },
      })
    },
  })
  const [RemoveCentreTown] = useMutation(REMOVE_CENTRE_TOWN)
  const [RemoveCentreCampus] = useMutation(REMOVE_CENTRE_CAMPUS)
  const [AddCentreTown] = useMutation(ADD_CENTRE_TOWN, {
    onCompleted: (newTown) => {
      //After Adding the centre to a campus/town, then you log that change.
      LogCentreHistory({
        variables: {
          centreId: centreId,
          leaderId: '',
          oldLeaderId: '',
          newCampusTownId: newTown.AddCentreTown.from.id,
          oldCampusTownId: centreData?.displayCentre?.town.id,
          historyRecord: `${
            initialValues.centreName
          } Centre has been moved from ${
            centreData?.displayCentre?.town.name
          } ${capitalise(church.church)} to ${
            newTown.AddCentreTown.from.name
          } ${capitalise(church.church)}`,
        },
      })
    },
  })
  const [AddCentreCampus] = useMutation(ADD_CENTRE_CAMPUS, {
    onCompleted: (newCampus) => {
      //After Adding the centre to a campus/Campus, then you log that change.
      LogCentreHistory({
        variables: {
          centreId: centreId,
          leaderId: '',
          oldLeaderId: '',
          oldCampusTownId: centreData?.displayCentre?.Campus.id,
          newCampusTownId: newCampus.AddCentreCampus.from.id,
          historyRecord: `${initialValues.centreName} has been moved from ${
            centreData?.displayCentre?.Campus.name
          } ${capitalise(church.church)} to ${
            newCampus.AddCentreCampus.from.name
          } ${capitalise(church.church)}`,
        },
      })
    },
  })

  if (centreLoading) {
    return <LoadingScreen />
  } else if (centreData) {
    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setBishopId(values.centreSelect)

      UpdateCentre({
        variables: {
          centreId: centreId,
          centreName: values.centreName,
          lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
          campusTownID: values.townCampusSelect,
        },
      })

      //For the Logging of Stuff
      //Log If The TownCampus Changes
      if (values.townCampusSelect !== initialValues.townCampusSelect) {
        if (church.church === 'town') {
          RemoveCentreTown({
            variables: {
              townId: initialValues.townCampusSelect,
              centreId: centreId,
            },
          })
          AddCentreTown({
            variables: {
              townId: values.townCampusSelect,
              centreId: centreId,
            },
          })
        } else if (church.church === 'campus') {
          RemoveCentreCampus({
            variables: {
              campusId: initialValues.townCampusSelect,
              centreId: centreId,
            },
          })
          AddCentreCampus({
            variables: {
              campusId: values.townCampusSelect,
              centreId: centreId,
            },
          })
        }
      }

      //Log if Centre Name Changes
      if (values.centreName !== initialValues.centreName) {
        LogCentreHistory({
          variables: {
            centreId: centreId,
            leaderId: '',
            oldLeaderId: '',
            oldCampusTownId: '',
            newCampusTownId: '',
            historyRecord: `The Centre name has been changed from ${initialValues.centreName} to ${values.centreName}`,
          },
        })
      }

      //For the adding and removing of bacentas
      const oldBacentaList = initialValues.bacentas.map((bacenta) => {
        return bacenta.id
      })

      const newBacentaList = values.bacentas.map((bacenta) => {
        return bacenta.id ? bacenta.id : bacenta
      })
      const removeBacentas = oldBacentaList.filter(function (value) {
        return !newBacentaList.includes(value)
      })

      const addBacentas = newBacentaList.filter(function (value) {
        return !oldBacentaList.includes(value)
      })

      removeBacentas.forEach((bacenta) => {
        RemoveBacentaCentre({
          variables: {
            centreId: centreId,
            bacentaId: bacenta,
          },
        })
      })
      addBacentas.forEach((bacenta) => {
        RemoveBacentaCentre({
          variables: {
            centreId: centreId,
            bacentaId: bacenta,
          },
        })
        AddCentreBacentas({
          variables: {
            centreId: centreId,
            bacentaId: bacenta,
          },
        })
      })

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      history.push(`/${church.subChurch}/displaydetails`)
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
              <div className="container infobar">{`${capitalise(
                church.subChurch
              )} Update Form`}</div>
              <Form>
                <div className="form-group">
                  <div className="row row-cols-1 row-cols-md-2">
                    {/* <!-- Basic Info Div --> */}
                    <div className="col mb-2">
                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="centreName"
                            placeholder={`Name of ${capitalise(
                              church.subChurch
                            )}`}
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
                              church.subChurch
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
                          church.subChurch === 'town' ? 'Centres' : 'bacentas'
                        } that are being moved to this ${capitalise(
                          church.subChurch
                        )}`}
                      </small>

                      <FieldArray name="bacentas">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps
                          const { values } = form
                          const { bacentas } = values
                          if (!bacentas) {
                            return null
                          }

                          return (
                            <div>
                              {bacentas.map((bacenta, index) => (
                                <div key={index} className="form-row row-cols">
                                  <div className="col-9">
                                    <FormikControl
                                      control="combobox"
                                      name={`bacentas[${index}]`}
                                      placeholder={
                                        bacenta
                                          ? bacenta.name
                                          : 'Enter Bacenta Name'
                                      }
                                      setFieldValue={formik.setFieldValue}
                                      optionsQuery={BACENTA_DROPDOWN}
                                      queryVariable="bacentaName"
                                      suggestionText="name"
                                      suggestionID="id"
                                      dataset="bacentaDropdown"
                                      aria-describedby="Bacenta Name"
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
                                    {index >= 0 && (
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
  } else {
    return <ErrorScreen />
  }
}
