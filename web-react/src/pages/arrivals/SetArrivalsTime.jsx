import FormikControl from 'components/formik-components/FormikControl'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { SET_STREAM_ARRIVAL_TIMES } from './arrivalsMutations'
import { Col, Container, Row } from 'react-bootstrap'
import SubmitButton from 'components/formik-components/SubmitButton'
import BaseComponent from 'components/base-component/BaseComponent'

import { parseTimeToDate } from 'date-utils'

const SetArrivalsTime = () => {
  const { currentUser } = useContext(MemberContext)
  const church = currentUser?.currentChurch
  const initialValues = {
    id: church?.id,
    mobilisationStartTime: '',
    mobilisationEndTime: '',
    arrivalStartTime: '',
    arrivalEndTime: '',
  }
  const validationSchema = Yup.object({
    mobilisationStartTime: Yup.string().required('You must enter a time!'),
    mobilisationEndTime: Yup.string().required('You must enter a time!'),
    arrivalStartTime: Yup.string().required('You must enter a time!'),
    arrivalEndTime: Yup.string().required('You must enter a time!'),
  })

  const [SetStreamArrivalTimes, { loading, error }] = useMutation(
    SET_STREAM_ARRIVAL_TIMES
  )

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    await SetStreamArrivalTimes({
      variables: {
        id: values.id,
        mobilisationStartTime: parseTimeToDate(values.mobilisationStartTime),
        mobilisationEndTime: parseTimeToDate(values.mobilisationEndTime),
        arrivalStartTime: parseTimeToDate(values.arrivalStartTime),
        arrivalEndTime: parseTimeToDate(values.arrivalEndTime),
      },
    })
    onSubmitProps.setSubmitting(false)
  }

  return (
    <BaseComponent data={church} loading={loading} error={error}>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <>
              <HeadingPrimary> Please set the Arrival Times</HeadingPrimary>
              <h5 className="text-secondary">{`${church?.name} ${church?.__typename}`}</h5>

              <Form className="form-group">
                <Row>
                  <Col xs={12} md={6}>
                    <FormikControl
                      control="input"
                      type="time"
                      name="mobilisationStartTime"
                      label="Mobilisation Start Time"
                      placeholder="Pick a Time"
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <FormikControl
                      control="input"
                      type="time"
                      name="mobilisationEndTime"
                      label="Mobilisation End Time"
                      placeholder="Pick a Time"
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <FormikControl
                      control="input"
                      type="time"
                      name="arrivalStartTime"
                      label="Arrival Start Time"
                      placeholder="Pick a Time"
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <FormikControl
                      control="input"
                      type="time"
                      name="arrivalEndTime"
                      label="Arrival End Time"
                      placeholder="Pick a Time"
                    />
                  </Col>
                </Row>

                <SubmitButton formik={formik} />
              </Form>
            </>
          )}
        </Formik>
      </Container>
    </BaseComponent>
  )
}

export default SetArrivalsTime
