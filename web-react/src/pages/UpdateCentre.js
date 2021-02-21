import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import { CENTRE_DROPDOWN } from '../queries/ListQueries'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { ChurchContext } from '../contexts/ChurchContext'
import { DISPLAY_CENTRE } from '../queries/DisplayQueries'

export const UpdateCentre = () => {
  const { church, capitalise, phoneRegExp, centreID, setBishopID } = useContext(
    ChurchContext
  )

  const {
    data: centreData,
    error: centreError,
    loading: centreLoading,
  } = useQuery(DISPLAY_CENTRE, {
    variables: { id: centreID },
  })

  const history = useHistory()

  const initialValues = {
    centre: centreData?.displayCentre?.name,
    leaderName: `${centreData?.displayCentre?.leader.firstName} ${centreData?.displayCentre?.leader.lastName} `,
    leaderWhatsapp: `+${centreData?.displayCentre?.leader.whatsappNumber}`,
    centreSelect: centreData?.displayCentre?.centre.id,
    bacentas: centreData?.displayCentre?.bacentas,
  }

  const validationSchema = Yup.object({
    campusTownName: Yup.string().required(
      `${capitalise(church.subChurch)} Name is a required field`
    ),
    leaderWhatsapp: Yup.string().matches(
      phoneRegExp,
      `Phone Number must start with + and country code (eg. '+233')`
    ),
  })

  // const [UpdateTown] = useMutation(UPDATE_TOWN_MUTATION, {
  //   refetchQueries: [{ query: DISPLAY_TOWN, variables: { id: townID } },{ query: GET_TOWN_CENTRES, variables: { id: townID } },{ query: GET_TOWNS, variables: { id: bishopID } },{ query: GET_TOWNS, variables: { id: townData?.displayTown?.bishop.id } }],
  // })

  // const [UpdateCampus] = useMutation(UPDATE_CAMPUS_MUTATION, {
  //   refetchQueries: [{ query: DISPLAY_CAMPUS, variables: { id: campusID } },{ query: GET_CAMPUS_CENTRES, variables: { id: campusID } },{ query: GET_CAMPUSES, variables: { id: bishopID } },{ query: GET_CAMPUSES, variables: { id: campusData?.displayCentre?.bishop.id } }],
  // })

  // const {
  //   data: centreData,
  //   loading: centreLoading,
  //   error: centreError,
  // } = useQuery(GET_BISHOPS)

  if (centreError) {
    return <ErrorScreen />
  } else if (centreLoading) {
    return <LoadingScreen />
  } else {
    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setBishopID(values.centreSelect)

      // if (church.subChurch === 'town') {
      //   UpdateTown({
      //     variables: {
      //     townID: townID,
      //     townName: values.campusTownName,
      //     lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
      //     bishopID: values.centreSelect,
      //     bacentas: values.bacentas.map((centre)=>{return centre.id})}
      //   })
      // }

      //  else if (church.subChurch === 'campus') {
      //   // console.log("Form data",values);
      //   UpdateCampus({
      //     variables: {
      //       campusID: campusID,
      //       campusName: values.campusTownName,
      //       lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
      //       bishopID: values.centreSelect,
      //       bacentas: values.bacentas.map((centre)=>{return centre.id}),
      //     },
      //   })
      // }

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
              <div className="container infobar">{`Start a New ${capitalise(
                church.subChurch
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
                            name="centreSelect"
                            options={'yes'}
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
                              {bacentas.map((centre, index) => (
                                <div key={index} className="form-row row-cols">
                                  <div className="col-9">
                                    <FormikControl
                                      control="combobox"
                                      name={`bacentas[${index}]`}
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
