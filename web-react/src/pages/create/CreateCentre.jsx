import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/formik-components/FormikControl'

import {
  GET_BISHOP_CAMPUSES,
  GET_BISHOP_TOWNS,
  BISHOP_BACENTA_DROPDOWN,
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
  BISHOP_MEMBER_DROPDOWN,
} from '../../queries/ListQueries.js'
import { CREATE_CENTRE_MUTATION } from '../../queries/CreateMutations'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { ChurchContext } from '../../contexts/ChurchContext'
import PlusSign from '../../components/buttons/PlusSign'
import MinusSign from '../../components/buttons/MinusSign'
import { capitalise, makeSelectOptions } from '../../global-utils'

function CreateCentre() {
  const initialValues = {
    centreName: '',
    leaderId: '',
    campusTownSelect: '',
    bacentas: [''],
  }

  const { church, bishopId, setTownId, setCampusId, setCentreId } = useContext(
    ChurchContext
  )
  const history = useHistory()

  const validationSchema = Yup.object({
    centreName: Yup.string().required('Centre Name is a required field'),
    leaderId: Yup.string().required('Please choose a leader from the dropdown'),
    bacentas: Yup.array().of(
      Yup.string().required('Please pick a bacenta from the dropdown')
    ),
  })

  const [CreateCentre] = useMutation(CREATE_CENTRE_MUTATION, {
    onCompleted: (data) => {
      setCentreId(data.CreateCentre.id)
    },
    refetchQueries: [
      { query: GET_CAMPUS_CENTRES, variables: { id: bishopId } },
      { query: GET_TOWN_CENTRES, variables: { id: bishopId } },
    ],
  })

  const { data: townListData, loading: townListLoading } = useQuery(
    GET_BISHOP_TOWNS,
    {
      variables: { id: bishopId },
    }
  )
  const { data: campusListData, loading: campusListLoading } = useQuery(
    GET_BISHOP_CAMPUSES,
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
          leaderId: values.leaderId,
          townCampusId: values.campusTownSelect,
          bacentas: values.bacentas,
        },
      }).then(() => {
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        history.push('/centre/displaydetails')
      })
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
                            control="combobox2"
                            name="leaderId"
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
                            error={formik.errors.leaderId}
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
                                      error={
                                        formik.errors.bacentas &&
                                        formik.errors.bacentas[index]
                                      }
                                    />
                                  </div>
                                  <div className="col d-flex">
                                    <PlusSign onClick={() => push()} />
                                    {index > 0 && (
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
      </>
    )
  } else if (townListLoading || campusListLoading) {
    return <LoadingScreen />
  } else {
    return <ErrorScreen />
  }
}

export default CreateCentre
