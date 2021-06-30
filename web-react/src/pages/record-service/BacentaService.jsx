import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import * as Yup from 'yup'
import { DECIMAL_NUM_REGEX_POSITIVE_ONLY } from '../../global-utils'
import NavBar from '../../components/nav/NavBar'
import { Form, Formik } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import { RECORD_BACENTA_SERVICE } from '././RecordServiceMutations'
import FormikControl from '../../components/formik-components/FormikControl'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'

const BacentaService = () => {
  const { bacentaId } = useContext(ChurchContext)
  const {
    data: bacentaData,
    loading: bacentaLoading,
    error: bacentaError,
  } = useQuery(DISPLAY_BACENTA, { variables: { id: bacentaId } })
  const [RecordBacentaService] = useMutation(RECORD_BACENTA_SERVICE)

  const initialValues = {
    date: '',
    cediIncome: '',
    foreignCurrency: '',
    numberOfTithers: '',
    attendance: '',
    treasurers: [''],
    treasurerSelfie: '',
  }

  const validationSchema = Yup.object({
    date: Yup.date()
      .max(new Date(), 'Service could not possibly have happened after today')
      .required('Date is a required field'),
    cediIncome: Yup.string()
      .required('You must fill in your offering amount')
      .test('is-decimal', 'Please enter a valid amount', (value) =>
        (value + '').match(DECIMAL_NUM_REGEX_POSITIVE_ONLY)
      ),
    foreignCurrencyIncome: Yup.string().test(
      'is-decimal',
      'Please enter a valid amount',
      (value) => (value + '').match(DECIMAL_NUM_REGEX_POSITIVE_ONLY)
    ),
    numberOfTithers: Yup.number().positive().required(),
    attendance: Yup.number().positive().required(),
    treasurerSelfie: Yup.string().required('You must take a treasurers selfie'),
  })

  const onSubmit = (values, onSubmitProps) => {
    RecordBacentaService({
      variables: {
        bacentaId: bacentaId,
        serviceDate: values.date,
        attendance: values.attendance,
        income: values.cediIncome,
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
                        <FormikControl
                          control="imageUpload"
                          name="treasurerSelfie"
                          uploadPreset="treasurer-selfies"
                          placeholder="Upload Treasurer Selfie"
                          setFieldValue={formik.setFieldValue}
                          aria-describedby="ImageUpload"
                        />
                      </div>
                    </div>
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
    </>
  )
}

export default BacentaService
