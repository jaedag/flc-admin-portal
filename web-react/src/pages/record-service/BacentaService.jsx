import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import * as Yup from 'yup'
import NavBar from '../../components/nav/NavBar'
import { FieldArray, Form, Formik } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import { RECORD_BACENTA_SERVICE } from '././RecordServiceMutations'
import FormikControl from '../../components/formik-components/FormikControl'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import { BISHOP_MEMBER_DROPDOWN } from 'queries/ListQueries'
import MinusSign from 'components/buttons/MinusSign'
import PlusSign from 'components/buttons/PlusSign'
import { useHistory } from 'react-router'

const BacentaService = () => {
  const { bacentaId, bishopId } = useContext(ChurchContext)
  const history = useHistory()
  const {
    data: bacentaData,
    loading: bacentaLoading,
    error: bacentaError,
  } = useQuery(DISPLAY_BACENTA, { variables: { id: bacentaId } })
  const [RecordBacentaService] = useMutation(RECORD_BACENTA_SERVICE)

  const initialValues = {
    serviceDate: new Date().toISOString().slice(0, 10),
    cediIncome: '',
    foreignCurrency: '',
    numberOfTithers: '',
    attendance: '',
    treasurers: [''],
    treasurerSelfie: '',
  }

  const validationSchema = Yup.object({
    serviceDate: Yup.date()
      .max(new Date(), 'Service could not possibly have happened after today')
      .required('Date is a required field'),
    cediIncome: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .required('You cannot submit this form without entering your income'),
    foreignCurrency: Yup.string(),
    numberOfTithers: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .required(
        'You cannot submit this form without entering your number of tithers'
      ),
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .required('You cannot submit this form without entering your attendance'),
    treasurerSelfie: Yup.string().required('You must take a treasurers selfie'),
    treasurers: Yup.array().of(
      Yup.string().required('Please pick a name from the dropdown')
    ),
  })

  const onSubmit = (values, onSubmitProps) => {
    RecordBacentaService({
      variables: {
        bacentaId: bacentaId,
        serviceDate: values.serviceDate,
        attendance: parseInt(values.attendance),
        income: parseFloat(values.cediIncome),
        foreignCurrency: values.foreignCurrency,
        treasurers: values?.treasurers,
      },
    }).then(() => {
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      history.push('/bacenta/service/details')
    })
  }
  if (bacentaLoading) {
    return <LoadingScreen />
  } else if (bacentaError) {
    return <ErrorScreen />
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
          <div className="py-4 container mt-2">
            <div className="container infobar">Record Your Service Details</div>
            <Form>
              <div className="form-group">
                <div className="row row-cols-1 row-cols-md-2">
                  {/* <!-- Service Form--> */}
                  <div className="col mb-2">
                    <div className="form-row d-flex justify-content-center">
                      <h5>{`${bacentaData.bacentas[0].name} Bacenta`}</h5>
                      <div className="col-11">
                        <small
                          htmlFor="dateofservice"
                          className="form-text label"
                        >
                          Date of Service*
                          <i className="text-secondary">(Day/Month/Year)</i>
                        </small>
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="serviceDate"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          aria-describedby="dateofservice"
                        />
                        <FormikControl
                          control="input"
                          name="attendance"
                          label="Attendance"
                          className="form-control"
                        />
                        <FormikControl
                          control="input"
                          name="cediIncome"
                          label="Income (in Cedis)"
                          className="form-control"
                        />
                        <FormikControl
                          control="input"
                          name="foreignCurrency"
                          label="Foreign Currency (if any)"
                          className="form-control"
                        />
                        <FormikControl
                          control="input"
                          name="numberOfTithers"
                          label="Number of Tithers"
                          className="form-control"
                        />
                        <small className="label">Treasurers</small>
                        <FieldArray name="treasurers">
                          {(fieldArrayProps) => {
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { treasurers } = values
                            {
                              formik.values.treasurers
                            }
                            return (
                              <>
                                {treasurers.map((treasurer, index) => (
                                  <div key={index} className="form-row">
                                    <div className="col">
                                      <FormikControl
                                        control="combobox2"
                                        name={`treasurers[${index}]`}
                                        placeholder="Type a name"
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
                                        error={
                                          formik.errors.treasurers &&
                                          formik.errors.treasurers[index]
                                        }
                                      />
                                    </div>

                                    <div className="col-auto d-flex">
                                      <PlusSign onClick={() => push()} />
                                      {index > 0 && (
                                        <MinusSign
                                          onClick={() => remove(index)}
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </>
                            )
                          }}
                        </FieldArray>
                        <FormikControl
                          control="imageUpload"
                          name="treasurerSelfie"
                          uploadPreset="treasurer-selfies"
                          placeholder="Upload Treasurer Selfie"
                          setFieldValue={formik.setFieldValue}
                          aria-describedby="ImageUpload"
                        />
                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            disabled={!formik.isValid || formik.isSubmitting}
                            className="btn btn-primary px-5 py-3"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}

export default BacentaService
