import FormikControl from 'components/formik-components/FormikControl'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { ServiceContext } from 'contexts/ServiceContext'
import { RECORD_CANCELLED_SERVICE } from './RecordServiceMutations'
import { useMutation } from '@apollo/client'

const CancelledServiceForm = ({ church, churchId, churchType }) => {
  const { setServiceRecordId } = useContext(ServiceContext)
  const history = useHistory()

  const [RecordCancelledService] = useMutation(RECORD_CANCELLED_SERVICE)

  const initialValues = {
    serviceDate: new Date().toISOString().slice(0, 10),
    noServiceReason: '',
  }

  const validationSchema = Yup.object({
    serviceDate: Yup.date()
      .max(new Date(), 'Service could not possibly have happened after today')
      .required('Date is a required field'),
    noServiceReason: Yup.string().required('You must take give a reason'),
  })

  const onSubmit = (values, onSubmitProps) => {
    RecordCancelledService({
      variables: {
        id: churchId,
        serviceDate: values.serviceDate,
        noServiceReason: values.noServiceReason,
      },
    }).then((res) => {
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      setServiceRecordId(res.data.RecordCancelledService.id)
      history.push(`/${churchType}/service-details`)
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="py-4 container mt-2">
          <div className="container infobar">I Cancelled My Service</div>

          <Form className="form-group">
            <div className="row row-cols-1 row-cols-md-2">
              {/* <!-- Service Form--> */}
              <div className="col mb-2">
                <div className="form-row d-flex justify-content-center">
                  <h5>{`${church.name} ${church.__typename}`}</h5>

                  <div className="col-11">
                    <small htmlFor="dateofservice" className="form-text label">
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
                      name="noServiceReason"
                      label="Reason"
                      className="form-control"
                    />

                    <div className="d-flex justify-content-center mt-5">
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
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default CancelledServiceForm
