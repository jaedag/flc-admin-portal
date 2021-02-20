import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import { GET_BISHOPS, CENTRE_DROPDOWN } from '../queries/ListQueries'
import {
  EDIT_TOWN_MUTATION,
  EDIT_CAMPUS_MUTATION,
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
    phoneRegExp,
    campusID,
    townID,
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

  const campusTownData =
    church.church === 'campus' ? campusData.displayCampus : townData.displayTown

  console.log(campusTownData)

  const history = useHistory()

  const initialValues = {
    campusTownName: campusData?.displayCampus?.name,
    leaderName: `${campusData?.displayCampus?.leader.firstName} ${campusData?.displayCampus?.leader.lastName} `,
    leaderWhatsapp: `+${campusData?.displayCampus?.leader.whatsappNumber}`,
    bishopSelect: campusData?.displayCampus?.bishop.id,
    centres: campusData?.displayCampus?.centres,
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

  const [UpdateTown] = useMutation(EDIT_TOWN_MUTATION, {
    refetchQueries: [{ query: DISPLAY_TOWN, variables: { id: townID } }],
  })

  const [EditCampus] = useMutation(EDIT_CAMPUS_MUTATION, {
    refetchQueries: [{ query: DISPLAY_CAMPUS, variables: { id: campusID } }],
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
    const bishopCampusOptions = bishopData.bishopsListCampus.map((bishop) => ({
      value: bishop.id,
      key: bishop.firstName + ' ' + bishop.lastName,
    }))

    //Refactoring the Options into Something that can be read by my formik component
    const bishopTownOptions = bishopData.bishopsListTown.map((bishop) => ({
      value: bishop.id,
      key: bishop.firstName + ' ' + bishop.lastName,
    }))

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setBishopID(values.bishopSelect)
      values.leaderWhatsapp = parsePhoneNum(values.leaderWhatsapp)

      if (church.church === 'town') {
        UpdateTown({
          variables: {
            townID: townID,
            townName: values.campusTownName,
            lWhatsappNumber: values.leaderWhatsapp,
            bishopID: values.bishopSelect,
            centres: values.centres,
          },
        })
      } else if (church.church === 'campus') {
        // console.log("Form data",values);
        EditCampus({
          variables: {
            campusID: campusID,
            campusName: values.campusTownName,
            lWhatsappNumber: values.leaderWhatsapp,
            bishopID: values.bishopSelect,
            centres: values.centres,
          },
        })
      }
      history.push(`/${church.church}/displaydetails`)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
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

                          return (
                            <div>
                              {centres.map((centre, index) => (
                                <div key={index} className="form-row row-cols">
                                  <div className="col-9">
                                    <FormikControl
                                      control="combobox"
                                      name={`centres[${index}]`}
                                      placeholder={centre.name}
                                      setFieldValue={formik.setFieldValue}
                                      optionsQuery={CENTRE_DROPDOWN}
                                      queryVariable={`${church.subChurch}Name`}
                                      suggestionText="name"
                                      suggestionID={`${church.subChurch}ID`}
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
