import { useMutation, useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import {
  DISPLAY_BACENTA_BUSSING_DETAILS,
  UPDATE_BACENTA_BUSSING_DETAILS,
} from './UpdateBacentaArrivals'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { Form, Formik } from 'formik'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'

const UpdateBacentaBussing = () => {
  const { bacentaId } = useContext(ChurchContext)
  const navigate = useNavigate()
  const {
    data: bacentaData,
    loading: bacentaLoading,
    error: bacentaError,
  } = useQuery(DISPLAY_BACENTA_BUSSING_DETAILS, {
    variables: { id: bacentaId },
  })
  const [UpdateBacentaBussingDetails] = useMutation(
    UPDATE_BACENTA_BUSSING_DETAILS
  )
  const bacenta = bacentaData?.bacentas[0]

  const initialValues = {
    name: bacenta?.name,
    target: bacenta?.target ?? '',
    normalBussingCost: bacenta?.normalBussingCost ?? '',
    normalPersonalContribution: bacenta?.normalPersonalContribution ?? '',
    swellBussingCost: bacenta?.swellBussingCost ?? '',
    swellPersonalContribution: bacenta?.swellPersonalContribution ?? '',
  }

  const validationSchema = Yup.object({
    target: Yup.string().required('Bacenta Name is a required field'),
    normalBussingCost: Yup.string().required('This is a required field'),
    normalPersonalContribution: Yup.string().required(
      'This is a required field'
    ),
    swellBussingCost: Yup.string().required('This is a required field'),
    swellPersonalContribution: Yup.string().required(
      'This is a required field'
    ),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    UpdateBacentaBussingDetails({
      variables: {
        bacentaId: bacentaId,
        target: parseInt(values.target),
        normalBussingCost: parseFloat(values.normalBussingCost),
        normalPersonalContribution: parseFloat(
          values.normalPersonalContribution
        ),
        swellBussingCost: parseFloat(values.swellBussingCost),
        swellPersonalContribution: parseFloat(values.swellPersonalContribution),
      },
    }).then(() => {
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/bacenta/displaydetails`)
    })
  }
  return (
    <BaseComponent
      data={bacentaData}
      loading={bacentaLoading}
      error={bacentaError}
    >
      <Container>
        <HeadingPrimary>Bacenta Bussing Details Update</HeadingPrimary>
        <HeadingSecondary>{initialValues.name}</HeadingSecondary>
      </Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Container className="py-4">
            <Form>
              <div className="form-group">
                <Row className="row-cols-1 row-cols-md-2">
                  <Col className="mb-2">
                    <Row className="form-row">
                      <Col>
                        <FormikControl
                          control="input"
                          name="target"
                          label="Attendance Target"
                          placeholder="Enter Target"
                        />
                        <FormikControl
                          control="input"
                          name="normalBussingCost"
                          label="Normal Bussing Cost"
                          placeholder="Enter Total Bussing Cost for Normal"
                        />
                        <FormikControl
                          control="input"
                          name="normalPersonalContribution"
                          label="Normal Personal Contribution"
                          placeholder="Enter Personal Contribution for Normal"
                        />
                        <FormikControl
                          control="input"
                          name="swellBussingCost"
                          label="Swell Bussing Cost"
                          placeholder="Enter Total Bussing Cost for Swell"
                        />
                        <FormikControl
                          control="input"
                          name="swellPersonalContribution"
                          label="Swell Personal Contribution"
                          placeholder="Enter Personal Contribution for Swell"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <SubmitButton formik={formik} />
            </Form>
          </Container>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default UpdateBacentaBussing
