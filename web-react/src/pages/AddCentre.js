import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import { GET_TOWNS } from '../queries/ListQueries'
import { CREATE_CENTRE_MUTATION } from '../queries/AdditionMutations'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { ChurchContext } from '../contexts/ChurchContext'

function AddCentre() {
  const initialValues = {
    centreName: '',
    centreLeaderName: '',
    townSelect: '',
    bacentas: [''],
  }

  const validationSchema = Yup.object({
    // townSelect: Yup.string().required('Choose a Town'),
    centreName: Yup.string().required('Centre Name is a required field'),
  })

  const { setTownID, setCentreID } = useContext(ChurchContext)

  const [AddCentre] = useMutation(CREATE_CENTRE_MUTATION, {
    onCompleted: (newCentreData) => {
      setCentreID(newCentreData.AddCentre.centreID)
    },
  })

  const history = useHistory()

  const { data: townListData, loading: townListLoading } = useQuery(GET_TOWNS, {
    variables: { aFirstName: 'Frank', aLastName: 'Opoku' },
  })

  if (townListData) {
    const townOptions = townListData.townList.map((town) => ({
      value: town.townID,
      key: town.name,
    }))
    // console.log('Data is here')

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setTownID(values.townSelect)
      AddCentre({
        variables: {
          centreName: values.centreName,
          centreLeaderName: values.commLeaderName,
          lWhatsappNumber: values.commLeaderWhatsapp,
          townID: values.townSelect,
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
                            options={townOptions}
                            // onChange={(e) => {
                            // 	setTownID(e.target.value)
                            // }}
                            defaultOption="Select a Town"
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
                            name="commLeaderName"
                            placeholder="Name of Centre Leader"
                          />
                        </div>
                      </div>
                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="commLeaderWhatsapp"
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
                                      className="form-control"
                                      placeholder="Bacenta Name"
                                      control="input"
                                      name={`bacentas[${index}]`}
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
  } else if (townListLoading) {
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  }
}

export default AddCentre
