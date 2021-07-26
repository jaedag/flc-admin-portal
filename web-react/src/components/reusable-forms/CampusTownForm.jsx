import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import NavBar from 'components/nav/NavBar'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from 'global-utils'
import { BISHOP_MEMBER_DROPDOWN, GET_BISHOPS } from 'queries/ListQueries'
import React, { useContext } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import FormikControl from 'components/formik-components/FormikControl'
import PlusSign from 'components/buttons/PlusSign'
import MinusSign from 'components/buttons/MinusSign'
import { BISHOP_CENTRE_DROPDOWN } from 'components/formik-components/ComboboxQueries'

const BacentaForm = ({ initialValues, onSubmit, title, loadingState }) => {
  const { church, bishopId } = useContext(ChurchContext)
  const {
    data: bishopsData,
    loading: bishopsLoading,
    error: bishopsError,
  } = useQuery(GET_BISHOPS)

  const bishopTownOptions = makeSelectOptions(
    bishopsData?.members.filter(
      (bishop) => bishop.isBishopForTown.length > 0 && bishop
    )
  )
  const bishopCampusOptions = makeSelectOptions(
    bishopsData?.members.filter(
      (bishop) => bishop.isBishopForCampus.length > 0 && bishop
    )
  )

  const validationSchema = Yup.object({
    campusTownName: Yup.string().required(
      `${capitalise(church.church)} Name is a required field`
    ),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    centres: Yup.array().of(
      Yup.string().required('Please pick a centre from the dropdown')
    ),
  })

  return (
    <BaseComponent
      loadingState={bishopsLoading || loadingState}
      errorState={bishopsError}
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
                            {centres.map((centres, index) => (
                              <div key={index} className="form-row row-cols">
                                <div className="col-9">
                                  <FormikControl
                                    control="combobox2"
                                    name={`centres[${index}]`}
                                    placeholder="Centre Name"
                                    setFieldValue={formik.setFieldValue}
                                    optionsQuery={BISHOP_CENTRE_DROPDOWN}
                                    queryVariable1="id"
                                    variable1={bishopId}
                                    queryVariable2="nameSearch"
                                    suggestionText="name"
                                    suggestionID="id"
                                    dataset="bishopCentreDropdown"
                                    church="centre"
                                    aria-describedby="Centre Name"
                                    className="form-control"
                                    error={
                                      formik.errors.centres &&
                                      formik.errors.centres[index]
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
    </BaseComponent>
  )
}

export default BacentaForm