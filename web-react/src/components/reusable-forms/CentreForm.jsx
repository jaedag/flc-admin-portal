import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import NavBar from 'components/nav/NavBar'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from 'global-utils'
import {
  BISHOP_MEMBER_DROPDOWN,
  GET_BISHOP_CAMPUSES,
  GET_BISHOP_TOWNS,
} from 'queries/ListQueries'
import React, { useContext } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import FormikControl from 'components/formik-components/FormikControl'
import PlusSign from 'components/buttons/PlusSign'
import MinusSign from 'components/buttons/MinusSign'
import { BISHOP_BACENTA_DROPDOWN } from 'components/formik-components/ComboboxQueries'

const BacentaForm = ({
  initialValues,
  onSubmit,
  title,
  loadingState,
  newCentre,
}) => {
  const { church, bishopId } = useContext(ChurchContext)

  const {
    data: townsData,
    loading: townsLoading,
    error: townsError,
  } = useQuery(GET_BISHOP_TOWNS, {
    variables: { id: bishopId },
  })
  const {
    data: campusesData,
    loading: campusesLoading,
    error: campusesError,
  } = useQuery(GET_BISHOP_CAMPUSES, {
    variables: { id: bishopId },
  })

  const townOptions = makeSelectOptions(townsData?.members[0].isBishopForTown)
  const campusOptions = makeSelectOptions(
    campusesData?.members[0].isBishopForCampus
  )

  const validationSchema = Yup.object({
    centreName: Yup.string().required('Centre Name is a required field'),
    leaderId: Yup.string().required('Please choose a leader from the dropdown'),
    bacentas: newCentre
      ? null
      : Yup.array().of(
          Yup.string().required('Please pick a bacenta from the dropdown')
        ),
  })

  return (
    <BaseComponent
      loadingState={campusesLoading || townsLoading || loadingState}
      errorState={townsError || campusesError}
    >
      <NavBar />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="body-card py-4 container mt-5">
            <div className="container infobar">{title}</div>
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
                          initialValue={initialValues.leaderName}
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
                          <>
                            {bacentas.map((bacenta, index) => (
                              <div key={index} className="form-row row-cols">
                                <div className="col-9">
                                  <FormikControl
                                    control="combobox2"
                                    name={`bacentas[${index}]`}
                                    initialValue={bacenta?.name}
                                    placeholder="Enter Bacenta Name"
                                    setFieldValue={formik.setFieldValue}
                                    optionsQuery={BISHOP_BACENTA_DROPDOWN}
                                    queryVariable1="id"
                                    variable1={bishopId}
                                    queryVariable2="bacentaName"
                                    suggestionText="name"
                                    suggestionID="id"
                                    returnObject={!newCentre && true}
                                    church="bacenta"
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
                                    <MinusSign onClick={() => remove(index)} />
                                  )}
                                </div>
                              </div>
                            ))}
                          </>
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
    </BaseComponent>
  )
}

export default BacentaForm
