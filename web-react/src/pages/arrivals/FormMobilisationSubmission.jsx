import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { Form, Formik } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { BACENTA_ARRIVALS } from './arrivalsQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { UPLOAD_MOBILISATION_PICTURE } from './arrivalsMutations'
import { beforeMobilisationDeadline } from './arrivals-utils'
import { isToday } from 'date-utils'

const FormMobilisationSubmission = () => {
  const navigate = useNavigate()
  const { bacentaId, clickCard } = useContext(ChurchContext)
  const initialValues = {
    serviceDate: new Date().toISOString().slice(0, 10),
    mobilisationPicture: '',
  }

  const { data, loading, error } = useQuery(BACENTA_ARRIVALS, {
    variables: { id: bacentaId },
  })
  const [UploadMobilisationPicture] = useMutation(UPLOAD_MOBILISATION_PICTURE)

  const validationSchema = Yup.object({
    serviceDate: Yup.date()
      .max(new Date(), 'Service could not possibly have happened after today')
      .required('Date is a required field'),
    mobilisationPicture: Yup.string().required('You must upload a picture'),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    UploadMobilisationPicture({
      variables: {
        bacentaId: bacentaId,
        serviceDate: values.serviceDate,
        mobilisationPicture: values.mobilisationPicture,
      },
    }).then((res) => {
      clickCard(res.data.UploadMobilisationPicture)
      onSubmitProps.resetForm()
      onSubmitProps.setSubmitting(false)
      navigate(`/bacenta/bussing-details`)
    })
  }

  useEffect(() => {
    let bussing

    data?.bacentas[0].bussing.forEach((data) => {
      if (isToday(data.serviceDate.date)) {
        bussing = data
      }
    })

    if (data && !beforeMobilisationDeadline(bussing, data?.bacentas[0])) {
      navigate('/arrivals/bacenta')
    }
  }, [data?.bacentas, navigate, data])

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount={true}
      >
        {(formik) => (
          <Container>
            <HeadingPrimary loading={loading}>
              Upload Pre-Mobilisation Picture
            </HeadingPrimary>
            <HeadingSecondary loading={loading}>
              {data?.bacentas[0].name} Bacenta
            </HeadingSecondary>
            <HeadingSecondary loading={loading}>
              Code of The Day:{' '}
            </HeadingSecondary>
            <HeadingPrimary className="fw-bold">
              {data?.bacentas[0]?.arrivalsCodeOfTheDay}
            </HeadingPrimary>

            <Form>
              <Row className="row-cols-1 row-cols-md-2 mt-2">
                <Col className="mb-2">
                  <small htmlFor="dateofservice" className="form-text label">
                    Date of Service*
                    <i className="text-secondary">(Day/Month/Year)</i>
                  </small>
                  <FormikControl
                    control="input"
                    name="serviceDate"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    aria-describedby="dateofservice"
                  />
                  <FormikControl
                    control="imageUpload"
                    name="mobilisationPicture"
                    uploadPreset={
                      process.env.REACT_APP_CLOUDINARY_BUS_MOBILISATION
                    }
                    error={formik.errors.mobilisationPicture}
                    placeholder="Upload Mobilisation Picture"
                    setFieldValue={formik.setFieldValue}
                    aria-describedby="ImageUpload"
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
    </BaseComponent>
  )
}

export default FormMobilisationSubmission
