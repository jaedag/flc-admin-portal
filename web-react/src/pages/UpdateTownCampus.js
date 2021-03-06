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

export const UpdateTownCampus = () => {
  const {
    church,
    capitalise,
    parsePhoneNum,
    makeSelectOptions,
    phoneRegExp,
    campusID,
    townID,
    bishopID,
    setBishopID,
  } = useContext(ChurchContext)
  const {
    data: campusData,
    error: campusError,
    loading: campusLoading,
  } = useQuery(DISPLAY_CAMPUS, {
    variables: { id: campusID },
  })
  const { data: townData, error: townError, loading: townLoading } = useQuery(
    DISPLAY_TOWN,
    {
      variables: { id: townID },
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

  const [UpdateTown] = useMutation(UPDATE_TOWN_MUTATION, {
    refetchQueries: [
      { query: DISPLAY_TOWN, variables: { id: townID } },
      { query: GET_TOWN_CENTRES, variables: { id: townID } },
      { query: GET_TOWNS, variables: { id: bishopID } },
      { query: GET_TOWNS, variables: { id: townData?.displayTown?.bishop.id } },
      { query: BISH_DASHBOARD_COUNTS, variables: { id: bishopID } },
    ],
  })

  const [UpdateCampus] = useMutation(UPDATE_CAMPUS_MUTATION, {
    refetchQueries: [
      { query: DISPLAY_CAMPUS, variables: { id: campusID } },
      { query: GET_CAMPUS_CENTRES, variables: { id: campusID } },
      {
        query: GET_CAMPUS_CENTRES,
        variables: { id: campusData?.displayCampus?.id },
      },
      { query: GET_CAMPUSES, variables: { id: bishopID } },
      {
        query: GET_CAMPUSES,
        variables: { id: campusData?.displayCampus?.bishop.id },
      },
      { query: BISH_DASHBOARD_COUNTS, variables: { id: bishopID } },
    ],
  })

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
      setBishopID(values.bishopSelect)

      if (church.church === 'town') {
        UpdateTown({
          variables: {
            townID: townID,
            townName: values.campusTownName,
            lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
            bishopID: values.bishopSelect,
            centres: values.centres.map((centre) => {
              return centre.id
            }),
          },
        })
      } else if (church.church === 'campus') {
        // console.log("Form data",values);
        UpdateCampus({
          variables: {
            campusID: campusID,
            campusName: values.campusTownName,
            lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
            bishopID: values.bishopSelect,
            centres: values.centres.map((centre) => {
              return centre.id
            }),
          },
        })
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
                            )} GSO`}
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
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="plus"
                                        className="svg-inline--fa fa-plus fa-w-14"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                        />
                                      </svg>
                                    </button>
                                    {index > 0 && (
                                      <button
                                        className="plus-button rounded"
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        {' '}
                                        <svg
                                          aria-hidden="true"
                                          focusable="false"
                                          data-prefix="fas"
                                          data-icon="minus"
                                          className="svg-inline--fa fa-minus fa-w-14"
                                          role="img"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 448 512"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                          />
                                        </svg>
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
