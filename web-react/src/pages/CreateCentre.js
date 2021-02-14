import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import {
  GET_CAMPUSES,
  GET_TOWNS,
  BISHOP_BACENTA_DROPDOWN,
} from '../queries/ListQueries'
import { CREATE_CENTRE_MUTATION } from '../queries/CreateMutations'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { ChurchContext } from '../contexts/ChurchContext'

function CreateCentre() {
  const initialValues = {
    centreName: '',
    leaderName: '',
    leaderWhatsapp: '',
    townSelect: '',
    campusSelect: '',
    bacentas: [''],
  }

  const validationSchema = Yup.object({
    centreName: Yup.string().required('Centre Name is a required field'),
  })

  const { church, capitalise, id, setTownID, setCentreID } = useContext(
    ChurchContext
  )

  const [CreateCentre] = useMutation(CREATE_CENTRE_MUTATION, {
    onCompleted: (newCentreData) => {
      setCentreID(newCentreData.CreateCentre.id)
    },
  })

  const history = useHistory()

  const { data: townListData, loading: townListLoading } = useQuery(GET_TOWNS, {
    variables: { id: id },
  })
  const { data: campusListData, loading: campusListLoading } = useQuery(
    GET_CAMPUSES,
    {
      variables: { id: id },
    }
  )

  if (townListData && campusListData) {
    const townOptions = townListData.townList.map((town) => ({
      value: town.id,
      key: town.name,
    }))

    const campusOptions = campusListData.campusList.map((campus) => ({
      value: campus.id,
      key: campus.name,
    }))

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setTownID(values.townSelect)
      CreateCentre({
        variables: {
          centreName: values.centreName,
          centreLeaderName: values.leaderName,
          lWhatsappNumber: values.leaderWhatsapp,
          townID: values.townSelect,
          campusID: values.campusSelect,
        },
      })

      // console.log('Form data', values)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
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
                        <div className="col-10">
                          <FormikControl
                            className="form-control"
                            control="select"
                            name="townSelect"
                            options={
                              church.church === 'town'
                                ? townOptions
                                : campusOptions
                            }
                            defaultOption={`Select a ${capitalise(
                              church.church
                            )}`}
                          />
                        </div>
                      </div>

                      <div className="form-row row-cols-3">
                        <div className="col-10">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="centreName"
                            placeholder="Name of Centre"
                          />
                        </div>
                      </div>
                      <div className="row d-flex align-items-center">
                        <div className="col">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="leaderName"
                            placeholder="Name of Centre Leader"
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
                        List any Bacentas that are being moved to this Centre
                      </small>
                      <FieldArray name="bacentas">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps
                          const { values } = form
                          const { bacentas } = values

                          return (
                            <div>
                              {bacentas.map((bacentas, index) => (
                                <div key={index} className="form-row row-cols">
                                  <div className="col-9">
                                    <FormikControl
                                      control="combobox"
                                      name={`bacentas[${index}]`}
                                      placeholder="Bacenta Name"
                                      setFieldValue={formik.setFieldValue}
                                      optionsQuery={BISHOP_BACENTA_DROPDOWN}
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
  } else if (townListLoading || campusListLoading) {
    return <LoadingScreen />
  } else {
    return <ErrorScreen />
  }
}

export default CreateCentre
