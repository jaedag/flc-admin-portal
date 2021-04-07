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
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
} from '../queries/ListQueries'
import { CREATE_CENTRE_MUTATION } from '../queries/CreateMutations'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { ChurchContext } from '../contexts/ChurchContext'
import PlusSign from '../components/PlusSign'
import MinusSign from '../components/MinusSign'

function CreateCentre() {
  const initialValues = {
    centreName: '',
    leaderName: '',
    leaderWhatsapp: '',
    campusTownSelect: '',
    bacentas: [''],
  }

  const {
    church,
    capitalise,
    phoneRegExp,
    parsePhoneNum,
    makeSelectOptions,
    bishopId,
    setTownId,
    setCampusId,
    setCentreId,
  } = useContext(ChurchContext)
  const history = useHistory()

  const validationSchema = Yup.object({
    centreName: Yup.string().required('Centre Name is a required field'),
    leaderWhatsapp: Yup.string()
      .required('Phone Number is required')
      .matches(
        phoneRegExp,
        `Phone Number must start with + and country code (eg. '+233')`
      ),
  })

  const [CreateCentre] = useMutation(CREATE_CENTRE_MUTATION, {
    refetchQueries: [
      { query: GET_CAMPUS_CENTRES, variables: { id: bishopId } },
      { query: GET_TOWN_CENTRES, variables: { id: bishopId } },
    ],
    onCompleted: (newCentreData) => {
      setCentreId(newCentreData.CreateCentre.id)
      history.push('/centre/displaydetails')
    },
  })

  const { data: townListData, loading: townListLoading } = useQuery(GET_TOWNS, {
    variables: { id: bishopId },
  })
  const { data: campusListData, loading: campusListLoading } = useQuery(
    GET_CAMPUSES,
    {
      variables: { id: bishopId },
    }
  )

  if (townListData && campusListData) {
    const townOptions = makeSelectOptions(townListData.townList)
    const campusOptions = makeSelectOptions(campusListData.campusList)

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      if (church.church === 'town') {
        setTownId(values.campusTownSelect)
      } else if (church.church === 'campus') {
        setCampusId(values.campusTownSelect)
      }

      CreateCentre({
        variables: {
          centreName: values.centreName,
          lWhatsappNumber: parsePhoneNum(values.leaderWhatsapp),
          townCampusId: values.campusTownSelect,
          bacentas: values.bacentas,
        },
      })

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
                            name="campusTownSelect"
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
                                      control="combobox2"
                                      name={`bacentas[${index}]`}
                                      placeholder="Bacenta Name"
                                      setFieldValue={formik.setFieldValue}
                                      optionsQuery={BISHOP_BACENTA_DROPDOWN}
                                      queryVariable1="id"
                                      variable1={bishopId}
                                      queryVariable2="bacentaName"
                                      suggestionText="name"
                                      suggestionID="id"
                                      dataset="bishopBacentaDropdown"
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
