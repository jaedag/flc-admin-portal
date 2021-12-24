import FormikControl from 'components/formik-components/FormikControl'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { ServiceContext } from 'contexts/ServiceContext'

const ServiceFormNoOffering = ({
  church,
  churchId,
  churchType,
  RecordServiceMutation,
}) => {
  const { setServiceRecordId } = useContext(ServiceContext)
  const navigate = useNavigate()

  const initialValues = {
    serviceDate: new Date().toISOString().slice(0, 10),
    attendance: '',
    servicePicture: '',
  }

  const validationSchema = Yup.object({
    serviceDate: Yup.date()
      .max(new Date(), 'Service could not possibly have happened after today')
      .required('Date is a required field'),
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have attendance with decimals!')
      .required('You cannot submit this form without entering your attendance'),
    servicePicture: Yup.string().required(
      'Please submit a picture of your service'
    ),
  })

  const onSubmit = (values, onSubmitProps) => {
    RecordServiceMutation({
      variables: {
        id: churchId,
        serviceDate: values.serviceDate,
        attendance: parseInt(values.attendance),
        servicePicture: values.servicePicture,
      },
    }).then((res) => {
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      setServiceRecordId(res.data.RecordServiceNoOffering.id)
      navigate(`/${churchType}/service-details`)
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
          <div className="container infobar">Record Your Service Details</div>
          <Form className="form-group">
            <div className="row row-cols-1 row-cols-md-2">
              {/* <!-- Service Form--> */}
              <div className="col mb-2">
                <div className="form-row d-flex justify-content-center">
                  <h5>{`${church.name} ${church.__typename}`}</h5>
                  <div className="col-11">
                    <small htmlFor="dateofservice" className="form-text label">
                      Date of Meeting*
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
                      control="imageUpload"
                      name="servicePicture"
                      uploadPreset={process.env.REACT_APP_CLOUDINARY_SERVICES}
                      placeholder="Upload a Picture of the Meeting"
                      setFieldValue={formik.setFieldValue}
                      aria-describedby="UploadServicePicture"
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
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default ServiceFormNoOffering
