import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const BusPictureSubmit = () => {
  const navigate = useNavigate()
  const initialValues = {
    bussingPicture: '',
  }

  const validationSchema = Yup.object({
    bussingPicture: Yup.string().required('You must upload a bussing picture'),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    // SubmitBankingSlip({
    //   variables: {
    //     serviceRecordId: serviceRecordId,
    //     bankingSlip: values.bankingSlip,
    //   },
    // }).then(() => {
    //   onSubmitProps.setSubmitting(false)
    //   onSubmitProps.resetForm()
    // })
    navigate(`/fellowship/service-details`)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {(formik) => (
        <Container>
          <HeadingPrimary>Bussing Picture Submission</HeadingPrimary>
          <HeadingSecondary>Name of Bacenta</HeadingSecondary>
          <Form>
            <Row className="row-cols-1 row-cols-md-2 mt-5">
              <Col className="mb-2">
                <FormikControl
                  label="Upload a Picture of Your Banking Slip"
                  control="imageUpload"
                  name="bankingSlip"
                  uploadPreset={process.env.REACT_APP_CLOUDINARY_BANKING}
                  placeholder="Choose"
                  setFieldValue={formik.setFieldValue}
                  aria-describedby="UploadBankingSlip"
                />
              </Col>

              <div className="d-flex justify-content-center">
                <SubmitButton formik={formik} />
              </div>
            </Row>
          </Form>
        </Container>
      )}
    </Formik>
  )
}

export default BusPictureSubmit
