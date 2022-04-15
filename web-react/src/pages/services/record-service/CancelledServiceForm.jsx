import FormikControl from 'components/formik-components/FormikControl'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { RECORD_CANCELLED_SERVICE } from './RecordServiceMutations'
import { useMutation } from '@apollo/client'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import { throwErrorMsg } from 'global-utils'

const CancelledServiceForm = ({ church, churchId, churchType }) => {
  const { theme } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

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
    onSubmitProps.setSubmitting(true)
    RecordCancelledService({
      variables: {
        id: churchId,
        serviceDate: values.serviceDate,
        noServiceReason: values.noServiceReason,
      },
    })
      .then((res) => {
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        clickCard(res.data.RecordCancelledService)
        navigate(`/${churchType}/service-details`)
      })
      .catch((error) => throwErrorMsg(error))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Container>
          <HeadingPrimary>I Cancelled My Service</HeadingPrimary>
          <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>

          <Form className="form-group mt-5">
            <Row className="row-cols-1 row-cols-md-2">
              {/* <!-- Service Form--> */}
              <Col className="mb-2">
                <div className="form-row d-flex justify-content-center">
                  <Col>
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
                      control="input"
                      name="noServiceReason"
                      label="Reason"
                    />

                    <div className="d-flex justify-content-center mt-5">
                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        className={`btn-main ${theme}`}
                        disabled={!formik.isValid || formik.isSubmitting}
                      >
                        Submit
                      </Button>
                    </div>
                  </Col>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </Formik>
  )
}

export default CancelledServiceForm
